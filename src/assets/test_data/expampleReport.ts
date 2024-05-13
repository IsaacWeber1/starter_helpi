import { FinalReport } from "Types/FinalReportTypes";


export const exampleReport: FinalReport = {
    reportName: "example report",
    imgsLoaded: true,
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
        picture: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Pfde3cvnhZe3odxlFFrnktPR/user-vcJYfy571G7qR6IwOe2OyQXK/img-2kj8NQ48mZ3Uu2z2I1Qq5WBC.png?st=2024-05-13T16%3A10%3A08Z&se=2024-05-13T18%3A10%3A08Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-05-13T10%3A42%3A23Z&ske=2024-05-14T10%3A42%3A23Z&sks=b&skv=2021-08-06&sig=HzchpfjpL7Wk%2BRxJxSHmJBeCngWesAQTBvZM5hFS2Tk%3D"
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
        picture: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Pfde3cvnhZe3odxlFFrnktPR/user-vcJYfy571G7qR6IwOe2OyQXK/img-QWJzDdATdeNUn05v6pUvDrjx.png?st=2024-05-13T16%3A10%3A07Z&se=2024-05-13T18%3A10%3A07Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-05-12T23%3A50%3A17Z&ske=2024-05-13T23%3A50%3A17Z&sks=b&skv=2021-08-06&sig=2wCKB2vDDPC6b/v8Gs3%2BKJeD98KQX3WalOe5VKvjaa4%3D"
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
        picture: "https://oaidalleapiprodscus.blob.core.windows.net/private/org-Pfde3cvnhZe3odxlFFrnktPR/user-vcJYfy571G7qR6IwOe2OyQXK/img-iyOA3r0xlQuSCk6rVnW8fBGX.png?st=2024-05-13T16%3A10%3A09Z&se=2024-05-13T18%3A10%3A09Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2024-05-13T12%3A58%3A04Z&ske=2024-05-14T12%3A58%3A04Z&sks=b&skv=2021-08-06&sig=M36AXXFesDMDu4RAD/tjWkDXuVUsF8vJFd8UjBrqhMo%3D"
    }
]}

export function setExampleReportToStorage() {
    localStorage.setItem("RESULTS", JSON.stringify([exampleReport]));
}
