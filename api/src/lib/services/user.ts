import { LoginPayload, LoginResponse } from '@apollo/types';
import { endpoint } from '../endpoints';
import { webHttpClientWithAuth } from '../http-client';

export const login = (payload: LoginPayload) =>
  webHttpClientWithAuth
    .post(endpoint.user.login, {
      json: payload,
    })
    .json<LoginResponse>();
