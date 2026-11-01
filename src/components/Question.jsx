import Answer from './Answer';
import { useState } from 'react';

export default function Question(props) {
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const isCorrect = selectedAnswer === props.correctAnswer;


    function handleAnswerSelection(answer) {
        setSelectedAnswer(answer);
        props.onAnswerSelect(props.questionId, answer);
    }

    return (
        <div className="question-card">
            <h2>{props.questionText}</h2>
            <div className="answers-container">
                {props.shuffledAnswers.map((answer, index) => (
                    <Answer 
                    key={index}
                    answerText={answer}
                    onSelect={() => handleAnswerSelection(answer)}
                    isSelected={selectedAnswer === answer}
                    isCorrectAnswer={answer === props.correctAnswer} 
                    resultsShown={props.resultsShown}
                    />
                ))}
            </div>
            {props.resultsShown && <p>{isCorrect ? "Correct!" : "Incorrect."}</p>}
        </div>
    )
}