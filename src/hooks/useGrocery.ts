import { useReducer } from "react";
export type GroceryItem = { name: string; qty: number };
export type State = {
  items: Array<GroceryItem>;
};

export type Action =
  | { type: "INIT_ITEMS"; payload: GroceryItem[] }
  | { type: "ADD_ITEM"; payload: GroceryItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_ITEM"; payload: GroceryItem };

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "INIT_ITEMS":
      return {
        ...state,
        items: action.payload,
      };
    case "ADD_ITEM":
      return {
        ...state,
        items: [...state.items, action.payload],
      };
    case "REMOVE_ITEM":
      return {
        ...state,
        items: state.items.filter((item) => item.name !== action.payload),
      };
    case "UPDATE_ITEM":
      return {
        ...state,
        items: state.items.map((item) => {
          if (item.name === action.payload.name) {
            return { ...item, qty: action.payload.qty };
          } else {
            return item;
          }
        }),
      };
    default:
      return state;
  }
};

export const useGrocery = (items: GroceryItem[]) => {
  const initialState: State = {
    items,
  };
  const [state, dispatch] = useReducer(reducer, initialState);

  const addItem = (item: GroceryItem) => {
    dispatch({ type: "ADD_ITEM", payload: item });
  };

  const removeItem = (name: string) => {
    dispatch({ type: "REMOVE_ITEM", payload: name });
  };

  const updateItem = (item: GroceryItem) => {
    dispatch({ type: "UPDATE_ITEM", payload: item });
  };

  const handleInit = (items: GroceryItem[]) => {
    dispatch({ type: "INIT_ITEMS", payload: items });
  };

  return {
    state,
    addItem,
    removeItem,
    updateItem,
    onInit: handleInit,
  };
};
