export const Loading = (
    {
        type
    }:{
        type: string
    }) => {
        if (type === "nextQuestion") return <NextQuestionLoading/>;
        if (type === "generatingQuestions") return <GeneratingNextQuestionLoading/>
        if (type === "finalReport") return <FinalReportLoading/>
        else return <GenericLoading/>
}

const NextQuestionLoading= () => {
    return <GenericLoading/>
    // return <h1>Determining Next Question</h1>
}

const GeneratingNextQuestionLoading = () => {
    return <GenericLoading/>
    // return <h1>Generating Next Question Set</h1>
}

const FinalReportLoading = () => {
    return <h1>Generating Final Career Report</h1>
}

const GenericLoading = () => {
    return(
    <>
        <div className="geneeric-loading">
            <div className="spin-section-1"></div>
            <div className="spin-section-2"></div>
            <div className="spin-section-3"></div>
        </div>
    </>);
}