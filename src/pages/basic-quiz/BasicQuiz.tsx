import { Suspense, useState } from "react"
import { Row, Container } from "react-bootstrap"
import { basicQuiz } from "src/assets/quizzes/BasicQuiz"
import { DisplayQuiz } from "src/components/DisplayQuiz"
import { Loading } from "src/components/Loading"
import { ProgressBar } from "src/components/ProgressBar"



export const BasicQuiz = () => {
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
    const [currTotQuestions, setCurrTotQuestions] = useState<number>(3);
    const totalQuestions = 20;
    const initialMax = 7
    return(
    <div className="App-quiz">
        <Container>
            <Row>
                <ProgressBar
                    value={questionsAnswered}
                    max={currTotQuestions}
                />
            </Row>
            <Row>
                <Suspense fallback={<Loading type="Basic Quiz"/>}>
                    <DisplayQuiz 
                        quiz={basicQuiz}
                        title="Basic Quiz"
                        initialMax={initialMax}
                        totalQuestions={totalQuestions}
                        questionsAnswerd={questionsAnswered}
                        currTotQuestions={currTotQuestions}
                        setQuestionsAnswerd={setQuestionsAnswered}
                        setCurrTotQuestions={setCurrTotQuestions}
                    />
                </Suspense>
            </Row>
        </Container>
    </div>)
}