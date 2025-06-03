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
  const date = new Date("24-May-2025");

  const [step, setStep] = useState(1);

  const [counter, setCounter] = useState(0);

  function handleDecrement() {
    setStep((s) => s - 1);
  }

  function handleIncrement() {
    setStep((s) => s + 1);
  }

  function handleDecreCounter() {
    setCounter((c) => c - step);
  }

  function handleIncreCounter() {
    setCounter((c) => c + step);
  }
  date.setDate(date.getDate() + counter);

  return (
    <div>
      <div>
        <button onClick={handleDecrement}>-</button>
        <span> Step: {step} </span>
        <button onClick={handleIncrement}>+</button>
      </div>
      <div>
        <button onClick={handleDecreCounter}>-</button>
        <span> Counter: {counter} </span>
        <button onClick={handleIncreCounter}>+</button>
      </div>
      <p>
        {counter === 1
          ? `Today is ${date.toDateString()}date`
          : `After ${counter} days , the date is ${date.toDateString()}`}
      </p>
    </div>
  );
}

export default App;
