import { useQuiz } from "../contexts/QuizContext";
import Options from "./Options";

function Questions() {
  const { questions, index } = useQuiz();
  const question = questions[index];
  return (
    <div className="loader-container">
      <h3>{question.question} </h3>
      <Options />
    </div>
  );
}

export default Questions;
