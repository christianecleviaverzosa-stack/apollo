import { DialogTypes, SheetTypes } from '@apollo/types';

import { createSelectors } from '@apollo/utils';
import { uiStore } from './slice';

const store = createSelectors(uiStore).use;

/** Sheets */
const currentSheet = store.currentSheet;

export const selectIsSheetOpen = (type: SheetTypes) => {
    const sheet = currentSheet();

    return sheet.content === type && sheet.open;
};

export const selectCurrentSheet = () => currentSheet().content;

export const selectCurrentSheetData = <
    TObject extends Record<string, unknown>,
>(): TObject | undefined => currentSheet().data as TObject;

/** Dialogs */

export const currentDialog = store.currentDialog;
export const selectIsDialogOpen = (type: DialogTypes) => {
    const dialog = currentDialog();

    return dialog.content === type && dialog.open;
};

export const selectCurrentDialogData = <
    TObject extends Record<string, unknown>,
>(): TObject | undefined => currentDialog().data as TObject;

export const selectCurrentDialog = () => currentDialog().content;