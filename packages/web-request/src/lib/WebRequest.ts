type Method =
  | 'get'
  | 'GET'
  | 'delete'
  | 'DELETE'
  | 'head'
  | 'HEAD'
  | 'options'
  | 'OPTIONS'
  | 'post'
  | 'POST'
  | 'put'
  | 'PUT'
  | 'patch'
  | 'PATCH';

interface WebRequestConfig {
  url?: string;
  method?: Method;
  data?: any;
}

interface WebRequestResponse {
  status: number;
  statusText: string;
  config: WebRequestConfig;
  request: XMLHttpRequest;
}

type WebRequestPromise = Promise<WebRequestResponse>;

interface IWebRequest {
  request: {
    (url: string, config?: WebRequestConfig | undefined): WebRequestPromise;
    (config: WebRequestConfig): WebRequestPromise;
  };
}

class WebRequest implements IWebRequest {
  config: WebRequestConfig;

  constructor(initConfig: WebRequestConfig) {
    this.config = initConfig;
  }

  request(url: unknown, config: unknown = {}): WebRequestPromise {
    if (typeof url === 'string') {
      this.config.url = url;
    } else {
      this.config = config as WebRequestConfig;
    }

    return {} as WebRequestPromise;
  }
}

export { WebRequestConfig, WebRequestPromise };

export default WebRequest;
