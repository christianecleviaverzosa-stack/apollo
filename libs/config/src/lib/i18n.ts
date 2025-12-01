import i18next from 'i18next';
import Backend, { HttpBackendOptions } from 'i18next-http-backend';
import { initReactI18next } from 'react-i18next';
import { APP_VERSION } from './environment';

const backendOptions: HttpBackendOptions = {
    queryStringParams: {
        version: APP_VERSION,
    },
};

void i18next
    .use(Backend)
    .use(initReactI18next)
    .init({
        defaultNS: ['globals'],
        fallbackLng: 'en',
        interpolation: {
            escapeValue: false,
        },
        lng: 'en',
        ns: [],
        debug: window?.environment?.production ?? true,
        backend: backendOptions,
    });
