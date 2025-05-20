import "./index.css";

import { useState } from "react";

function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setstep] = useState(1);
  const [count, setcount] = useState(0);
  const date = new Date("may 20 2025");
  date.setDate(date.getDate() + count);
  return (
    <div>
      <button onClick={() => setstep((s) => s - 1)}>-</button>
      <span> Step:{`${step}`} </span>
      <button onClick={() => setstep((s) => s + 1)}>+</button>
      <br></br>
      <button onClick={() => setcount((s) => s - step)}>-</button>
      <span> Count:{`${count}`} </span>
      <button onClick={() => setcount((s) => s + step)}>+</button>
      <p>{`${count} days from today is ${date.toDateString()}`}</p>
    </div>
  );
}

export default App;
