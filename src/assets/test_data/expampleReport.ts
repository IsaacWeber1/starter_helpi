import { FinalReport } from "Types/FinalReportTypes";


export const exampleReport: FinalReport = {
    reportName: "example report",
    imgsLoaded: false,
    careers: [
    {
        "role": "Data Scientist",
        "description": "Responsible for analyzing large sets of structured and unstructured data to derive actionable insights and solutions in strategic areas of business.",
        "benefits": [
            "High demand in tech and finance sectors",
            "Opportunities for remote work",
            "Excellent salary and growth prospects"
        ],
        "challenges": [
            "Requires continuous skill upgrades",
            "Handling very large datasets can be complex",
            "Need to translate technical findings to non-technical stakeholders"
        ],
        "links": [
            "https://www.bls.gov/ooh/math/data-scientists.htm",
            "https://datascience.udacity.com/"
        ],
        picture: undefined
    },
    {
        "role": "Software Engineer",
        "description": "Designs, develops, and implements software solutions based on user requirements and industry trends.",
        "benefits": [
            "Flexible working hours",
            "High job satisfaction",
            "Good team collaboration environment"
        ],
        "challenges": [
            "Can involve long hours of debugging",
            "Sometimes requires working with legacy code",
            "Rapidly changing technology landscape"
        ],
        "links": [
            "https://stackoverflow.com/",
            "https://github.com/"
        ],
        picture: undefined
    },
    {
        "role": "UX Designer",
        "description": "Focuses on creating engaging interfaces with logical and thought-out behaviors and actions.",
        "benefits": [
            "High impact on user satisfaction",
            "Creativity-driven job role",
            "Opportunities for contract and freelance work"
        ],
        "challenges": [
            "Must keep up with changing design trends",
            "Balancing user needs with business goals",
            "Sometimes restricted by technology limits"
        ],
        "links": [
            "https://www.behance.net/",
            "https://www.adobe.com/products/xd.html"
        ],
        picture: undefined
    }
]}

if(localStorage.getItem("RESULTS") === null) {
    localStorage.setItem("RESULTS", JSON.stringify([exampleReport]));
}