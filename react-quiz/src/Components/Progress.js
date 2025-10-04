function Progress({ index, totalPoints, points, numQuestions, answer }) {
  const current = Math.min(index + Number(answer != null), numQuestions);
  return (
    <header className="progress">
      <progress id="p" max={numQuestions} value={current}>
        {Math.round((current / numQuestions) * 100)}%
      </progress>
      <p>
        Questions (<strong>{index + 1}</strong>/{numQuestions})
      </p>
      <p>
        <strong>{points}</strong> /{totalPoints}
      </p>
    </header>
  );
}

export default Progress;
