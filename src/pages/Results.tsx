// import { exampleReport } from "src/assets/test_data/expampleReport"
import { Container } from 'react-bootstrap'
import Navbar from 'react-bootstrap/Navbar'
//import { RenderReportProps } from '@src/components/DisplayQuiz' 
//import { useState } from 'react'

export const Results = () => {
  //const [results, setResults] = useState<RenderReportProps[]>();
  //const [currResult, setCurrResult] = useState<RenderReportProps>(localStorage.getItem("RESULTS"));
  if (localStorage.getItem("RESULTS") === null)
  return(
    <>
        military
    </>
  )
  else { // results page
    return(
      <div className="results">
      <Container>

        <Navbar.Brand href="#home">Navbar with text</Navbar.Brand>
        <Navbar.Toggle />
        <Navbar.Collapse className="justify-content-end">
          <Navbar.Text>
            Signed in as: <a href="#login">Mark Otto</a>
          </Navbar.Text>
        </Navbar.Collapse>
      </Container>
      </div>
    )
  }
}
