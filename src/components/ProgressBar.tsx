export const ProgressBar = ({value, max} : {value : number, max : number}):JSX.Element => {
    return(
        <div>
            <progress className="quiz-progress-bar" value={value} max={max}></progress>
        </div>
    )
}