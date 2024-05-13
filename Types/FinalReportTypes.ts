
export type Career = {
    role: string, 
    description: string,
    picture: string | undefined,
    benefits: string[]
    challenges: string[]
    links: string[]
}

export type FinalReport = {
    imgsLoaded: boolean,
    careers: Career[]
};

export type QuizSummeries = {
    quizzes: FinalReport[]
}