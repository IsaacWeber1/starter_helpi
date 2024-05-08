export const ProgressBar = ({value, max} : {value : number, max : number}):JSX.Element => {
    return(
        <div>
            <p className="quiz-progress-bar-text">{`${value} / ${max}`}</p>
            <progress className="quiz-progress-bar" value={value} max={max}></progress>
        </div>
    )
}