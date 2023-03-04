import "./App.css";
import { useEffect, useMemo, useState } from "react";
import Start from "./Components/Start";
import Timer from "./Components/Timer";
import Quiz from "./Components/Quiz";

function App() {
  const [username, setUsername] = useState(null);
  const [timeOut, setTimeOut] = useState(false);
  const [questionNumber, setQuestionNumber] = useState(1);
  const [earned, setEarned] = useState("0");

  const data = [
    {
      id: 1,
      question: "Which of the following corresponds to (ek bataa do)?",
      answers: [
        {
          text: "Pura",
          correct: false,
        },
        {
          text: "Adha",
          correct: true,
        },
        {
          text: "Sawa",
          correct: false,
        },
        {
          text: "Pauna",
          correct: false,
        },
      ],
    },
    {
      id: 2,
      question:
        "In the game of ludo the discs or tokens are of how many colours?",
      answers: [
        {
          text: "one",
          correct: false,
        },
        {
          text: "two",
          correct: false,
        },
        {
          text: "three",
          correct: false,
        },
        {
          text: "four",
          correct: true,
        },
      ],
    },
    {
      id: 3,
      question: "Where was the BRICS summit held in 2022?",
      answers: [
        {
          text: "India",
          correct: false,
        },
        {
          text: "Brazil",
          correct: false,
        },
        {
          text: "Russia",
          correct: false,
        },
        {
          text: "China",
          correct: true,
        },
      ],
    },
  ];

  const moneyPyramid = useMemo(
    () =>
      [
        { id: 1, amount: "1,000" },
        { id: 2, amount: "2,000" },
        { id: 3, amount: "3,000" },
        { id: 4, amount: "5,000" },
        { id: 5, amount: "10,000" },
        { id: 6, amount: "20,000" },
        { id: 7, amount: "40,000" },
        { id: 8, amount: "80,000" },
        { id: 9, amount: "1,60,000" },
        { id: 10, amount: "3,20,000" },
        { id: 11, amount: "6,40,000" },
        { id: 12, amount: "12,50,000" },
        { id: 13, amount: "25,00,000" },
        { id: 14, amount: "50,00,000" },
        { id: 15, amount: "1 Crore" },
        { id: 16, amount: "7 Crore" },
      ].reverse(),
    []
  );

  useEffect(() => {
    questionNumber > 1 &&
      setEarned(moneyPyramid.find((m) => m.id === questionNumber - 1).amount);
  }, [questionNumber, moneyPyramid]);

  return (
    <div className="app">
      {!username ? (
        <Start setUsername={setUsername} />
      ) : (
        <>
          <div className="main">
            {timeOut ? (
              <h1 className="endText">You earned: {earned}</h1>
            ) : (
              <>
                <div className="top">
                  <div className="timer">
                    <Timer
                      setTimeOut={setTimeOut}
                      questionNumber={questionNumber}
                    />
                  </div>
                </div>
                <div className="bottom">
                  <Quiz
                    data={data}
                    questionNumber={questionNumber}
                    setQuestionNumber={setQuestionNumber}
                    setTimeOut={setTimeOut}
                  />
                </div>
              </>
            )}
          </div>
          <div className="pyramid">
            <ul className="moneyList">
              {moneyPyramid.map((m) => (
                <li
                  key={m.id}
                  className={
                    questionNumber === m.id
                      ? "moneyListItem active"
                      : "moneyListItem"
                  }
                >
                  <span className="moneyListItemNumber">{m.id}</span>
                  <span className="moneyListItemAmount">{m.amount}</span>
                </li>
              ))}
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default App;
