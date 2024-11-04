function Start(props) {
    return (
        <section className="start-screen">
            <h1 className="start-screen__heading">Quizzical</h1>
            <p className="start-screen__description">Take a quiz!</p>
            <button className="btn" onClick={props.startQuiz}>Start quiz</button>
        </section>
    )
}

export default Start