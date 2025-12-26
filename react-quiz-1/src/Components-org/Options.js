export default function Options({ question, answer, dispatch }) {
  const options = question.options;
  const hasAnswered = answer !== null;

  /**/

  return (
    <div className="options">
      {options.map((option, i) => {
        return (
          <button
            key={i}
            className={`btn btn-option ${i === answer ? "answer" : ""} 
            ${
              hasAnswered
                ? i === question.correctOption
                  ? "correct"
                  : "wrong "
                : ""
            }`}
            onClick={
              () => dispatch({ type: "newAnswer", payload: i }) // dispatch the selected option index
            }
            disabled={hasAnswered} // disable buttons once answered
          >
            {option}
          </button>
        );
      })}
    </div>
  );
}
