import { useState } from "react";

const messages = [
  "Learn React ⚛️",
  "Apply for jobs 💼",
  "Invest your new income 🤑",
];

export default function App() {
  return <Steps />;
}

function Steps() {
  const [steps, setSteps] = useState(1);
  const [open, setOpen] = useState(true);

  function handlePrevious() {
    if (steps > 1) {
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
          <StepMessage>
            Step{steps} :{messages[steps - 1]}
          </StepMessage>
          <div className="buttons">
            <Button bgcolor="#7950f2" color="#fff" onClick={handlePrevious}>
              👈 Previous
            </Button>
            <Button bgcolor="#7950f2" color="#fff" onClick={handleNext}>
              Next 👉
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}

function StepMessage({ children }) {
  return <div className="message">{children}</div>;
}

function Button({ color, bgcolor, onClick, children }) {
  return (
    <button
      style={{ backgroundColor: bgcolor, color: color }}
      onClick={onClick}
    >
      {children}
    </button>
  );
}
