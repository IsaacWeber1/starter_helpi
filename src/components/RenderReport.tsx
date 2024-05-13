import { HiChevronDown } from "react-icons/hi2";
import { Career, FinalReport } from "Types/FinalReportTypes";
import { CreateImage } from "src/controller/CreateImage";
import { useState } from "react";
import { Loading } from "./Loading";
import { ModifyStorageResponse } from "src/controller/StorageReportHnadler";

const MapGBTCareers = async (finalReport: FinalReport): Promise<FinalReport> => {
    console.log("before careers mapped", finalReport);
    const asyncReport =  Promise.all(finalReport.careers.map(
        async (c: Career) => (
            {
                ...c,
                picture: await CreateImage(c.role)
            }
        )));
    asyncReport.catch((error) => {
        return {
            reportId: finalReport.reportId,
            reportName: finalReport.reportName,
            imgsLoaded: true,
            careers: finalReport.careers
        };
    })
    const res = await asyncReport;
    return {
        reportId: finalReport.reportId,
        reportName: finalReport.reportName,
        imgsLoaded: true,
        careers: res
    };
}

const RenderDropdownReport = ({career} : {career : Career}) => {
    const [displayDown, setDisplayDown] = useState<boolean>(false);

    return(
        <div 
            className="App-career-container"
        >
            <h3>{career.role}</h3>
            <HiChevronDown 
                onClick={() => setDisplayDown(!displayDown)}
                size={20}
                style={{position: "relative"}}
            ><strong>{career.role}</strong></HiChevronDown>
            <div className={(displayDown ? "results-display-down" : "results-no-display-down")}>
                <ol>
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
            </div>
        </div>
    )
}

export const RenderReport = ({finalReport} : {finalReport : FinalReport}) => {

    const [report, setReport] = useState<FinalReport>(finalReport);
    const [imgsLoaded, setImgsLoaded] = useState<boolean>(finalReport.imgsLoaded);
    console.log("on-reload ->", report, "imgs-loaded ->", imgsLoaded);

    const getImgs = async () => {
        const res = await MapGBTCareers(report)
        console.log("imgs response", res)
        setReport(res);
        ModifyStorageResponse(res.reportId, res);
        setImgsLoaded(true);
    }

    if(!imgsLoaded) getImgs();


    
    return (
        <>
            {report.careers.map((career: Career) => (
                <RenderDropdownReport career={career}/>
            ))}
            <br></br>
        </>
    );
};