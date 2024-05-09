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
    return <GenericLoading/>
    // return <h1>Generating Final Career Report</h1>
}

const GenericLoading = () => {
    return(
    <>
        <div className="generic-loading-container-o">
            <div className="generic-loading-container stack"
            style={{scale: "50%", rotate: "180deg"}}>
                <div className="spin-section g-l-section-ol-1"></div>
                <div className="spin-section g-l-section-ol-2"></div>
            </div>
            <div className="generic-loading-container stack"
                style={{scale: "75%", rotate: "90deg"}}>
                <div className="spin-section g-l-section-ol-1"></div>
                <div className="spin-section g-l-section-ol-2"></div>
            </div>
            <div className="generic-loading-container stack"
                style={{scale: "100%", rotate: "0deg"}}>
                <div className="spin-section g-l-section-ol-1"></div>
                <div className="spin-section g-l-section-ol-2"></div>
            </div>
        </div>
        
    </>);
}