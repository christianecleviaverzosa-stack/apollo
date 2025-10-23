
import { CurrentSheet, CurrentDialog, uiStore } from './slice';

/** Sheets Actions */
export const setCurrentSheet = (payload: Partial<CurrentSheet>) =>
    uiStore.setState(({ currentSheet }) => ({
        currentSheet: { ...currentSheet, ...payload, data: payload.data },
    }));

/** Dialogs Actions */
export const setCurrentDialog = (payload: Partial<CurrentDialog>) =>
    uiStore.setState(({ currentDialog }) => ({
        currentDialog: { ...currentDialog, ...payload, data: payload.data },
    }));