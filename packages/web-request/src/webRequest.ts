import WebRequest, { WebRequestConfig } from './lib/WebRequest';

function createInstance(config: WebRequestConfig): WebRequest {
  const instance = new WebRequest(config);

  return instance;
}

const defaultConfig: WebRequestConfig = {
  url: 'xxxxx',
  method: 'get',
};

const webRequest = createInstance(defaultConfig);

export { webRequest };
