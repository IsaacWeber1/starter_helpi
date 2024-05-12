import { HiChevronDown } from "react-icons/hi2";
import { RenderReportProps } from "./DisplayQuiz";
import { Career } from "Types/FinalReportTypes";


export const RenderReport: React.FC<RenderReportProps> = ({ finalReport, currRoles, updateRoles }) => {
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