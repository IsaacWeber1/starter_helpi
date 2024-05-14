import OpenAI from "openai"
import { FinalReport } from "./FinalReportTypes"

export type FinalChatResponsePackage = {
    isLoaded: boolean,
    response: OpenAI.ChatCompletion | null
}

export type FinalReportResponsePackage = {
    isImgsLoaded: boolean, // for images
    report: FinalReport
}
