import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];
/* 
function App() {
  return (
    <div>
      <Steps />
      <Steps />
    </div>
  );
}

function Steps() {
  const [step, setStep] = useState(1);
  const [isopen, setIsOpen] = useState(true);

  function handlerNext() {
    if (step < 3) {
      setStep((s) => s + 1);
    }
  }

  function handlerPrevious() {
    if (step > 0) {
      setStep((s) => s - 1);
    }
  }

  return (
    <div
      style={{
        position: "relative",
        marginBottom: "2rem",
        border: "1px solid #ccc",
        padding: "1rem",
      }}
    >
      <button className="close" onClick={() => setIsOpen((isopen) => !isopen)}>
        &times;
      </button>

      {isopen && (
        <div className="steps">
          <div className="numbers">
            <div className={step >= 1 ? "active" : ""}>1</div>
            <div className={step >= 2 ? "active" : ""}>2</div>
            <div className={step >= 3 ? "active" : ""}>3</div>
          </div>

          <p className="message">
            {step === 0 ? `make a selection` : `${messages[step - 1]}`}
          </p>

          <div className="buttons">
            <button
              className="previous"
              onClick={handlerPrevious}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Previous
            </button>
            <button
              className="next"
              onClick={handlerNext}
              style={{ backgroundColor: "#7950f2", color: "#fff" }}
            >
              Next
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
 */

export default function App() {
  return <Steps />;
}

function Steps() {
  const [steps, setSteps] = useState(0);
  const [open, setOpen] = useState(true);

  function handlePrevious() {
    if (steps > 0) {
      setSteps((s) => s - 1);
    }
  }

  function handleNext() {
    if (steps < 3) {
      setSteps((s) => s + 1);
    }
  }
  return (
    <div>
      <button className="close" onClick={() => setOpen((open) => !open)}>
        &times;
      </button>
      {open && (
        <div className="steps">
          <div className="numbers">
            <div className={steps === 1 ? "active" : ""}>1</div>
            <div className={steps === 2 ? "active" : ""}>2</div>
            <div className={steps === 3 ? "active" : ""}>3</div>
          </div>
          <div className="message">
            Step{steps} :{messages[steps - 1]}
          </div>
          <div className="buttons">
            <button onClick={handlePrevious}>Previous</button>
            <button onClick={handleNext}>Next</button>
          </div>
        </div>
      )}
    </div>
  );
}
