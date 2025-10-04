function Options({ options, dispatch, answer, correctAnswer }) {
  console.log(correctAnswer);

  const hasAnswered = answer != null;
  console.log(hasAnswered);
  return (
    <div className="options">
      {options.map((option, index) => {
        return (
          <button
            key={index}
            className={`btn btn-option ${answer === index ? "answer" : ""} ${
              hasAnswered ? (index === correctAnswer ? "correct" : "wrong") : ""
            }`}
            onClick={() => dispatch({ type: "NewAnswer", payload: index })}
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}

export default Options;
