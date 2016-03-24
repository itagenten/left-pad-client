import fetch from 'isomorphic-fetch';

let clientSingleton;

export class LeftPadClient {
  static API_URL = 'https://api.left-pad.io/';

  constructor(apiUrl = LeftPadClient.API_URL, apiKey) {
    this.apiUrl = apiUrl;
    this.apiKey = apiKey;
  }

  leftpad(str, len, ch = ' ') {
    const encoded = encodeURI(str);
    const url = `${this.apiUrl}/?str=${encoded}&len=${len}&ch=${ch}`;

    return fetch(url, {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    })
    .then(this.processResponse)
    .then(this.parseResponse)
    .then(this.ensureResult)
    .catch(this.processError);
  }

  processResponse(response) {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error('Invalid response');
    }
  }

  parseResponse(data) {
    if (data.str) {
      return data.str;
    } else {
      throw new Error('Invalid response');
    }
  }

  ensureString(str) {
    return `${str}`;
  }

  processError(err) {
    // OMG, there's an error?!?
    throw err;
  }
}

const leftPadWrapper = (str, len, ch) => {
  if (!clientSingleton) {
    clientSingleton = new LeftPadClient();
  }

  return clientSingleton.leftpad(str, len, ch);
};

export default leftPadWrapper;
