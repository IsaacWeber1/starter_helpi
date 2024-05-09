import { Question } from "../../interfaces/QuestionTypes";

export const dummyQuiz: Record<string, Question> = {
  question1: {
    id: "question1",
    type: "TEXT_RESPONSE",
    prompt: "prompt",
    description: "description",
    options: []
  },
  question2: {
    id: "question2",
    type: "MC_MULTI_RESPONSE",
    prompt: "prompt",
    description: "description",
    options: [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "Other (please specify)"]
  },
  question3: {
    id: "question3",
    type: "SLIDER_RESPONSE",
    prompt: "prompt",
    description: "description",
    options: []
},
question4: {
    id: "question4",
    type: "MC_SINGLE_RESPONSE",
    prompt: "prompt",
    description: "description",
    options: ["a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "Other (please specify)"]
},
question5: {
    id: "question5",
    type: "USER_RANKING",
    prompt: "prompt",
    description: "description",
    options: ["a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g"]
},

}