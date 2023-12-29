export class CoreAppConfig {
  production?: boolean;

  captcha?: {
    key: string;
  };

  api?: {
    protocol: string;
    baseUrl: string;
  };

  graphql?: {
    protocol: string;
    baseUrl: string;
  };

  web?: {
    protocol: string;
    baseUrl: string;
  };

  arpa?: {
    url: string;
  };

  validation?: {
    password: string;
    email: string;
  };

  config?: {
    protocol: string;
    baseUrl: string;
  };

  locale?: {
    default: string;
    locales: {
      [key: string]: string;
    }
  }
}