import { createContext, useContext } from "react";
import { RootStore } from "./rootStore";
import { StoreContextError } from "../errors/errors";

export const RootStoreContext = createContext(RootStore);

export const useStores = () => {
  const context = useContext(RootStoreContext);

  if (context === null) {
    throw new StoreContextError("Ошибка при создании контекста: useStores");
  }
  return context;
};
