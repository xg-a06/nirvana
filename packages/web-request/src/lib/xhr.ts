import { WebRequestConfig, WebRequestPromise } from './WebRequest';

function request(config: WebRequestConfig): WebRequestPromise {
  return new Promise((resolve, reject) => {
    const { url, method = 'get', data = null } = config;

    const xhr = new XMLHttpRequest();

    xhr.open(method, url, true);

    xhr.send(data);
  });
}

export default request;
