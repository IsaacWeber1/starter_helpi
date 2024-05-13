import { FinalReport } from "Types/FinalReportTypes"


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
        const newResponses = parsed.filter((f: FinalReport) => f.reportId !== reportId);
        localStorage.setItem("RESULTS", JSON.stringify([newResponse, ...newResponses]))
    }
}

export const DeleteStorageResponse = (reportId: number) => {
    const responses: string | null = localStorage.getItem("RESULTS");
    if(responses == null) return;
    else {
        const parsed: FinalReport[] = JSON.parse(responses);
        // filter out old response
        const newResponses = parsed.filter((f: FinalReport) => f.reportId !== reportId);
        localStorage.setItem("RESULTS", JSON.stringify([...newResponses]))
    }
}