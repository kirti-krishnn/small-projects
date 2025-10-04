import { useEffect, useReducer } from "react";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartingQuiz from "./Components/StartingQuiz";
import Header from "./Components-org/Header";
import Main from "./Components/Main";
import Question from "./Components/Question";
import Options from "./Components/Options";
import Progress from "./Components/Progress";
import Button from "./Components/Button";
import Footer from "./Components/Footer";
import Timer from "./Components/Timer";

const initialState = {
  questions: [],
  index: 0,
  points: 0,
  answer: null,
  status: "Loading",
  secondsRemaining: null,
};

function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "Loading":
      return { ...state, status: "Loading" };
    case "Error":
      return { ...state, status: "Error" };
    case "Data-Received":
      console.log("ready state");
      return { ...state, questions: action.payload, status: "Ready" };
    case "Start":
      return {
        ...state,
        index: 0,
        points: 0,
        answer: null,
        status: "Start",
        secondsRemaining: state.questions.length * 60,
      };
    case "NewAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      };
    case "nextQuestion":
      console.log(state);
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status: "Start",
      };

    case "Result":
      return {
        ...state,
        status: "Result",
      };

    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "Result" : state.status,
      };
    default:
      return state;
  }
}

function App() {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { questions, index, status, answer, points, secondsRemaining } = state;
  console.log(questions);
  const numQuestions = questions.length;
  const totalPoints = questions.reduce((sum, q) => sum + (q.points ?? 0), 0);
  console.log(totalPoints);

  useEffect(function () {
    async function getQuestions() {
      try {
        dispatch({ type: "Loading" });
        const res = await fetch(`http://localhost:9000/questions`);
        if (!res.ok) throw new Error("Something went wrong fetching the data");
        const data = await res.json();
        console.log(data);
        dispatch({ type: "Data-Received", payload: data });
      } catch (err) {
        dispatch({ type: "Error" });
      }
    }
    getQuestions();
  }, []);
  return (
    <div className="app">
      <Header className="app-header" />
      <Main className="main">
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartingQuiz numQuestions={numQuestions} dispatch={dispatch} />
        )}
        {status === "Start" && (
          <div>
            <Progress
              points={points}
              totalPoints={totalPoints}
              index={index}
              numQuestions={numQuestions}
              answer={answer}
            />
            <Question question={questions[index].question} />
            <Options
              options={questions[index].options}
              dispatch={dispatch}
              answer={answer}
              correctAnswer={questions[index].correctOption}
            />
            <Footer>
              <Timer dispatch={dispatch} secondsRemaining={secondsRemaining} />
              {index === numQuestions - 1 ? (
                <Button onClick={() => dispatch({ type: "Result" })}>
                  Finish
                </Button>
              ) : (
                <Button onClick={() => dispatch({ type: "nextQuestion" })}>
                  Next
                </Button>
              )}
            </Footer>
          </div>
        )}
        {status === "Result" && (
          <>
            <p className="result">
              You scored {points} out of {totalPoints}
            </p>

            <Button onClick={() => dispatch({ type: "Start" })}>
              Restart Quiz
            </Button>
          </>
        )}
      </Main>
    </div>
  );
}

export default App;
