export type Career = {
    role: string, 
    description: string,
    benefits: string[]
    challenges: string[]
    links: string[]
}

export type FinalReport = {careers: Career[]};

export type QuizSummeries = {
    quizzes: FinalReport[]
}