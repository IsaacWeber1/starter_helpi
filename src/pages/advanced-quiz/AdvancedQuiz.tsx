import { Suspense, useState } from "react"
import { advancedQuiz } from "src/assets/quizzes/AdvancedQuiz"
import { DisplayQuiz } from "src/components/DisplayQuiz"
import { Loading } from "src/components/Loading"
import { ProgressBar } from "src/components/ProgressBar"
import { ParentProps } from "src/components/DisplayQuiz"

export const AdvancedQuiz = () => {
    const numStartingQuestions = Object.keys(advancedQuiz).length;

    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
    const [currTotQuestions, setCurrTotQuestions] = useState<number>(numStartingQuestions);
    const totalQuestions = 14 + numStartingQuestions;

    const currentProps: ParentProps = {
        quiz:advancedQuiz,
        title: "Advanced Quiz",
        questionsAnswered: questionsAnswered,
        totalQuestions: totalQuestions,
        currTotQuestions: currTotQuestions,
        setQuestionsAnswered: setQuestionsAnswered,
        setCurrTotQuestions: setCurrTotQuestions
    }

    return(

    <div
        style={{
            padding: 'vh',
            paddingBottom: '100px'
        }}
    >
        <>
        <ProgressBar
            value={questionsAnswered}
            max={currTotQuestions}
        />
        <Suspense fallback={<Loading type="Advanced Quiz"/>}>
            <DisplayQuiz 
                parentProps={currentProps}
            />
        </Suspense>
        </>
    </div>)
}