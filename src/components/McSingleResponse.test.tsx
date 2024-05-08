import React from "react"
import { render, screen } from "@testing-library/react"
import { McSingleResponse } from "./McSingleResponse"
import { QuestionComponentProps } from "src/interfaces/QuestionTypes"
import userEvent from "@testing-library/user-event"

const placeHolder = (answer: string, forewards: boolean) => {
    return;
}

const questionComponentProps: QuestionComponentProps = {
    question: "Test",
    options: ["Test1", "Test2"],
    isFirst: false,
    onNext: placeHolder,
    description: "Test",
    prevAnswer: "Test"
  };

describe("McSingleResponse question type tests", () => {
    test("There are two different options", () => {
        render(<McSingleResponse {...questionComponentProps}/>);
        const option1 = screen.getByRole("radio", { name: /Test1/i });
        const option2 = screen.getByRole("radio", { name: /Test2/i });
        expect(option1).toBeInTheDocument();
        expect(option2).toBeInTheDocument();
    });
    test("Selecting a button deselects the other", () => {
        render(<McSingleResponse {...questionComponentProps}/>);
        const option1 = screen.getByRole("radio", { name: /Test1/i });
        const option2 = screen.getByRole("radio", { name: /Test2/i });
        userEvent.click(option1);
        userEvent.click(option2);
        expect(option1).not.toBeChecked();
    })
    test("The back button is enabled while not first", () => {
        render(<McSingleResponse {...questionComponentProps}/>);
        const back = screen.getByRole("button", { name: /Back/i });
        expect(back).toBeEnabled();
    });
})