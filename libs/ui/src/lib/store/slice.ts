

import { DialogTypes, SheetTypes } from '@apollo/types';
import { create } from '@apollo/utils';
import { devtools } from 'zustand/middleware';

type PortalContent<TContent> = {
    open: boolean;
    content: TContent;
    data?: Record<string, unknown>;
};
export type CurrentSheet = PortalContent<SheetTypes>;
export type CurrentDialog = PortalContent<DialogTypes>;

type UiState = {
    currentDialog: CurrentDialog;
    currentSheet: CurrentSheet;
};

const name = `[APOLLO:UI]`;

export const uiStore = create<UiState>()(
    devtools(
        () => ({
            currentDialog: { open: false, content: null },
            currentSheet: { open: false, content: null },
        }),
        { name }
    )
);
