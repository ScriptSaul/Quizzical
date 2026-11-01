
export default function Answer(props) {
    let answerClass = "answer-button";

    if (!props.resultsShown) {
        if (props.isSelected) {
            answerClass += " selected";
        }
    } else {
        if (props.isCorrectAnswer) {
            answerClass += " correct";
        } else if (props.isSelected && !props.isCorrectAnswer) {
            answerClass += " incorrect";
        }
    }

    return (
        <button
            className={answerClass}
            onClick={props.onSelect}
            disabled={props.resultsShown}
        >
            {props.answerText}
        </button>
    );
}
