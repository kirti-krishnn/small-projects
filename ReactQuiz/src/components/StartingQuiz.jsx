import { useQuiz } from "../contexts/QuizContext";

function StartingQuiz({ children }) {
  const { numQuestions, dispatch } = useQuiz();
  console.log(numQuestions);

  return (
    <div className="start">
      <h2>Welcome to the React Quiz!</h2>
      <h3>{numQuestions} Questions to test your React mastry</h3>
      <button
        className="btn btn-ui"
        onClick={() => dispatch({ type: "start" })}
      >
        Lets Start
      </button>
      {children}
    </div>
  );
}

export default StartingQuiz;
