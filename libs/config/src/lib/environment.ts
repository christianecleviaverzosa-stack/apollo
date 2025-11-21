declare global {
  interface Window {
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
