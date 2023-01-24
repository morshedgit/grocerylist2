import { GroceryProvider } from "./components/GroceryContext";
import Grocery from "./components/Grocery";
function App() {
  return (
    <div className="App">
      <GroceryProvider>
        <Grocery />
      </GroceryProvider>
    </div>
  );
}

export default App;
