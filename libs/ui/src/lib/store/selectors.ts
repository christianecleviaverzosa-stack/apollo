import { SheetTypes } from '@apollo/types';
import { createSelectors } from '@apollo/utils';
import { uiStore } from './slice';

const store = createSelectors(uiStore).use;

const currentSheet = store.currentSheet;

export const selectIsSheetOpen = (type: SheetTypes) => {
    const sheet = currentSheet();

    return sheet.content === type && sheet.open;
};

export const selectCurrentSheet = () => currentSheet().content;

export const selectCurrentSheetData = <
    TObject extends Record<string, unknown>,
>(): TObject | undefined => currentSheet().data as TObject;