import { useState } from "react";
import { GroceryItem } from "./useGrocery";

const useSearchParams = () => {
  const params = new URLSearchParams(window.location.search);
  const titleParam = params.get("title");
  const [title, setTitle] = useState(titleParam ?? "");
  const items: GroceryItem[] = [];
  const groceryItems = params
    .getAll("groceryItem")
    .map((item) => item.split("|"));
  for (const [key, value] of groceryItems) {
    items.push({
      name: key,
      qty: Number(value),
    });
  }

  const handleUpdateGroceryItems = (items: GroceryItem[]) => {
    const params = new URLSearchParams(window.location.search);
    params.delete("groceryItem");
    items.forEach((item) => {
      params.append("groceryItem", `${item.name}|${item.qty.toString()}`);
    });
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  const handleSetTitle = (titleArg: string) => {
    const params = new URLSearchParams(window.location.search);
    setTitle(titleArg);
    params.set("title", titleArg);
    window.history.replaceState(null, "", `?${params.toString()}`);
  };

  return {
    title,
    onUpdateTitle: handleSetTitle,
    items,
    onSetParams: handleUpdateGroceryItems,
  };
};

export default useSearchParams;
