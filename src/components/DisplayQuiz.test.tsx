import React from "react"
import { render, screen } from "@testing-library/react"
import { DisplayQuiz } from "./DisplayQuiz"
import { basicQuiz } from "src/assets/quizzes/BasicQuiz"
import { ParentProps } from "./DisplayQuiz"

const placeHolder1 = (questionsAnswerd: number) => {
    return;
}
const placeHolder2 = (currTotQuestions: number) => {
    return;
}

const testProps: ParentProps = {
    quiz:basicQuiz,
    title:"Basic Quiz",
    totalQuestions:Object.keys(basicQuiz).length + 14,
    questionsAnswered:0,
    currTotQuestions:Object.keys(basicQuiz).length,
    setQuestionsAnswered:placeHolder1,
    setCurrTotQuestions:placeHolder2
}

describe("McSingleResponse question type tests", () => {
    test("The first question is of the TEXT_RESPONSE type", () => {
        render(<DisplayQuiz 
            parentProps={testProps}
        />);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });

})