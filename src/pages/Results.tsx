// import { exampleReport } from "src/assets/test_data/expampleReport"
import { RenderReport } from 'src/components/RenderReport'
import { FinalReport } from 'Types/FinalReportTypes';
import { useState } from 'react'
import { setExampleReportToStorage } from 'src/assets/test_data/expampleReport';

export const Results = () => {
  const [currRoles, setCurrRoles] = useState<string[]>([]);
  
  setExampleReportToStorage();
  const storageResults = localStorage.getItem("RESULTS");
  const [reports, setReports] = useState<FinalReport[] | null>(storageResults ? JSON.parse(storageResults) : null);
  if (reports === null)
  return(
    <>
        military
    </>
  )
  else { // results page
    //
    return(
      <>
        <li>
          {reports?.map((report: FinalReport) => 
            <ul key={report.reportName}>
              <RenderReport finalReport={report} />
            </ul>
          )}
        </li>
        
        
      </>
      
    )
  }
}
