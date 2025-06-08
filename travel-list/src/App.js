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

  function handleDeleteItem(id) {
    setItems((items) => items.filter((item) => item.id !== id));
  }

  function handleClearList() {
    setItems([]);
  }

  return (
    <div className="app">
      <Logo />
      <AddForm onAddItems={handleAddItems} />
      <PackingList
        items={items}
        onTogglePacked={handleTogglePacked}
        onDeleteItem={handleDeleteItem}
        onClearList={handleClearList}
      />
      <Stats items={items} />
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

function PackingList({ items, onTogglePacked, onDeleteItem, onClearList }) {
  const [sortBy, setSortBy] = useState("input");

  let sortedItems = items;

  if (sortBy === "input") sortedItems = items;
  if (sortBy === "packed") {
    sortedItems = items
      .slice()
      .sort((a, b) => Number(a.packed) - Number(b.packed));
  }
  if (sortBy === "description") {
    sortedItems = items
      .slice()
      .sort((a, b) => a.description.localeCompare(b.description));
  }

  return (
    <div className="list">
      <ul>
        {sortedItems.map((el) => (
          <Item
            item={el}
            key={el.id}
            onTogglePacked={onTogglePacked}
            onDeleteItem={onDeleteItem}
          />
        ))}
      </ul>
      <div className="actions">
        <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}>
          <option value="input">Sort by Input Order</option>
          <option value="packed">Sort by Packed</option>
          <option value="description">Sort by Description</option>
        </select>
        <button onClick={onClearList}>Clear List</button>
      </div>
    </div>
  );
}

function Item({ item, onTogglePacked, onDeleteItem }) {
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
      <button style={{ color: "red" }} onClick={() => onDeleteItem(item.id)}>
        X
      </button>
    </li>
  );
}

function Stats({ items }) {
  const numItems = items.length;
  const packedItems = items.filter((items) => items.packed).length;
  const percentagePacked = (packedItems / numItems) * 100;
  return (
    <div className="stats">
      {numItems === 0 ? (
        <p> Add items to your list</p>
      ) : percentagePacked === 100 ? (
        <p>You are good to go. All things Packed. ✈️</p>
      ) : (
        <p>
          👜You have {numItems} items in your list and you have already packed
          {packedItems} items {percentagePacked.toFixed(2)}% ✈️
        </p>
      )}
    </div>
  );
}

export default App;
