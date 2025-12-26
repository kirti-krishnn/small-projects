/* eslint-disable react-refresh/only-export-components */

import { useContext, useEffect } from "react";
import { createContext } from "react";
import { useReducer } from "react";

const QuizContext = createContext();
const SECS_PER_QUESTION = 30;

const initialState = {
  questions: [],
  status: "loading",
  index: null,
  answer: null,
  points: 0,
  highscore: 0,
  secondsRemaining: null,
};

function reducer(state, action) {
  console.log(state.status);
  console.log(state);
  switch (action.type) {
    case "app/ready":
      return {
        ...state,
        questions: action.payload,
        status: "ready",
      };
    case "rejected":
      return {
        ...state,
        status: "error",
      };
    case "start":
      return {
        ...state,
        index: 0,
        status: "active",
        secondsRemaining: state.questions.length * SECS_PER_QUESTION,
      };
    case "newAnswer": {
      console.log(action.payload);
      console.log(state.points);
      const question = state.questions[state.index];
      return {
        ...state,
        answer: action.payload,
        points:
          question.correctOption === action.payload
            ? state.points + question.points
            : state.points,
      };
    }
    case "nextQuestion": {
      return {
        ...state,
        index: state.index + 1,
        answer: null,
      };
    }

    case "finish": {
      return {
        ...state,
        status: "finished",
        highscore:
          state.points > state.highscore ? state.points : state.highscore,
      };
    }
    case "restart": {
      return { ...initialState, questions: state.questions, status: "ready" };
    }
    case "tick":
      return {
        ...state,
        secondsRemaining: state.secondsRemaining - 1,
        status: state.secondsRemaining === 0 ? "finished" : state.status,
      };
    default:
      throw new Error("Unknown action type");
  }
}

function QuizProvider({ children }) {
  const [
    { questions, status, index, answer, points, highscore, secondsRemaining },
    dispatch,
  ] = useReducer(reducer, initialState);

  const numQuestions = questions.length;

  useEffect(function () {
    async function fetchQuestions() {
      try {
        const res = await fetch("http://localhost:9000/questions");
        const data = await res.json();
        dispatch({ type: "app/ready", payload: data });
        console.log(data);
      } catch (err) {
        dispatch({ type: "rejected", payload: err });
      }
    }
    fetchQuestions();
  }, []);

  return (
    <QuizContext.Provider
      value={{
        questions,
        status,
        index,
        answer,
        points,
        highscore,
        numQuestions,
        dispatch,
        secondsRemaining,
      }}
    >
      {children}
    </QuizContext.Provider>
  );
}

function useQuiz() {
  const context = useContext(QuizContext);
  if (context === undefined)
    throw new Error("QuizContext was used outside of the QuizProvider");
  return context;
}

export { QuizProvider, useQuiz };
