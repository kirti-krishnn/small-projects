import Options from "./Options";

export default function Question({ questions, index, answer, dispatch }) {
  const question = questions[index];
  return (
    <div>
      <h4>{questions[index].question}</h4>
      <Options question={question} answer={answer} dispatch={dispatch} />
    </div>
  );
}
