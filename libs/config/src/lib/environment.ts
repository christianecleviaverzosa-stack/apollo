declare global {
  interface Window {
    appVersion: string;
    environment: {
      production: boolean;
      brand: string;
      brandCode: string;
      service: {
        web: {
          baseUrl: string;
        };
      };
      features: string[];
    };
  }
}

export const ENV_CONFIG = window.environment;
export const APP_VERSION = window.appVersion;