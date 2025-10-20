
import { SheetTypes } from '@apollo/types';
import { create } from '@apollo/utils';
import { devtools } from 'zustand/middleware';

type PortalContent<TContent> = {
    open: boolean;
    content: TContent;
    data?: Record<string, unknown>;
};
export type CurrentSheet = PortalContent<SheetTypes>;

type UiState = {
    currentSheet: CurrentSheet;
};

const name = `[APOLLO:UI]`;

export const uiStore = create<UiState>()(
    devtools(
        () => ({
            currentSheet: { open: false, content: null },
        }),
        { name }
    )
);
