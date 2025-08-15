import psl from 'https://unpkg.com/psl@latest/dist/psl.mjs'

export const getUrlInfosIhm = (urlObj) => {
  function getOriginIhm() {
    if (urlObj.origin !== '') {
      let str = `
        <div class="info-line">
          <span class="name">origin</span>
          <span class="value-container">
            <button id="originValue" onclick="onCopyToClipboardClick('origin')" class="value">${urlObj.origin}</button>
          </span>
        </div>`;
      return str
    }
    return '';
  }

  function getProtocolIhm() {
    if (urlObj.protocol !== '') {
      let str = `
        <div class="info-line">
          <span class="name">protocol</span>
          <span class="value-container">
            <button id="protocolValue" onclick="onCopyToClipboardClick('protocol')" class="value">${urlObj.protocol}</button>
          </span>
        </div>`;
      return str
    }
    return '';
  }

  function getUsernameIhm() {
    if (urlObj.username !== '') {
      let str = `
        <div class="info-line">
          <span class="name">username</span>
          <span class="value-container">
            <button id="usernameValue" onclick="onCopyToClipboardClick('username')" class="value">${urlObj.username}</button>
          </span>
        </div>`;
      return str
    }
    return '';
  }

  function getPasswordIhm() {
    if (urlObj.password !== '') {
      let str = `
        <div class="info-line">
          <span class="name">password</span>
          <span class="value-container">
            <button id="passwordValue" onclick="onCopyToClipboardClick('password')" class="value">${urlObj.password}</button>
          </span>
        </div>`;
      return str
    }
    return '';
  }

  function getHostnameIhm() {
    if (urlObj.hostname !== '') {
      //const psl = require('psl');
      let parsedDomain = psl.parse(urlObj.hostname);
      //console.table(parsedDomain);

      console.log(`Top Level Domain : ${parsedDomain.tld}`);
      console.log(`Second-Level Domain : ${parsedDomain.sld}`);
      console.log(`Domain : ${parsedDomain.domain}`);
      console.log(`Sub-Domain : ${parsedDomain.subdomain === null ? '-' : parsedDomain.subdomain}`);

      let buttonsString = '';
      if (parsedDomain.subdomain !== null) {
        buttonsString += `<button id="subdomainValue" onclick="onCopyToClipboardClick('subdomain')" class="value subdomain">${parsedDomain.subdomain}</button>`;
      }
      if (parsedDomain.sld !== null) {
        buttonsString += `<button id="sldValue" onclick="onCopyToClipboardClick('sld')" class="value sld">${parsedDomain.subdomain === null ? '' : '.'}${parsedDomain.sld}</button>`;
      }
      if (parsedDomain.tld !== null) {
        buttonsString += `<button id="tldValue" onclick="onCopyToClipboardClick('tld')" class="value tld">.${parsedDomain.tld}</button>`;
      }
        
      let str = `
        <div class="info-line">
          <span class="name">hostname</span>
          <span class="value-container">
            <div class="hostname-container">
              ${buttonsString}
            </div>
          </span>
        </div>`;
      return str
    }
    return '';
  }

  function getPortIhm() {
    if (urlObj.port !== '') {
      let str = `
        <div class="info-line">
          <span class="name">port</span>
          <span class="value-container">
            <button id="portValue" onclick="onCopyToClipboardClick('port')" class="value">${urlObj.port}</button>
          </span>
        </div>`;
      return str
    }
    return '';
  }

  function getPathnameIhm() {
    if (urlObj.pathname !== '') {
      function getPathContainer(hierarchyArray) {
        let pathStr = '<div class="path-container">';
        for (let [index, pathBloc] of hierarchyArray.entries()) {
          pathStr += `<button id="pathn${index}Value" onclick="onCopyToClipboardClick('pathn${index}')" class="path-bloc" style="--margin-multiplier: ${index}">/${pathBloc}</button>`;
        }
        pathStr += '</div>';
        return pathStr;
      }

      let hierarchy = urlObj.pathname.split('/').filter((e) => e !== '');

      let str = `
        <div class="info-line">
          <span class="name">pathname</span>
          <span class="value-container">
          ${getPathContainer(hierarchy)}
            <!-- <button id="pathnameValue" onclick="onCopyToClipboardClick('pathname')" class="value">${urlObj.pathname}</button> -->
          </span>
        </div>`;

      return str
    }
    return '';
  }

  function getHashIhm() {
    if (urlObj.hash !== '') {
      let str = `
        <div class="info-line">
          <span class="name">hash</span>
          <span class="value-container">
            <button id="hashValue" onclick="onCopyToClipboardClick('hash')" class="value">${urlObj.hash}</button>
          </span>
        </div>`;
      return str
    }
    return '';
  }

  return `
    <h1>Global informations</h1>

    ${getOriginIhm()}
    ${getProtocolIhm()}
    ${getUsernameIhm()}
    ${getPasswordIhm()}
    ${getHostnameIhm()}
    ${getPortIhm()}
    ${getPathnameIhm()}
    ${getHashIhm()}
  `;
}

export const getUrlParamsIhm = (urlObj) => {
  let str = '';
  let str2 = ''
  for (let param of urlObj.searchParams.entries()) {
    let name = param[0];
    let value = param[1];
    if (value !== '') {
      str2 += `
        <div class="param-line">
          <span class="name">${name}</span>
          <span class="value-container">
            <button id="${name}Value" onclick="onCopyToClipboardClick('${name}')" class="value">${value}</button>
          </span>
        </div>
      `;
    } else {
      str2 += `
        <div class="param-line">
          <span class="name">${name}</span>
          <span class="value-container">
            <span id="${name}Value" onclick="" class="empty">-</span>
          </span>
        </div>
      `;
    }
  }
  if (str2 !== '') {
    str += `<h1>URL Search Params</h1>`;
    str += str2;
  }

  return str;
}
