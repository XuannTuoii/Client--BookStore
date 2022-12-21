import create, {
  GetState,
  SetState,
  StateCreator,
  State,
  StoreApi,
} from "zustand";

import { persist, devtools } from "zustand/middleware";
import produce, { Draft } from "immer";
import createLoginSlice, { ILoginSlice } from "./loginSlice";
import { encryptStorage } from "../global/config/encrypt-storage/storage";
import ToastSlice, { IToastSlice } from "./toastSlice";
import BookSlice, { IBookSlice } from "./bookSlice";
import UserSlice, { IUserSlice } from "./userSlice";

const immer =
  <T extends State>(config: StateCreator<T>): StateCreator<T> =>
  (set: SetState<T>, get: GetState<T>, api: StoreApi<T>) =>
    config(
      (partial, replace) => {
        const nextState =
          typeof partial === "function"
            ? produce(partial as (state: Draft<T>) => T)
            : (partial as T);
        return set(nextState, replace);
      },
      get,
      api
    );

interface IStore extends ILoginSlice, IToastSlice, IBookSlice, IUserSlice {}

export const useStore = create<IStore>(
  persist(
    devtools(
      immer((set, get, api) => ({
        ...createLoginSlice(
          set as unknown as SetState<ILoginSlice>,
          get as GetState<ILoginSlice>,
          api as unknown as StoreApi<ILoginSlice>
        ),
        ...ToastSlice(
          set as unknown as SetState<IToastSlice>,
          get as GetState<IToastSlice>,
          api as unknown as StoreApi<IToastSlice>
        ),
        ...BookSlice(
          set as unknown as SetState<IBookSlice>,
          get as GetState<IBookSlice>,
          api as unknown as StoreApi<IBookSlice>
        ),
        ...UserSlice(
          set as unknown as SetState<IUserSlice>,
          get as GetState<IUserSlice>,
          api as unknown as StoreApi<IUserSlice>
        ),
      }))
    ),
    {
      name: "zustand-store",
      getStorage: () => encryptStorage,
    }
  )
);

export const {
  getState: getStore,
  setState: updateStore,
  subscribe: subscribeStore,
  destroy: destroyStore,
} = useStore;
