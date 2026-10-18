/**
 * Set Script Properties SPREADSHEET_ID and SITE_ORIGIN (exact HTTPS origin,
 * without a trailing slash). SHEET_NAME is optional and defaults to Enquiries.
 * Run setupEnquirySheet once, then deploy as a Web app: execute as yourself,
 * access Anyone. Use the deployed /exec URL in the website configuration.
 * The Sheet stays private; its ID and Google authorization never reach visitors.
 */
const ENQUIRY_HEADERS = ['Request ID', 'Received UTC', 'Name', 'Business', 'Email', 'Service', 'Details'];
const REQUEST_ID_PATTERN = /^[A-Za-z0-9_-]{20,100}$/;
const ORIGIN_PATTERN = /^https:\/\/(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,63}(?::[0-9]{1,5})?$/i;
const UNAVAILABLE = 'The enquiry form is temporarily unavailable. Please contact us on WhatsApp.';

function setupEnquirySheet() {
  const config = enquiryConfig_();
  if (!config.origin || !config.spreadsheetId) throw new Error('Set SPREADSHEET_ID and SITE_ORIGIN in Script Properties first.');
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);
  try {
    const spreadsheet = SpreadsheetApp.openById(config.spreadsheetId);
    const sheet = spreadsheet.getSheetByName(config.sheetName) || spreadsheet.insertSheet(config.sheetName);
    if (sheet.getLastRow() === 0) {
      sheet.appendRow(ENQUIRY_HEADERS);
      sheet.setFrozenRows(1);
    }
    checkHeaders_(sheet);
    SpreadsheetApp.flush();
  } finally {
    lock.releaseLock();
  }
}

function doPost(event) {
  let origin = '';
  let requestId = '';
  try {
    const config = enquiryConfig_();
    origin = config.origin;
    const params = event && event.parameter;
    if (params && typeof params.requestId === 'string' && REQUEST_ID_PATTERN.test(params.requestId)) {
      requestId = params.requestId;
    }
    if (!origin || !config.spreadsheetId) return enquiryAck_(origin, requestId, false, UNAVAILABLE);
    const enquiry = validateEnquiry_(event, origin);
    if (!enquiry) return enquiryAck_(origin, requestId, false, 'Please check your enquiry and try again.');

    // sourceOrigin is public routing information, not authentication. The public
    // endpoint also validates every field and a honeypot; it has no browser secret.
    const lock = LockService.getScriptLock();
    if (!lock.tryLock(10000)) return enquiryAck_(origin, requestId, false, 'The enquiry form is busy. Please try again in a moment.');
    try {
      const sheet = SpreadsheetApp.openById(config.spreadsheetId).getSheetByName(config.sheetName);
      if (!sheet) throw new Error('Run setupEnquirySheet first.');
      checkHeaders_(sheet);
      const lastRow = sheet.getLastRow();
      const duplicate = lastRow > 1 && sheet.getRange(2, 1, lastRow - 1, 1)
        .createTextFinder(requestId).matchEntireCell(true).findNext();
      if (!duplicate) {
        sheet.appendRow([
          requestId, new Date().toISOString(), enquiry.name, enquiry.businessName,
          enquiry.email, enquiry.service, enquiry.details
        ].map(sheetText_));
        // A success acknowledgement is sent only after the Sheet write commits.
        SpreadsheetApp.flush();
      }
    } finally {
      lock.releaseLock();
    }
    return enquiryAck_(origin, requestId, true, '');
  } catch (_) {
    // Do not return or log submitted details, spreadsheet IDs, or Google errors.
    return enquiryAck_(origin, requestId, false, UNAVAILABLE);
  }
}

function enquiryConfig_() {
  const properties = PropertiesService.getScriptProperties();
  const configuredOrigin = (properties.getProperty('SITE_ORIGIN') || '').trim();
  const configuredId = (properties.getProperty('SPREADSHEET_ID') || '').trim();
  return {
    origin: ORIGIN_PATTERN.test(configuredOrigin) ? configuredOrigin : '',
    spreadsheetId: /^[A-Za-z0-9_-]{20,200}$/.test(configuredId) ? configuredId : '',
    sheetName: (properties.getProperty('SHEET_NAME') || 'Enquiries').trim()
  };
}

function validateEnquiry_(event, origin) {
  if (!event || !event.postData || !event.parameter || !event.parameters) return null;
  const body = event.postData;
  if (typeof body.contents !== 'string' || body.contents.length > 20000 ||
      !Number.isFinite(body.length) || body.length < 1 || body.length > 20000 ||
      !/^application\/x-www-form-urlencoded(?:;|$)/i.test(body.type || '')) return null;
  const fields = ['requestId', 'sourceOrigin', 'name', 'businessName', 'email', 'service', 'details', 'website'];
  const params = event.parameter;
  if (Object.keys(event.parameters).some(key => fields.indexOf(key) === -1)) return null;
  if (fields.some(key => typeof params[key] !== 'string' || !Array.isArray(event.parameters[key]) || event.parameters[key].length !== 1)) return null;
  if (!REQUEST_ID_PATTERN.test(params.requestId) || params.sourceOrigin !== origin || params.website.trim() !== '') return null;
  const enquiry = {
    name: params.name.trim(), businessName: params.businessName.trim(),
    email: params.email.trim(), service: params.service.trim(), details: params.details.trim()
  };
  if (enquiry.name.length < 2 || enquiry.name.length > 100 ||
      enquiry.businessName.length < 1 || enquiry.businessName.length > 160 ||
      enquiry.email.length > 254 || !/^[^\s@\x00-\x1f\x7f]+@[^\s@\x00-\x1f\x7f]+\.[^\s@\x00-\x1f\x7f]+$/.test(enquiry.email) ||
      ['digital-menu', 'website', 'not-sure'].indexOf(enquiry.service) === -1 ||
      enquiry.details.length < 20 || enquiry.details.length > 5000) return null;
  return enquiry;
}

function checkHeaders_(sheet) {
  const headers = sheet.getRange(1, 1, 1, ENQUIRY_HEADERS.length).getValues()[0];
  if (ENQUIRY_HEADERS.some((header, index) => headers[index] !== header)) {
    throw new Error('The enquiry sheet headers do not match.');
  }
}

function sheetText_(value) {
  const text = String(value);
  // Keep formula-like values as literal text, including whitespace/control prefixes.
  return /^[\s\x00-\x1f\x7f-\x9f]*[=+\-@]/.test(text) ? "'" + text : text;
}

function scriptJson_(value) {
  return JSON.stringify(value).replace(/</g, '\\u003c').replace(/\u2028/g, '\\u2028').replace(/\u2029/g, '\\u2029');
}

function enquiryAck_(origin, requestId, ok, error) {
  const html = origin
    ? '<!doctype html><meta charset="utf-8"><meta name="referrer" content="no-referrer"><title>Enquiry status</title><script>window.top.postMessage(' +
      scriptJson_({ type: 'madeform:enquiry', requestId: requestId, ok: ok, error: error }) + ',' + scriptJson_(origin) + ');</script>'
    : '<!doctype html><meta charset="utf-8"><title>Enquiry unavailable</title><p>The enquiry form is temporarily unavailable.</p>';
  // HtmlService adds its own sandbox frame. Notify the top-level website, not
  // the intermediate Google frame. Never post to a wildcard or submitted origin.
  return HtmlService.createHtmlOutput(html).setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}
