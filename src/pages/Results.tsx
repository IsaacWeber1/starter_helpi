// import { exampleReport } from "src/assets/test_data/expampleReport"
import { RenderReport } from 'src/components/RenderReport'
import { FinalReport } from 'Types/FinalReportTypes';
import { useState } from 'react'

export const Results = () => {
  //const [results, setResults] = useState<RenderReportProps[]>();
  const [currRoles, setCurrRoles] = useState<string[]>([]);
  const storageResults = localStorage.getItem("RESULTS");
  const [reports, setReports] = useState<FinalReport[] | null>(JSON.parse(storageResults ? storageResults : ""));
  if (report === null)
  return(
    <>
        military
    </>
  )
  else { // results page
    //
    return(
      <>
        {reports?.map((finalReport: FinalReport) => {
          <
        })}
        <RenderReport finalReport={report}  currRoles={currRoles} setCurrRoles={setCurrRoles}/>
      </>
      
    )
  }
}
