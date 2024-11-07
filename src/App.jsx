import { useState, useEffect } from "react";
import Start from "./components/Start.jsx";
import Question from "./components/Question.jsx";
import { getQuestions, getToken } from "./api.js";
import { nanoid } from 'nanoid';
import { decode } from 'html-entities';

function App() {
	const [isStarted, setIsStarted] = useState(false);
	const [questions, setQuestions] = useState([]);
	const [correctAnswers, setCorrectAnswers] = useState(0);
	const [isChecked, setIsChecked] = useState(false);
	const [fetchQuestions, setFetchQuestions] = useState(false);

	useEffect(() => {
		const getData = async () => {
			console.log("isstarted");
			const sessionToken = await getToken();
			const data = await getQuestions(sessionToken);
			localStorage.setItem("token", sessionToken);
			setQuestions(buildQuestionsData(data));
			console.log('isstarted: ', sessionToken);
		};
		isStarted && getData();

	}, [isStarted]);

	useEffect(() => {
		const getData = async () => {
			const sessionToken = localStorage.getItem('token');
			const data = await getQuestions(sessionToken);
			setQuestions(buildQuestionsData(data));
			console.log('fetchquestions: ', sessionToken);
		};
		fetchQuestions && getData();
		setFetchQuestions(false);

	}, [fetchQuestions])

	function startQuiz() {
		setIsStarted(true);
	}

	function restartQuiz() {
		setIsChecked(false);
		setCorrectAnswers(0);
		setFetchQuestions(true);
	}

	function buildQuestionsData(data) {
		const newData = data.results.map((question) => {
			const randIndex = Math.floor(Math.random() * (question.incorrect_answers.length + 1))
			const questionObj = {
				id: nanoid(),
				question: decode(question.question),
				answers: question.incorrect_answers.map(answer => {
					return {
						id: nanoid(),
						answer: decode(answer),
						isCorrect: false,
						isSelected: false
					}
				})
			}
			questionObj.answers.splice(randIndex, 0, {
				id: nanoid(),
				answer: decode(question.correct_answer),
				isCorrect: true,
				isSelected: false
			})
			return questionObj;
		})

		return newData;
	}

	function selectAnswer(answerId, questionId) {
		setQuestions(prevState => {
			return prevState.map(question => {
				return question.id !== questionId ?
					question :
					{
						...question,
						answers: question.answers.map(answer => {
							return answer.id !== answerId ?
								{...answer, isSelected: false} :
								{...answer, isSelected: !answer.isSelected}
							})
					}
			})
		})
		console.log(questions)
	}

	function checkAnswers() {
		let correct = 0;
		questions.forEach(question => {
			question.answers.forEach(answer => {
				if(answer.isSelected && answer.isCorrect) {
					correct += 1;
				} 
			})
		})
		setCorrectAnswers(correct);
		setIsChecked(true);
	}

	const renderQuestions = questions.map((question) => {
		return <Question 
			key={question.id} 
			questionId={question.id}
			question={question.question} 
			answers={question.answers}
			isChecked={isChecked}
			handleSelect={selectAnswer}
		 />
	})

	return (
		<main>
			{!isStarted ? (
				<Start startQuiz={startQuiz} />
			) : (
				<section className="questions-screen">
					{renderQuestions}
					<div className="buttons-section">
						{isChecked && <span>Correct answers: {correctAnswers}</span>}
						{isChecked && <button className="btn restart-game" onClick={restartQuiz}>Restart Game</button>}
						{!isChecked && <button className="btn check-answers" onClick={checkAnswers}>Check answers</button>}
					</div>
				</section>
			)}
		</main>
	);
}

export default App;
