import { Suspense, useState } from "react"
import { Row, Container } from "react-bootstrap"
import { advancedQuiz } from "src/assets/quizzes/AdvancedQuiz"
import { DisplayQuiz } from "src/components/DisplayQuiz"
import { Loading } from "src/components/Loading"
import { ProgressBar } from "src/components/ProgressBar"
import { QuizProps } from "src/components/DisplayQuiz"





export const AdvancedQuiz = () => {
    const [questionsAnswered, setQuestionsAnswered] = useState<number>(0);
    const [currTotQuestions, setCurrTotQuestions] = useState<number>(4);
    const quiz: QuizProps = advancedQuiz;
    const totalMax = 20;
    const experienceMax = 10;
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
                        parentQuiz={quiz}
                        title="Advanced Quiz"
                        experienceMax={experienceMax}
                        totalMax={totalMax}
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