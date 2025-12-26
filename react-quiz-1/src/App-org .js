import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartingQuiz from "./Components/StartingQuiz";
import Question from "./Components/Question";
import Progress from "./Components/Progress";
import NextButton from "./Components/NextButton";
import FinishScreen from "./Components/FinishScreen";

import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
  highscore: 0,
};

function reducer(state, action) {
  console.log(state);
  switch (action.type) {
    case "Data Received":
      console.log("Payload received:", action.payload);
      return {
        ...state,
        questions: action.payload,
        status: "Ready",
      };
    case "Loading":
      return {
        ...state,
        status: "Loading",
      };
    case "Error":
      return {
        ...state,
        status: "Error",
      };
    case "start":
      return {
        ...state,
        questions: action.payload,
        index: 0,
        status: "start",
        answer: null,
      };
    case "newAnswer":
      return {
        ...state,
        answer: action.payload,
        points:
          action.payload === state.questions[state.index].correctOption
            ? state.points + state.questions[state.index].points
            : state.points,
      };
    case "nextQuestion":
      return {
        ...state,
        index: state.index + 1,
        answer: null,
        status: "start",
      };

    case "finish":
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    case "restart":
      return { ...initialState, questions: state.questions, status: "start" };
    default:
      return state;
  }
}

function App() {
  const [{ questions, status, index, points, answer, highscore }, dispatch] =
    useReducer(reducer, initialState);
  const numQuestions = questions.length;
  const maxPossiblePoints = questions.reduce(
    (prev, cur) => prev + cur.points,
    0
  );
  useEffect(function () {
    async function getQuestions() {
      try {
        dispatch({ type: "Loading" });
        const res = await fetch("http://localhost:9000/questions");
        if (!res.ok)
          throw new Error("Something went wrong with fetching quiz data");
        const data = await res.json();
        dispatch({ type: "Data Received", payload: data });
      } catch (err) {
        dispatch({ type: "Error" });
      }
    }
    getQuestions();
  }, []);

  return (
    <div className="app">
      <Header />
      <Main>
        {status === "Loading" && <Loader />}
        {status === "Error" && <Error />}
        {status === "Ready" && (
          <StartingQuiz
            numQuestions={numQuestions}
            dispatch={dispatch}
            questions={questions}
          />
        )}
        {status === "start" && (
          <div>
            <Progress
              index={index}
              answer={answer}
              numQuestions={numQuestions}
              points={points}
              maxPossiblePoints={maxPossiblePoints}
            />
            <Question
              questions={questions}
              index={index}
              dispatch={dispatch}
              answer={answer}
            />
            <NextButton
              answer={answer}
              index={index}
              dispatch={dispatch}
              numQuestions={numQuestions}
            />
          </div>
        )}
        {status === "finished" && (
          <FinishScreen
            points={points}
            maxPossiblePoints={maxPossiblePoints}
            highscore={highscore}
            dispatch={dispatch}
          />
        )}
      </Main>
    </div>
  );
}

export default App;
