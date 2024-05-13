import { HiChevronDown } from "react-icons/hi2";
import { RenderReportProps } from "./DisplayQuiz";
import { Career, FinalReport } from "Types/FinalReportTypes";
import { CreateImage } from "src/controller/CreateImage";
import { useEffect, useState } from "react";
import { Loading } from "./Loading";

const MapGBTCareers = async (finalReport: FinalReport): Promise<FinalReport> => {
    const asyncReport = await Promise.all(finalReport.careers.map(
        async (c: Career) => (
            {
                ...c,
                picture: await CreateImage(c.role)
            }
        )));
    const report = asyncReport.map((c: Career) => ({...c}))
    console.log(report);
    return {
        reportName: finalReport.reportName,
        imgsLoaded: true,
        careers: report
    };
}

export const RenderReport: React.FC<RenderReportProps> = ({ finalReport, currRoles, setCurrRoles }) => {
    console.log(finalReport);
    function updateRoles (newRole: string): void {
        setCurrRoles(prevRoles => 
            prevRoles.includes(newRole)
            ? prevRoles.filter(role => role !== newRole)
            : [...prevRoles, newRole]
        );

    }

    const [report, setReport] = useState<FinalReport>(finalReport);
    const [imgsLoaded, setImgsLoaded] = useState<boolean>(finalReport.imgsLoaded);
    MapGBTCareers(finalReport);

    useEffect(() => {
        const LoadImgs = async() => {
            setImgsLoaded(true);
            setReport(await MapGBTCareers(report));
            // logic for setting to local-storage
            let quizzes = localStorage.getItem("RESULTS");
            const newResults = (quizzes === null) ? [report] : [report, ...JSON.parse(quizzes)];
            localStorage.setItem("RESULTS", JSON.stringify(newResults));
        }
        if(!imgsLoaded) LoadImgs();
    },
    [report, imgsLoaded])
    return (
        <>
            <h2>Final Results:</h2>
            <br></br>
            {finalReport.careers.map((career: Career) => (
                <div 
                    className="App-career-container"
                    key={career.role}
                >
                    <h3>{career.role}</h3>
                    <HiChevronDown 
                        onClick={() => updateRoles(career.role)}
                        size={20}
                        style={{position: "relative"}}
                    ><strong>{career.role}</strong></HiChevronDown>
                    <div style={{textAlign: 'left'}}>
                    {currRoles.includes(career.role) && (
                        <ol style={{listStyleType: 'none'}}>
                            <li><strong>Role:</strong> {career.description}</li>
                            <br></br>
                            {career.picture === undefined ? <Loading type=""/> : <img src={career.picture} alt={career.role}></img>}
                            <li>
                                <h5>Benefits:</h5>
                                <ul style={{listStyleType: 'disk'}}>
                                    {career.benefits.map((benefit, index) => (
                                        <p key={index} style={{listStyleType: 'disk'}}>{benefit}</p>
                                    ))}
                                </ul>
                            </li>
                            <br></br>
                            <li>
                                <h5>Challenges:</h5>
                                <ul style={{listStyleType: 'disk'}}>
                                    {career.challenges.map((challenge, index) => (
                                        <p key={index}>{challenge}</p>
                                    ))}
                                </ul>
                            </li>
                            <br></br>
                            <li>
                                <h5>Links:</h5>
                                <ul style={{listStyleType: 'disk'}}>
                                    {career.links.map((link, index) => (
                                        <>
                                            <a href={link} key={index}>{link}</a>
                                            <br></br>
                                        </>
                                    ))}
                                </ul>
                            </li>
                        </ol>
                    )}
                    </div>
                </div>
            ))}
        </>
    );
};