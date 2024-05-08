import { Suspense, useState } from "react"
import { Row, Container } from "react-bootstrap"
import { advancedQuiz } from "src/assets/quizzes/AdvancedQuiz"
import { DisplayQuiz } from "src/components/DisplayQuiz"
import { Loading } from "src/components/Loading"
import { ProgressBar } from "src/components/ProgressBar"




export const AdvancedQuiz = () => {
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
    const [currTotQuestions, setCurrTotQuestions] = useState<number>(3);
    const totalQuestions = 20;
    const initialMax = 7
    return(
        <div className="App-quiz">
        <Container>
            <br></br>
            <Row>
                <ProgressBar
                    value={questionsAnswered}
                    max={currTotQuestions}
                />
            </Row>
            <Row>
                <Suspense fallback={<Loading type="Advanced Quiz"/>}>
                    <DisplayQuiz
                        quiz={advancedQuiz}
                        title="Advanced Quiz"
                        initialMax={initialMax}
                        totalQuestions={totalQuestions}
                        questionsAnswerd={questionsAnswered}
                        currTotQuestions={currTotQuestions}
                        setQuestionsAnswered={setQuestionsAnswered}
                        setCurrTotQuestions={setCurrTotQuestions}
                    />
                </Suspense>
            </Row>
        </Container>
    </div>)
}