import { useState } from "react";
import "./App.css";

export default function App() {
  return (
    <div className="App">
      <Counter />
    </div>
  );
}

function Counter() {
  const [step, setStep] = useState(1);
  const [counter, setCounter] = useState(0);

  const date = new Date("24-May-2025");
  date.setDate(date.getDate() + counter);

  return (
    <div>
      <div>
        <input
          type="range"
          min="1"
          max="10"
          value={step}
          step="1"
          onChange={(e) => setStep(Number(e.target.value))}
        />
        Step:{step}
      </div>
      <div>
        <button onClick={() => setCounter((c) => c - step)}>-</button>
        <input
          type="text"
          value={counter}
          onChange={(e) => setCounter(Number(e.target.value))}
        />
        <button onClick={() => setCounter((c) => c + step)}>+</button>
        <p>
          {counter === 0
            ? `Today's date is ${date.toDateString()}`
            : `After ${counter} days , the date is ${date.toDateString()}`}
        </p>
      </div>
    </div>
  );
}
