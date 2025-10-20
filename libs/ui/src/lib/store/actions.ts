import { CurrentSheet, uiStore } from './slice';

export const setCurrentSheet = (payload: Partial<CurrentSheet>) =>
    uiStore.setState(({ currentSheet }) => ({
        currentSheet: { ...currentSheet, ...payload, data: payload.data },
    }));
