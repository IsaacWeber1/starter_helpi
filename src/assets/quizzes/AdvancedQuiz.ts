import { Question } from "../../interfaces/QuestionTypes";

export const advancedQuiz: Record<string, Question> = {
  question1: {
    "id": "question1",
    "type": "MC_SINGLE_RESPONSE",
    "prompt": "What is your highest level of education?",
    "description": "Select the highest degree you have achieved or are actively pursuing.",
    "options": [
      "High School or equivalent",
      "Some College",
      "Associate's Degree",
      "Bachelor's Degree",
      "Master's Degree",
      "Doctoral or Professional Degree",
      "Other (please specify)"
    ]
  },
  question2: {
    "id": "question2",
    "type": "TEXT_RESPONSE",
    "prompt": "Please describe your most recent job or professional experience, including your role and main responsibilities.",
    "description": "This will help us understand your current professional capabilities and experience.",
    "options": []
  },
  question3: {
    "id": "question3",
    "type": "MC_MULTI_RESPONSE",
    "prompt": "Which industries have you worked in or are particularly interested in?",
    "description": "Select all that apply to give a clearer view of your industry preferences.",
    "options": [
      "Technology",
      "Education",
      "Healthcare",
      "Finance",
      "Engineering",
      "Art and Design",
      "Marketing",
      "Other (please specify)"
    ]
  },
  question4: {
    "id": "question4",
    "type": "TEXT_RESPONSE",
    "prompt": "How do you feel about your current path? Within your field of interest, are there specific areas or topics that particularly excite you? Please describe.",
    "description": "This question aims to uncover more detailed aspects of your interests within your broader industry field.",
    "options": []
  },
  question5: {
    id: "question5",
    type: "TEXT_RESPONSE",
    prompt: "What kind of career advice do you hope to get from this quiz? (ie. general field, specific career, other advice for furthering career)",
    description: "If you are unsure about what you want, talk about your current interests",
    options: []
  }
};
