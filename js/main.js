import { APP_NAME, APP_VERSION } from "../app-properties.js";
import { DEMO_URL } from "./data/demoUrl.data.js";
import { getSvgIcon } from "./services/icons.service.js";
import { showToast } from "./services/toast.service.js";
import { getUrlInfosIhm, getUrlParamsIhm } from "./services/url.service.js";
import { getRandomIntegerBetween, setHTMLTitle } from "./utils/UTILS.js";

/* ########################################################### */
/* VARIABLES */
/* ########################################################### */
const HEADER = document.getElementById('header');
const MAIN = document.getElementById('main');
const FOOTER = document.getElementById('footer');

/* ########################################################### */
/* FUNCTIONS */
/* ########################################################### */
const onUrlInputChange = () => {
  let urlValue = document.getElementById('urlInput').value;
  if (urlValue !== '') {
    let urlObj;
    try {
      urlObj = new URL(urlValue);
      //console.table(urlObj);
      document.getElementById('urlInput').classList.remove('error');
      document.getElementById('urlError').innerHTML = ``;
      document.getElementById('informations-display').innerHTML = `${getUrlInfosIhm(urlObj)}`;
      document.getElementById('parameters-display').innerHTML = `${getUrlParamsIhm(urlObj)}`;
    } catch (error) {
      console.log(error);
      document.getElementById('urlInput').classList.add('error');
      document.getElementById('urlError').innerHTML = `Please enter a valid URL`;
      document.getElementById('informations-display').innerHTML = ``;
      document.getElementById('parameters-display').innerHTML = ``;
    }
  } else {
    document.getElementById('urlInput').classList.remove('error');
    document.getElementById('urlError').innerHTML = ``;
    document.getElementById('informations-display').innerHTML = ``;
    document.getElementById('parameters-display').innerHTML = ``;
  }
}
window.onUrlInputChange = onUrlInputChange;

const onRandomUrlClick = () => {
  let previousValue = document.getElementById('urlInput').value;
  document.getElementById('urlInput').value = '';
  let randomUrl = DEMO_URL[getRandomIntegerBetween(0, DEMO_URL.length - 1)];
  while (randomUrl === previousValue) {
    randomUrl = DEMO_URL[getRandomIntegerBetween(0, DEMO_URL.length - 1)];
  }
  document.getElementById('urlInput').value = randomUrl;
  onUrlInputChange();
}
window.onRandomUrlClick = onRandomUrlClick

const onCopyToClipboardClick = (elementId) => {
  let element = document.getElementById(`${elementId}Value`);
  let text = element.innerHTML;
  const textArea = document.createElement("textarea");
  textArea.value = text;
  textArea.setAttribute('id', 'clipboard');
  textArea.classList.add('invisible');
  document.getElementById('main').appendChild(textArea);
  textArea.focus();
  textArea.select();
  try {
    document.execCommand('copy');
    showToast('info', 'Copied to clipboard', 1250);
  } catch (err) {
    console.error('Unable to copy to clipboard', err);
  }
  document.getElementById('main').removeChild(document.getElementById('clipboard'));
}
window.onCopyToClipboardClick = onCopyToClipboardClick;

/* ########################################################### */
/* DOM INITIALIZATION */
/* ########################################################### */
// Keep screen awake
//requestWakeLock();
setHTMLTitle(APP_NAME);

/* ########################################################### */
/* EXECUTION */
/* ########################################################### */
console.log(`%c${APP_NAME}`, 'font-size: 20px; font-weight: 600;');
console.log(`%cv %c${APP_VERSION}`, 'font-size: 16px; font-weight: 400;', 'font-size: 16px; font-weight: 400; color: aqua;');

document.getElementById('randomButton').innerHTML = `<span>Get random demo URL</span> ${getSvgIcon('arrows-rotate', 'icon-xs icon-fg-30')}`;
