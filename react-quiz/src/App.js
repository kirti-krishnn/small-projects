import Header from "./Components/Header";
import Main from "./Components/Main";
import Loader from "./Components/Loader";
import Error from "./Components/Error";
import StartingQuiz from "./Components/StartingQuiz";
import Question from "./Components/Question";

import { useEffect, useReducer } from "react";

const initialState = {
  questions: [],
  status: "loading",
  index: 0,
  points: 0,
  answer: null,
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
      console.log("Before:", state.answer);
      console.log("After:", action.payload);
      return {
        ...state,
        answer: action.payload,
        status: "start",
      };
    default:
      return state;
  }
}

function App() {
  const [{ questions, status, index, points, answer }, dispatch] = useReducer(
    reducer,
    initialState
  );
  const numQuestions = questions.length;
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
            <Question
              questions={questions}
              index={index}
              dispatch={dispatch}
              answer={answer}
            />
          </div>
        )}
      </Main>
    </div>
  );
}

export default App;
