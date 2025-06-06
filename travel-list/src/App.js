import "./App.css";
import { useState } from "react";

/* const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
]; */

function App() {
  const [items, setItems] = useState([]);

  function handleAddItems(el) {
    setItems((items) => [...items, el]);
  }

  function handleTogglePacked(id) {
    setItems((items) =>
      items.map((item) =>
        item.id === id ? { ...item, packed: !item.packed } : item
      )
    );
  }

  return (
    <div className="app">
      <Logo />
      <AddForm onAddItems={handleAddItems} />
      <PackingList items={items} onTogglePacked={handleTogglePacked} />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 💼</h1>;
}

function AddForm({ onAddItems }) {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");

  function handleSubmit(e) {
    e.preventDefault();
    if (!description) return;

    const newItem = { description, quantity, packed: false, id: Date.now() };

    onAddItems(newItem);
    setDescription("");
    setQuantity("1");
  }

  return (
    <form className="add-form" onSubmit={handleSubmit}>
      <h3>What do you need for your Trip?</h3>
      <select
        name="quantity"
        value={quantity}
        onChange={(e) => setQuantity(e.target.value)}
      >
        {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
          <option value={num} key={num}>
            {num}
          </option>
        ))}
      </select>
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Add Items..."
      ></input>
      <button>Add</button>
    </form>
  );
}

function PackingList({ items, onTogglePacked }) {
  return (
    <div className="list">
      <ul>
        {items.map((el) => (
          <Item item={el} key={el.id} onTogglePacked={onTogglePacked} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item, onTogglePacked }) {
  return (
    <li>
      <input
        type="checkbox"
        checked={item.packed}
        onChange={() => onTogglePacked(item.id)}
      ></input>
      <span style={item.packed ? { textDecoration: "line-through" } : {}}>
        {item.quantity} {item.description}
      </span>
      <button style={{ color: "red" }}>X</button>
    </li>
  );
}

function Stats() {
  return (
    <div className="stats">
      <p>👜You have X items in your list and you have already packed X items</p>
    </div>
  );
}

export default App;
