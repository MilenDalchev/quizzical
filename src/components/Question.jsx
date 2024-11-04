function Question() {
    return (
        <div className="question-wrapper">
            <div className="question-text">How would one say goodbye in Spanish?</div>
            <div className="answers-wrapper">
                <button className="answer answer__selected">Adios</button>
                <button className="answer">Hola</button>
                <button className="answer">Au Revoir</button>
                <button className="answer">Salir</button>
            </div>
        </div>
    )
}

export default Question