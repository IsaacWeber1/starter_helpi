import { FinalReport } from "Types/FinalReportTypes"

/**
 * 
 * @param a - final report a
 * @param b - final report b
 * @returns - if the report id and name are equal
 */
const isEqual = (a: FinalReport, b: FinalReport) => {
    return a.reportId === b.reportId && a.reportName === b.reportName;
}

export const isInStroageResponse = (report: FinalReport) => {
    const responses: string | null = localStorage.getItem("RESULTS");

    // no results in storage
    if(responses === null) return false;
    const parsed: FinalReport[] = JSON.parse(responses);
    if(parsed === null) return false;

    // checking through all the responses to see if two are equal
    const equal: boolean = parsed.reduce((accum: boolean, r: FinalReport) =>  accum || isEqual(r, report), false)
    return equal;
}

export const AddToStorageResponses = (response: FinalReport) => {
    const responses: string | null = localStorage.getItem("RESULTS");
    if(responses == null) localStorage.setItem("RESULTS", JSON.stringify([response]));
    else {
        const parsed: FinalReport[] = JSON.parse(responses);
        localStorage.setItem("RESULTS", JSON.stringify([...parsed, response]))
    }
}

export const ModifyStorageResponse = (reportId: number, newResponse: FinalReport) => {
    const responses: string | null = localStorage.getItem("RESULTS");
    if(responses == null) return;
    else {
        const parsed: FinalReport[] = JSON.parse(responses);
        // filter out old response
        const newResponses = parsed.filter((f: FinalReport) => !isEqual(f, newResponse));
        localStorage.setItem("RESULTS", JSON.stringify([newResponse, ...newResponses]))
    }
}

export const DeleteStorageResponse = (newReport: FinalReport) => {
    const responses: string | null = localStorage.getItem("RESULTS");
    if(responses == null) return;
    else {
        const parsed: FinalReport[] = JSON.parse(responses);
        // filter out old response
        const newResponses = parsed.filter((f: FinalReport) => !isEqual(f, newReport));
        localStorage.setItem("RESULTS", JSON.stringify([...newResponses]))
    }
}