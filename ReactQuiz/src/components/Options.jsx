import { useQuiz } from "../contexts/QuizContext";

function Options() {
  const { questions, index, dispatch, answer } = useQuiz();
  const question = questions[index];
  const Options = question.options;
  const hasAnswered = answer != null;

  console.log(question.correctOption);
  return Options.map((option, i) => (
    <button
      className={`btn btn-option ${i === answer ? "answer" : ""} ${
        hasAnswered ? (i === question.correctOption ? "correct" : "wrong") : ""
      }`}
      onClick={() => dispatch({ type: "newAnswer", payload: i })}
      disabled={hasAnswered}
      key={option}
    >
      {option}
    </button>
  ));
}

export default Options;
