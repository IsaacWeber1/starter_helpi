import React from "react"
import { render, screen } from "@testing-library/react"
import { McMultiResponse } from "./McMultiResponse"
import { QuestionComponentProps } from "src/interfaces/QuestionTypes"
import userEvent from "@testing-library/user-event"

const placeHolder = (answer: string, forewards: boolean) => {
    return;
}

const questionComponentProps: QuestionComponentProps = {
    question: "Test",
    options: ["Test1", "Test2"],
    isFirst: true,
    onNext: placeHolder,
    description: "Test",
    prevAnswer: "Test"
  };

describe("McSingleResponse question type tests", () => {
    test("There are two different options", () => {
        render(<McMultiResponse {...questionComponentProps}/>);
        const option1 = screen.getByRole("checkbox", { name: /Test1/i });
        const option2 = screen.getByRole("checkbox", { name: /Test2/i });
        expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
    });
    test("Selecting another button means both are selected", () => {
        render(<McMultiResponse {...questionComponentProps}/>);
        const option1 = screen.getByRole("checkbox", { name: /Test1/i });
        const option2 = screen.getByRole("checkbox", { name: /Test2/i });
        userEvent.click(option1);
        userEvent.click(option2);
        expect(option1).toBeChecked();
        expect(option2).toBeChecked();
    })
})