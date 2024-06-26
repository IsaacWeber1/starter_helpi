
export type Career = {
    role: string, 
    description: string,
    picture: string | undefined,
    salary: string,
    benefits: string[]
    challenges: string[]
    links: string[]
}

export type FinalReport = {
    reportId: number,
    reportName: string,
    imgsLoaded: boolean,
    careers: Career[]
};

export type QuizSummeries = {
    quizzes: FinalReport[]
}