import "./App.css";

import { useState, useEffect } from "react";

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
      <SectionFriends />
      <FormSplit />
    </div>
  );
}

function SectionFriends() {
  const [addFriend, setAddFriend] = useState({ name: "", img: "" });

  const [friends, setFriends] = useState(initialFriends);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Dynamically update name or img based on input's name attribute
    setAddFriend((prev) => ({
      ...prev,
      [name]: value,
    }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(addFriend);
    console.log("Adding friend:", { name: addFriend.name, img: addFriend.img });
    setFriends((friends) => [
      ...friends,
      { id: Date.now(), name: addFriend.name, img: addFriend.img },
    ]);
    setAddFriend({ name: "", img: "" });
  };

  useEffect(() => {
    console.log("Friends updated:", friends);
  }, [friends]);

  return (
    <div>
      <FriendList friends={friends} />
      <AddFriend
        addFriend={addFriend}
        onChange={handleChange}
        onSubmit={handleSubmit}
      />
    </div>
  );
}

function FormSplit() {
  return (
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
  );
}

function FriendList({ friends }) {
  return (
    <ul className="sidebar">
      {friends.map((el) => (
        <li key={el.id}>
          <img src={el.image} alt="frnd_photo" />
          <h3>{el.name}</h3>
          <p>
            {el.balance > 0
              ? `you own ${el.name} ${Math.abs(el.balance)} \u00A3`
              : el.balance === 0
              ? `You and ${el.name} are even`
              : `${el.name} owns you ${Math.abs(el.balance)} \u00A3`}
          </p>
          <button className="button">Select</button>
        </li>
      ))}
    </ul>
  );
}

function AddFriend({ addFriend, onChange, onSubmit }) {
  return (
    <div className="form-add-friend">
      <form onSubmit={onSubmit}>
        <label>🧑‍🤝‍🧑Friend-Name </label>
        <input
          type="text"
          name="name"
          value={addFriend.name}
          onChange={onChange}
        ></input>
        <label>🙍‍♀️ Image URL </label>
        <input
          type="text"
          name="img"
          value={addFriend.img}
          onChange={onChange}
        ></input>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

export default App;
