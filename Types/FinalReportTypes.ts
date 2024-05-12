import { Image } from "openai/resources"

export type Career = {
    role: string, 
    description: string,
    picture: Image | undefined | null,
    benefits: string[]
    challenges: string[]
    links: string[]
}

export type FinalReport = {careers: Career[]};

export type QuizSummeries = {
    quizzes: FinalReport[]
}