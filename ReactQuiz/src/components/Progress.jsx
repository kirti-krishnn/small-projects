import { useQuiz } from "../contexts/QuizContext";

function Progress() {
  const { numQuestions, index, points } = useQuiz();

  return (
    <div className="progress">
      <progress id="file" value={points} max="280"></progress>
      <p>
        Question <span>{index + 1}</span>/{numQuestions}
      </p>
      <p>
        <span>{points}</span>/280 points
      </p>
    </div>
  );
}

export default Progress;
