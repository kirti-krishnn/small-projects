import Header from "./components/Header";
import Main from "./components/Main";
import StartingQuiz from "./components/StartingQuiz";
import Loader from "./components/Loader";
import { useQuiz } from "./contexts/QuizContext";
import Questions from "./components/Questions";
import Footer from "./components/Footer";
import Progress from "./components/Progress";
import FinishScreen from "./components/FinishScreen";
import Timer from "./components/Timer";

function App() {
  const { status, dispatch, numQuestions, index } = useQuiz();
  console.log(numQuestions, index);
  return (
    <div className="app">
      <Header />
      <Main className="main">
        {status === "loading" && <Loader />}
        {status === "ready" && <StartingQuiz />}
        {status === "active" && (
          <div>
            <Progress />
            <Questions />
            <Footer>
              <Timer />
              {numQuestions - 1 > index ? (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "nextQuestion" })}
                >
                  Next
                </button>
              ) : (
                <button
                  className="btn btn-ui"
                  onClick={() => dispatch({ type: "finish" })}
                >
                  Finish
                </button>
              )}
            </Footer>
          </div>
        )}
        {status === "finished" && <FinishScreen />}
      </Main>
    </div>
  );
}

export default App;
