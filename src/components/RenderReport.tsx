import { HiChevronDown } from "react-icons/hi2";
import { Career, FinalReport } from "Types/FinalReportTypes";
import { CreateImage } from "src/controller/CreateImage";
import { useState } from "react";
import { Loading } from "./Loading";
import { ModifyStorageResponse } from "src/controller/StorageReportHnadler";
import { FinalReportResponsePackage } from "Types/ResponsePackage";

const MapGBTCareers = async (finalReport: FinalReport): Promise<FinalReport> => {
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
            ><strong>{career.role}</strong></HiChevronDown>
            <div className={(displayDown ? "results-display-down" : "results-no-display-down")}>
            <div className="report-list-item"><strong>Role:</strong> {career.description}</div>
            <br></br>
            <div className="img-container">
                {career.picture === undefined ? <Loading type=""/> : <img src={career.picture} className="career-img" alt={career.role}></img>}
            </div>
                <div className="career-container">
                    <ul className="report-list">
                        <li className="report-list-item">
                            <h5>Benefits:</h5>
                            {career.benefits.map((benefit, index) => (
                                <p key={index}>{benefit}</p>
                            ))}
                        </li>
                        <br></br>
                        <li className="report-list-item">
                            <h5>Challenges:</h5>
                            <li>
                                {career.challenges.map((challenge, index) => (
                                    <p key={index}>{challenge}</p>
                                ))}
                            </li>
                        </li>
                        <br></br>
                        <li className="report-list-item">
                            <h5>Links:</h5>
                            <li className="report-list-item">
                                {career.links.map((link, index) => (
                                    <>
                                        <a className="report-link" href={link} key={index}>{link}</a>
                                        <br></br>
                                    </>
                                ))}
                            </li>
                        </li>
                    </ul>
                </div>
            </div>
            
        </div>
    )
}

export const RenderReport = ({finalReport} : {finalReport : FinalReport}) => {

    const [response, setResponse] = useState<FinalReportResponsePackage>({isImgsLoaded: finalReport.imgsLoaded, report: finalReport});
    console.log("on-reload ->", response, "imgs-loaded ->", response.isImgsLoaded);
    if(response.report === null) return <>Null Report</>

    const getImgs = async () => {
        if (response === null) return;
        const load = MapGBTCareers(response.report)
        load.then((res) => {
            console.log("imgs-res", res);
            setResponse({
                isImgsLoaded: true,
                report: res
            });
            ModifyStorageResponse(res.reportId, res);
        })
    }

    if(!response.isImgsLoaded) getImgs();


    
    return (
        <>
            <div className="App-career-container-o">
                {response.report.careers.map((career: Career) => (
                    <RenderDropdownReport key={career.role} career={career}/>
                ))}
            </div>
            <br></br>
        </>
    );
};