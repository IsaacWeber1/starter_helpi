import { Suspense, useState } from "react"
import { DisplayQuiz } from "src/components/DisplayQuiz"
import { Loading } from "src/components/Loading"
import { ProgressBar } from "src/components/ProgressBar"
import { basicQuiz } from "src/assets/quizzes/BasicQuiz"
import { ParentProps } from "src/components/DisplayQuiz"

export const BasicQuiz = () => {
    const numStartingQuestions = Object.keys(basicQuiz).length;

    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
    const [currTotQuestions, setCurrTotQuestions] = useState<number>(numStartingQuestions);
    const totalQuestions = 14 + numStartingQuestions;

    const currentProps: ParentProps = {
        quiz: basicQuiz,
        title: "Basic Quiz",
        questionsAnswered: questionsAnswered,
        totalQuestions: totalQuestions,
        currTotQuestions: currTotQuestions,
        setQuestionsAnswered: setQuestionsAnswered,
        setCurrTotQuestions: setCurrTotQuestions
    }

    return(
    <div className="App-quiz">
        <div className="quiz-container-o">
            <ProgressBar
                value={questionsAnswered}
                max={totalQuestions}
            />
            <Suspense fallback={<Loading type="Basic Quiz"/>}>
                <DisplayQuiz 
                    parentProps={currentProps}
                />
            </Suspense>
        </div>
    </div>)
}