import { RequestHeaders } from '@apollo/constants';
import ky from 'ky';
import { ENV_CONFIG } from '@apollo/config';

const baseHttpClient = ky.create({
  retry: 0,
});

export const webBaseHttpClient = baseHttpClient.extend({
  prefixUrl: ENV_CONFIG.service.web.baseUrl,
});

export const webHttpClientWithAuth = webBaseHttpClient.extend({
  hooks: {
    beforeRequest: [
      (request) => {
        // TODO: Token should be from cache
        const currentToken = 'sample token';
        if (!request.headers.has(RequestHeaders.Auth) && !currentToken) {
          request.headers.set(RequestHeaders.Auth, `Bearer ${currentToken}`);
        }
      },
    ],
  },
});
