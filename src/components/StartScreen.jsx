export default function StartScreen(props) {
    return (

            <div className="start-screen">
                <h1>Welcome to the Quizzical! 🧠</h1>
                
                <select value={props.category} onChange={e => props.setCategory(e.target.value)}>
                    <option value="any">Any Category</option>
                    {props.categories.map(category => (
                        <option key={category.id} value={category.id}>{category.name}</option>
                    ))}
                </select>

                <select value={props.difficulty} onChange={e => {
                    props.setDifficulty(e.target.value)
                }}>
                    <option value="any">Any Difficulty</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </select>

                <select value={props.questionCount} onChange={e => {
                    props.setQuestionCount(Number(e.target.value))
                }}>
                    <option value={5}>5 Questions</option>
                    <option value={10}>10 Questions</option>
                    <option value={15}>15 Questions</option>
                </select>

                <button onClick={props.startQuiz}>Start Quiz</button>

                {props.error && <p className="error">{props.error}</p>}
            </div>
    
    )}