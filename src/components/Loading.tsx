/**
 * 
 * @param type - the type of loading animation wanted
 * @returns a loading animation
 */
export const Loading = (
    {
        type
    }:{
        type: string | undefined
    }) => {

    switch(type) {
        case "nextQuestion":
            return <NextQuestionLoading/>
        case "generatingQuestion":
            return <GeneratingQuestionLoading/>
        case "finalReport":
            return <FinalReportLoading/>
        default:
            return <GeneralLoading/>
    }
}

const NextQuestionLoading = () => {
    return <h1>Determining Next Question</h1>
}

const GeneratingQuestionLoading = () => {
    return <h1>Generating Next Question Set</h1>
}

const FinalReportLoading = () => {
    return <h1>Generating Final Career Report</h1>
}

const GeneralLoading = () => {
    // the loading text here is temperary
    return <div className="general-loading-animation">Loading</div>
}