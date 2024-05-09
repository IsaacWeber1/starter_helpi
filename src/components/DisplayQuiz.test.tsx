import React from "react"
import { render, screen } from "@testing-library/react"
import { DisplayQuiz } from "./DisplayQuiz"
import { basicQuiz } from "src/assets/quizzes/BasicQuiz"

const placeHolder1 = (questionsAnswerd: number) => {
    return;
}
const placeHolder2 = (currTotQuestions: number) => {
    return;
}

describe("McSingleResponse question type tests", () => {
    test("The first question is of the TEXT_RESPONSE type", () => {
        render(<DisplayQuiz 
            quiz={basicQuiz}
            title="Basic Quiz"
            initialMax={7}
            totalQuestions={20}
            questionsAnswerd={0}
            currTotQuestions={3}
            setQuestionsAnswered={placeHolder1}
            setCurrTotQuestions={placeHolder2}
        />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

})