import React, { ReactNode, useEffect } from "react";
import { State, useGrocery, GroceryItem } from "../hooks/useGrocery";
import useSearchParams from "../hooks/useSearchParams";

const GroceryContext = React.createContext<{
  state: State;
  addItem: (item: GroceryItem) => void;
  removeItem: (itemName: string) => void;
  updateItem: (item: GroceryItem) => void;
  onInit: (item: GroceryItem[]) => void;
  title: string | null;
  onUpdateTitle: (title: string) => void;
}>({
  state: {
    items: [],
  },
  addItem: () => null,
  removeItem: () => null,
  updateItem: () => null,
  onInit: () => null,
  title: "",
  onUpdateTitle: () => null,
});
type Props = { children: ReactNode };
const GroceryProvider = ({ children }: Props) => {
  const { title, onUpdateTitle, items, onSetParams } = useSearchParams();
  const { state, addItem, removeItem, updateItem, onInit } = useGrocery(items);

  useEffect(() => {
    onSetParams(state.items);
  }, [state]);

  return (
    <GroceryContext.Provider
      value={{
        state,
        addItem,
        removeItem,
        updateItem,
        onInit,
        title,
        onUpdateTitle,
      }}
    >
      {children}
    </GroceryContext.Provider>
  );
};

export { GroceryContext, GroceryProvider };
