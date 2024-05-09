import { dummyQuiz } from "src/assets/test_data/dummyQuiz"
import { Suspense, useState } from "react"
// import { basicQuiz } from "src/assets/quizzes/BasicQuiz"
import { DisplayQuiz } from "src/components/DisplayQuiz"
import { Loading } from "src/components/Loading"
import { ProgressBar } from "src/components/ProgressBar"



export const BasicQuiz = () => {
    const quiz = dummyQuiz;
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
    const [currTotQuestions, setCurrTotQuestions] = useState<number>(Object.keys(quiz).length);
    const totalQuestions = 20;
    const initialMax = 7
    return(
    <div className="App-quiz">
        <div className="quiz-container-o">
            <ProgressBar
                value={questionsAnswered}
                max={totalQuestions}
            />
            <Suspense fallback={<Loading type="Basic Quiz"/>}>
                <DisplayQuiz 
                    quiz={dummyQuiz}
                    title="Basic Quiz"
                    initialMax={initialMax}
                    totalQuestions={totalQuestions}
                    questionsAnswerd={questionsAnswered}
                    currTotQuestions={currTotQuestions}
                    setQuestionsAnswerd={setQuestionsAnswered}
                    setCurrTotQuestions={setCurrTotQuestions}
                />
            </Suspense>
        </div>
    </div>)
}