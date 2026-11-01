
import * as he from "he"
import Question from "./Question.jsx"
import { useState } from "react"

export default function QuizScreen(props) {
    const [showResults, setShowResults] = useState(false)
    const [playerAnswers, setPlayerAnswers] = useState({})

    const correctAnswers = props.questions.filter(
        (question, index) =>
            playerAnswers[index] === he.decode(question.correct_answer)
    ).length

    const allAnswered =
        props.questions.length > 0 &&
        props.questions.length === Object.keys(playerAnswers).length

    function handleQuestionAnswers(questionId, chosenAnswer) {
        setPlayerAnswers(prev => ({
            ...prev,
            [questionId]: chosenAnswer
        }))
    }

    return (
        <div className="quiz-screen">
            <h1>Quiz Time! 🧠</h1>

            {props.loading ? (
                <p>Loading questions...</p>
            ) : props.error ? (
                <>
                    <p className="error">{props.error}</p>
                    <button onClick={props.onBackToSettings}>
                        Back to Settings
                    </button>
                </>
            ) : (
                <>
                    {props.questions.map((question, index) => (
                        <Question
                            key={index}
                            questionId={index}
                            questionText={he.decode(question.question)}
                            shuffledAnswers={question.shuffledAnswers.map(
                                answer => he.decode(answer)
                            )}
                            correctAnswer={he.decode(question.correct_answer)}
                            resultsShown={showResults}
                            onAnswerSelect={handleQuestionAnswers}
                        />
                    ))}

                    {!showResults && (
                        <button
                            disabled={!allAnswered}
                            onClick={() => setShowResults(true)}
                        >
                            Check Answers
                        </button>
                    )}

                    {showResults && (
                        <p>
                            You got {correctAnswers} out of {props.questions.length} correct!
                        </p>
                    )}

                    {showResults && (
                        <button onClick={props.onPlayAgain}>
                            Play Again
                        </button>
                        
                    )}
                        <button onClick={props.onBackToSettings}>
                            Back to Settings
                        </button>
                </>
            )}
        </div>
    )
}
