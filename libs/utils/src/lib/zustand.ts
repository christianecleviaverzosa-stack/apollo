import { StateCreator, StoreApi, UseBoundStore, create as actualCreate } from 'zustand';

type WithSelectors<S> = S extends { getState: () => infer T }
    ? S & { use: { [K in keyof T]: () => T[K] } }
    : never;

export const createSelectors = <S extends UseBoundStore<StoreApi<object>>>(
    _store: S
) => {
    const store = _store as WithSelectors<typeof _store>;
    store.use = {};
    for (const k of Object.keys(store.getState())) {
        (store.use as any)[k] = () => store((s) => s[k as keyof typeof s]);
    }

    return store;
};


const storeResetFns = new Set<() => void>()

export const resetAllStores = () => {
    storeResetFns.forEach((resetFn) => {
        resetFn()
    })
}
export const create = (<T>() => {
    return (stateCreator: StateCreator<T>) => {
        const store = actualCreate(stateCreator)
        const initialState = store.getInitialState()
        storeResetFns.add(() => {
            store.setState(initialState, true)
        })
        return store
    }
}) as typeof actualCreate