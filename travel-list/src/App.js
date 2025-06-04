import "./App.css";
import { useState } from "react";

const initialItems = [
  { id: 1, description: "Passports", quantity: 2, packed: false },
  { id: 2, description: "Socks", quantity: 12, packed: false },
];

function App() {
  return (
    <div className="app">
      <Logo />
      <AddForm />
      <PackingList />
      <Stats />
    </div>
  );
}

function Logo() {
  return <h1>🌴Far Away 💼</h1>;
}

function AddForm() {
  const [description, setDescription] = useState("");
  const [quantity, setQuantity] = useState("1");

  const newItem = { description, quantity, packed: false, id: Date.now() };

  console.log(newItem);
  function handleSubmit(e) {
    setDescription(description);
  }

  return (
    <form className="add-form" onClick={handleSubmit}>
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

function PackingList() {
  return (
    <div className="list">
      <ul>
        {initialItems.map((el) => (
          <Item item={el} />
        ))}
      </ul>
    </div>
  );
}

function Item({ item }) {
  return (
    <li>
      <input type="checkbox" value={""}></input>
      {item.quantity} {item.description}
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
