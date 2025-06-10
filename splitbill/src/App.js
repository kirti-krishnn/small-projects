import "./App.css";

//import { useState } from "react";

const initialFriends = [
  {
    id: 118836,
    name: "Clark",
    image: "https://i.pravatar.cc/48?u=118836",
    balance: -7,
  },
  {
    id: 933372,
    name: "Sarah",
    image: "https://i.pravatar.cc/48?u=933372",
    balance: 20,
  },
  {
    id: 499476,
    name: "Anthony",
    image: "https://i.pravatar.cc/48?u=499476",
    balance: 0,
  },
];

function App() {
  return (
    <div className="app">
      <div>
        <ul className="sidebar">
          {initialFriends.map((el) => (
            <li>
              <img src={el.image} alt="frnd_photo" />
              <h3>{el.name}</h3>
              <p>you own money</p>
              <button className="button">Select</button>
            </li>
          ))}
        </ul>
        <div className="form-add-friend">
          <form>
            <label>🧑‍🤝‍🧑Friend-Name </label>
            <input type="text"></input>
            <label>🙍‍♀️ Image URL </label>
            <input type="text"></input>
            <button className="button">Add</button>
          </form>
        </div>
      </div>
      <form className="form-split-bill">
        <h2> SPLIT A BILL WITH Friend</h2>
        <label className="first-letter">Bill Value</label>
        <input></input>
        <label>Your expense</label>
        <input></input>
        <label>Friends expense</label>
        <input></input>
        <label>who is paying</label>
        <select>
          <option>you</option>
          <option>friends</option>
        </select>
        <button className="button">Split bill</button>
      </form>
    </div>
  );
}

export default App;
