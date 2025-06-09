import "./App.css";
import React, { useState } from "react";

function App() {
  const [bill, setBill] = useState("");
  const [percentage1, setPercentage1] = useState(0);
  const [percentage2, setPercentage2] = useState(0);

  const tip = bill * ((percentage1 + percentage2) / 2 / 100);

  function handleReset() {
    setBill("");
    setPercentage1(0);
    setPercentage2(0);
  }

  return (
    <div>
      <BillAmount bill={bill} setBill={setBill}>
        How much was the bill?{" "}
      </BillAmount>
      <SelectPercentage percentage={percentage1} setPercentage={setPercentage1}>
        How did you like the service?{" "}
      </SelectPercentage>
      <SelectPercentage percentage={percentage2} setPercentage={setPercentage2}>
        How much did your friend like the service?{" "}
      </SelectPercentage>
      <BillBreakUp tip={tip} bill={bill}></BillBreakUp>
      <Reset handleReset={handleReset} bill={bill}></Reset>
    </div>
  );
}

function BillAmount({ bill, children, setBill }) {
  return (
    <div>
      <label>{children} </label>
      <input
        type="text"
        value={bill}
        placeholder="bill value"
        onChange={(e) => setBill(Number(e.target.value))}
      ></input>
    </div>
  );
}

function SelectPercentage({ children, setPercentage, percentage }) {
  return (
    <div>
      <label> {children} </label>
      <select
        value={percentage}
        onChange={(e) => setPercentage(Number(e.target.value))}
      >
        <option value="0">Dissatisfied (0%)</option>
        <option value="5">It was okay (5%)</option>
        <option value="10">It was good (10%)</option>
        <option value="20">Absolutely amazing! (20%)</option>
      </select>
    </div>
  );
}

function BillBreakUp({ tip, bill }) {
  return (
    bill && (
      <h2>
        You pay ${bill + tip} (${bill} +${tip})
      </h2>
    )
  );
}

function Reset({ handleReset, bill }) {
  return bill && <button onClick={handleReset}>Reset</button>;
}

export default App;
