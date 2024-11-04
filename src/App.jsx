import { useState, useEffect } from "react";
import Start from "./components/Start.jsx";
import Question from "./components/Question.jsx";
import { getQuestions, getToken } from "./api.js";

function App() {
  const [isStarted, setIsStarted] = useState(false);
  const [questions, setQuestions] = useState([]);

  useEffect(() => {
    const getData = async () => {
      console.log("Effect Triggered");
      const sessionToken = await getToken();
      const data = await getQuestions(sessionToken);
      localStorage.setItem("token", sessionToken);
      setQuestions(data.results);
      // return questions;
      console.log(data.results);
    };
    // return () => {
    // 	setQuestions(getData());
    // }
    getData();
  }, []);

  function startQuiz() {
    setIsStarted(true);
  }

  return (
    <main>
      {!isStarted ? (
        <Start startQuiz={startQuiz} />
      ) : (
        <section className="questions-screen">
          {/* <Question /> */}
          {/* <Question /> */}
          {/* <Question /> */}
          {questions.map((question, index) => (
            <p key={index}>{question.question}</p>
          ))}
          <button className="btn check-answers">Check answers</button>
        </section>
      )}
    </main>
  );
}

export default App;
