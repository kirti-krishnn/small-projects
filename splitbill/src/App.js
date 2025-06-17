/* import "./App.css";

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
 */

import "./App.css";

import { useState } from "react";

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
  const [showAddFriend, setShowAddFriend] = useState(false);
  const [friends, setFriends] = useState(initialFriends);
  const [selected, setSelected] = useState(null);

  function handleAddFriends(friend) {
    setFriends((prev) => [...prev, friend]);
  }

  function handleShowAddFriend(e) {
    e.preventDefault();
    setShowAddFriend((show) => !show);
  }

  function handleSelectedFriend(friend) {
    setSelected((cur) => (cur?.id === friend.id ? null : friend));
    setShowAddFriend(false);
  }

  function handleSplitBill(amount) {
    //selected.balance = selected.balance + amount;
    setFriends((friends) =>
      friends.map((friend) =>
        friend.id === selected.id
          ? { ...friend, balance: friend.balance + amount }
          : friend
      )
    );

    setSelected(null);
  }

  return (
    <div className="app">
      <SectionFriends
        showAddFriend={showAddFriend}
        onShowAddFriend={handleShowAddFriend}
        friends={friends}
        onAddFriends={handleAddFriends}
        selected={selected}
        onSelectedFriend={handleSelectedFriend}
      />
      <FormSplit selected={selected} onSplitBill={handleSplitBill} />
    </div>
  );
}

function SectionFriends({
  showAddFriend,
  onShowAddFriend,
  friends,
  onAddFriends,
  selected,
  onSelectedFriend,
}) {
  return (
    <div>
      <FriendList
        onShowAddFriend={onShowAddFriend}
        showAddFriend={showAddFriend}
        friends={friends}
        onAddFriends={onAddFriends}
        selected={selected}
        onSelectedFriend={onSelectedFriend}
      />
    </div>
  );
}

function FriendList({
  onShowAddFriend,
  showAddFriend,
  friends,
  onAddFriends,
  selected,
  onSelectedFriend,
}) {
  return (
    <div className="sidebar">
      <ul>
        {friends.map((el) => (
          <Friends
            key={el.id}
            friend={el}
            selected={selected}
            onSelectedFriend={onSelectedFriend}
          />
        ))}
      </ul>
      {showAddFriend && <AddFriend onAddFriends={onAddFriends} />}
      <button className=" button" onClick={onShowAddFriend}>
        {showAddFriend ? `Close` : `Add Friend`}
      </button>
    </div>
  );
}

function Friends({ friend, selected, onSelectedFriend }) {
  return (
    <li>
      <img src={friend.image} alt="frnd_photo" />
      <h3>{friend.name}</h3>
      <p>
        {friend.balance > 0
          ? `${friend.name} owns you ${Math.abs(friend.balance)} \u00A3`
          : friend.balance === 0
          ? `You and ${friend.name} are even`
          : `you own ${friend.name} ${Math.abs(friend.balance)} \u00A3`}
      </p>
      <button className="button" onClick={() => onSelectedFriend(friend)}>
        {selected?.id === friend.id ? `Close` : `Select`}
      </button>
    </li>
  );
}

function AddFriend({ onAddFriends }) {
  const [name, setName] = useState("");
  const [img, setImg] = useState("https://i.pravatar.cc/48");

  function handleSubmit(e) {
    e.preventDefault();
    const id = crypto.randomUUID();
    const friend = {
      id,
      name,
      image: `${img}?=${id}`,
      balance: 0,
    };
    if (!name) return;

    onAddFriends(friend);

    setName("");
    setImg("https://i.pravatar.cc/48");
  }
  return (
    <div className="form-add-friend">
      <form onSubmit={handleSubmit}>
        <label>🧑‍🤝‍🧑Friend-Name </label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
        <label>🙍‍♀️ Image URL </label>
        <input
          type="text"
          value={img}
          onChange={(e) => setImg(e.target.value)}
        ></input>
        <button className="button" type="submit">
          Add
        </button>
      </form>
    </div>
  );
}

function FormSplit({ selected, onSplitBill }) {
  const [bill, setBill] = useState("");
  const [payBill, setPayBill] = useState("user");
  const [yourBill, setYourBill] = useState("");
  let friendBill = bill ? bill - yourBill : "";

  function handleSubmit(e) {
    e.preventDefault();
    if (!bill || !yourBill) return;

    onSplitBill(payBill === "user" ? friendBill : -yourBill);
    setBill("");
    setPayBill("user");
    setYourBill("");
    friendBill = "";
  }

  return (
    selected && (
      <form className="form-split-bill" onSubmit={handleSubmit}>
        <h2>Split a Bill With {selected.name}</h2>
        <label>💰 Bill Value</label>
        <input
          type="Number"
          value={bill}
          onChange={(e) => setBill(Number(e.target.value))}
        ></input>
        <label>🕴️ Your Expense</label>
        <input
          type="Number"
          value={yourBill}
          onChange={(e) => setYourBill(Number(e.target.value))}
        ></input>
        <label>🧑‍🤝‍🧑 {selected.name}'s Expense</label>
        <input disabled type="text" value={friendBill}></input>
        <label>🤑 Who is paying the bill</label>
        <select
          value={payBill}
          onChange={(e) => setPayBill(Number(e.target.value))}
        >
          <option value="user">You</option>
          <option value="friend">{selected.name}</option>
        </select>
        <button className="button">Split Bill</button>
      </form>
    )
  );
}

export default App;
