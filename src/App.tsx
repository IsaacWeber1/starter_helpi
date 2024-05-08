import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { Home } from './pages/Home';
import { SelectQuiz } from "./pages/SelectQuiz";
import { Results } from "./pages/Results";
// Import any other components or pages you have
import { ApiKeyInput } from "./pages/Home";
import './css/App.css';
import { BasicQuiz } from "./pages/basic-quiz/BasicQuiz";
import { AdvancedQuiz } from "./pages/advanced-quiz/AdvancedQuiz";
import { ChatGBTPage } from "./pages/chat-gbt-page/ChatGBTPage";
import gitLogo from "src/imgs/github-mark-white.svg";
export default function App(): JSX.Element {


  return ( 
  <div className="main-container">
    <Router>
      <div className="App"
      style={{
        padding: 'vh',
        margin: 'vh'

    }}
      >
        <header className="App-header">
          <nav>
            <Link to="starter_helpi/">Home</Link>
          </nav>
          <nav>
            <Link to="/select-quiz">Select Quiz</Link>
          </nav>
          <nav> 
            <Link to="/results">Results</Link></nav>
        </header>
        <Routes>
          <Route path="starter_helpi/*" element={<Home />} />
          <Route path="/select-quiz" element={<SelectQuiz />}/>
          <Route path="/chat-gbt-page" element={<ChatGBTPage />}/>
          <Route path="/results" element={<Results />}/>
          <Route 
          path="/basic-quiz"
          element={<BasicQuiz/>}
        />
        <Route 
          path="/advanced-quiz"
          element={<AdvancedQuiz/>}
        />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </div>
      <footer>
          <ApiKeyInput></ApiKeyInput>
          <div className="github-name-links">
            <div className="github-logo-container">
              <img className="github-logo" src={gitLogo} alt="Git-logo"></img>
            </div>
            <a className="github-links" href="https://github.com/barrypreal">Barry</a>
            <a className="github-links" href="https://github.com/DylanMinchhoff">Dylan</a>
            <a className="github-links" href="https://github.com/IsaacWeber1">Isaac</a>
          </div>
      </footer>
    </Router>
   </div>
  );
}
