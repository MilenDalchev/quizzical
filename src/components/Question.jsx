
function Question(props) {
    return (
        <div className="question-wrapper">
            <div className="question-text">{props.question}</div>
            <div className="answers-wrapper">
                {props.answers.map((answer) => {
                    let classList = answer.isSelected ? ' answer__selected' : ''
                    if(props.isChecked) {
                        if(answer.isSelected) {
                            if(answer.isCorrect) {
                                classList = ' answer__correct'
                            } else {
                                classList = ' answer__incorrect'
                            }
                        } else {
                            if(answer.isCorrect) {
                                classList = ' answer__correct'
                            }
                        }
                    }
                    return <button 
                        key={answer.id} 
                        className={`answer${classList}`}
                        onClick={() => props.handleSelect(answer.id, props.questionId)}
                        disabled={props.isChecked}
                    >{answer.answer}</button>
                })}
            </div>
        </div>
    )
}

export default Question