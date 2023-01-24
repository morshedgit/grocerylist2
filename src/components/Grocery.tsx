import { useContext } from "react";
import { GroceryContext } from "../components/GroceryContext";
const fruits: string[] = [
  "Apple",
  "Banana",
  "Orange",
  "Mango",
  "Pineapple",
  "Strawberry",
  "Blueberry",
  "Watermelon",
  "Kiwi",
  "Grapefruit",
  "Peach",
  "Pear",
  "Cherry",
  "Papaya",
  "Guava",
  "Plum",
  "Avocado",
  "Lemon",
  "Lime",
  "Dragonfruit",
];

function Grocery() {
  const { title, onUpdateTitle, state, addItem, removeItem, updateItem } =
    useContext(GroceryContext);

  const handleAddItem = () => {
    const item = { name: `item-${Math.random()}`, qty: 2 };
    addItem(item);
  };

  const handleRemoveItem = (name: string) => {
    removeItem(name);
  };

  const handleUpdateItem = (name: string, qty: number) => {
    const item = { name, qty };
    updateItem(item);
  };

  return (
    <div>
      <input
        placeholder="Title"
        value={title ?? undefined}
        onChange={(e) => onUpdateTitle(e.target.value)}
      />
      <ul>
        {state.items.map((item, index) => (
          <li key={index}>
            {item.name} - {item.qty}
            <button onClick={() => handleRemoveItem(item.name)}>Remove</button>
            <input
              type="number"
              value={item.qty}
              onChange={(e) =>
                handleUpdateItem(item.name, e.target.valueAsNumber)
              }
            />
          </li>
        ))}
      </ul>
      <button onClick={handleAddItem}>Add Item</button>
    </div>
  );
}

export default Grocery;
