import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";

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
  return (
    <div className="menu">
      <h2>Our Menu</h2>
      <ul className="pizzas">
        <li>
          <Pizza
            name="Pizza Spinaci"
            ingredients="Tomato, mozarella, spinach, and ricotta cheese"
            photoName="pizzas/spinaci.jpg"
            price={10}
          />
        </li>
        <li>
          <Pizza
            name="Pizza Funghi"
            ingredients="Tomato, mushrooms"
            price={12}
            photoName="pizzas/funghi.jpg"
          />
        </li>
        <li>
          <Pizza
            name="Pizza Spinaci"
            ingredients="Tomato, mozarella, spinach, and ricotta cheese"
            photoName="pizzas/spinaci.jpg"
            price={10}
          />
        </li>
        <li>
          <Pizza
            name="Pizza Funghi"
            ingredients="Tomato, mushrooms"
            price={12}
            photoName="pizzas/funghi.jpg"
          />
        </li>
        <li>
          <Pizza
            name="Pizza Spinaci"
            ingredients="Tomato, mozarella, spinach, and ricotta cheese"
            photoName="pizzas/spinaci.jpg"
            price={10}
          />
        </li>
        <li>
          <Pizza
            name="Pizza Funghi"
            ingredients="Tomato, mushrooms"
            price={12}
            photoName="pizzas/funghi.jpg"
          />
        </li>
      </ul>
    </div>
  );
}

function Pizza(props) {
  return (
    <div className="pizza">
      <img src={props.photoName} alt={props.name} />
      <div>
        <h3>{props.name}</h3>
        <p>{props.ingredients}</p>
        <span>{props.price}</span>
      </div>
    </div>
  );
}

function Footer() {
  const openHour = 9;
  const closeHour = 22;
  return (
    <footer className="footer">
      <p>
        We're happy to welcome you between {openHour}:00 and {closeHour}:00.
      </p>
    </footer>
  );
}
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
