import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";

const pizzaData = [
  {
    name: "Focaccia",
    ingredients: "Bread with italian olive oil and rosemary",
    price: 6,
    photoName: "pizzas/focaccia.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Margherita",
    ingredients: "Tomato and mozarella",
    price: 10,
    photoName: "pizzas/margherita.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Spinaci",
    ingredients: "Tomato, mozarella, spinach, and ricotta cheese",
    price: 12,
    photoName: "pizzas/spinaci.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Funghi",
    ingredients: "Tomato, mozarella, mushrooms, and onion",
    price: 12,
    photoName: "pizzas/funghi.jpg",
    soldOut: false,
  },
  {
    name: "Pizza Salamino",
    ingredients: "Tomato, mozarella, and pepperoni",
    price: 15,
    photoName: "pizzas/salamino.jpg",
    soldOut: true,
  },
  {
    name: "Pizza Prosciutto",
    ingredients: "Tomato, mozarella, ham, aragula, and burrata cheese",
    price: 18,
    photoName: "pizzas/prosciutto.jpg",
    soldOut: false,
  },
];

const numPizzas = pizzaData.length;
console.log(numPizzas);

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

function App() {
  return (
    <div className="container">
      <Header />
      <Menu />
      <Footer />
    </div>
  );
}

function Header() {
  return (
    <div className="header">
      <h1>Fast React Pizza Co</h1>
    </div>
  );
}
function Menu() {
  return numPizzas > 0 ? (
    <>
      <h2> Our Menu</h2>
      <div className="menu">
        <p>
          Authentic Itanian cusine.6 creative dishes to choose from. All from
          our stone oven, all creative , all authentic.
        </p>

        <ul className="pizzas">
          {pizzaData.map((pizza) => (
            <Pizza pizzaObj={pizza} key={pizza.name} />
          ))}
        </ul>
      </div>
    </>
  ) : (
    <p>We are working on our menu. Please do visit us shortly</p>
  );
}

function Pizza({ pizzaObj }) {
  return (
    <li className={`pizza ${pizzaObj.soldOut ? "sold-out" : ""}`}>
      <img src={pizzaObj.photoName} alt="pizza-photo"></img>
      <div>
        <h3>{pizzaObj.name}</h3>
        <p>{pizzaObj.ingredients}</p>
        <span>{pizzaObj.soldOut ? "SOLD-OUT" : pizzaObj.price}</span>
      </div>
    </li>
  );
}

function Footer() {
  const date = new Date();
  const openHour = 10;
  const closeHour = 22;
  return (
    <div className="footer">
      <Order open={openHour} close={closeHour} date={date} />
    </div>
  );
}

function Order({ open, close, date }) {
  console.log(open, close, date);
  return close > 23 ? (
    <div className="order">
      <em>
        We are open from {open}:00 AM till {close}:00 PM. Please order online.
      </em>
      <button className="btn">Order</button>
    </div>
  ) : (
    <em>Please come back and order from {open}:00 AM tomorrow</em>
  );
}
