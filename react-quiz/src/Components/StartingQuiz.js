export default function StartingQuiz({ numQuestions, dispatch, questions }) {
  return (
    <div>
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} questions to test your React mastery</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start", payload: questions })}
      >
        Lets Start
      </button>
    </div>
  );
}
