import React from "react"
import { render, screen } from "@testing-library/react"
import { TextResponse } from "./TextResponse"
import { QuestionComponentProps } from "src/interfaces/QuestionTypes"
import userEvent from "@testing-library/user-event"

const placeHolder = (answer: string, forewards: boolean) => {
    return;
}

const questionComponentProps: QuestionComponentProps = {
    question: "Test",
    options: [],
    isFirst: true,
    onNext: placeHolder,
    description: "Test",
    prevAnswer: "Test"
  };

describe("UserResponse question type tests", () => {
    test("There is a displayed question", () => {
        render(<TextResponse {...questionComponentProps}/>);
        expect(screen.getByRole("textbox")).toBeInTheDocument();
    });
    test("The back button is disabled while first", () => {
        render(<TextResponse {...questionComponentProps}/>);
        const back = screen.getByRole("button", { name: /Back/i });
        expect(back).toBeDisabled();
    });
    test("The next button is enabled when text is entered", () => {
        render(<TextResponse {...questionComponentProps}/>);
        const next = screen.getByRole("button", {name: /Next/i });
        const answerBox = screen.getByRole("textbox")
        userEvent.type(answerBox, "test")
        expect(next).toBeEnabled();
    });
})