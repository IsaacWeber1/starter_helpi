import React, { useEffect, useState } from "react";
import { Button, Form} from "react-bootstrap";

import { Link } from "react-router-dom";
import { openaiToken } from "src/controller/openaiToken";

const verifyAPIKey = async(apiKey: string) => {
  try {
    var res = await openaiToken.chat.completions.create({
      messages: [
        { role: 'user', content: "please say 'validated'" },
        ],
      model: 'gpt-4-turbo'
    });
    // error for 401 access denied will be thrown
  } catch (error) {
    // invaild
    return false;
  }
  // valid key
  console.log(res.choices[0].message.content);
  return true;
}

export function ApiKeyInput(): JSX.Element {
  const [apiKey, setApiKey] = useState<string>("");
  const [isSubmit, setSubmit] = useState<boolean>(true)
  const [validKey, setValidKey] = useState<boolean>(false);

  useEffect(() => {
    async function getVaildation() {

      setValidKey(await verifyAPIKey(apiKey));
    }
    // this only checks for validation once the form has been submitted
    if (isSubmit) getVaildation();
    setSubmit(false);
}, [isSubmit, apiKey, validKey]);

  const changeKey = (event: React.ChangeEvent<HTMLInputElement>) => {
    setApiKey(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault(); // Prevent the default form submission behavior
    // Logic to handle the API key, such as saving to local storage or state management
    setSubmit(true);
    localStorage.removeItem("GBTKEY");
    localStorage.setItem("GBTKEY", apiKey);
    console.log("apiKey->", apiKey); // Example: output to console or replace with storage logic
    console.log("actualKey->", openaiToken.apiKey);
    openaiToken.apiKey = apiKey;
  };
  return <div>
          <Form 
            onSubmit={handleSubmit}
            >
            <Form.Group
              className="api-key-form"
            >
              <Form.Control
                className="api-submit-text"
                type="password"
                placeholder="Enter API key:"
                value={apiKey}
                onChange={changeKey}
              />
              <Button className="api-submit-key" variant="nav" type="submit">Submit</Button>
              <ValidKey valid={validKey}/>
            </Form.Group>
          </Form>
        </div>
}

export const Home = () => {
  return(
    <>
      <h2 className="App-misc-text">Select Your Quiz</h2>
        <div className="quiz-select">
          <div className="quiz-link-select-container">
            <Link className="select-quiz-link" to="/basic-quiz">
              <p className="select-quiz-link-text">Basic Quiz</p>
            </Link>
          </div>
          <article>Explore Your Path: Ideal for beginners or those uncertain about their career direction, this quiz provides a friendly introduction to the world of career possibilities. Through straightforward questions about your interests and basic educational background, it helps you discover diverse career fields and suggests potential areas you might enjoy exploring further. Perfect for high school students or anyone new to career planning.</article>
          <div className="quiz-link-select-container">
            <Link className="select-quiz-link" to="/advanced-quiz">
              <p className="select-quiz-link-text">Advanced Quiz</p>
            </Link>
          </div>
        <article>Refine Your Journey: Designed for those who have a clearer vision of their future, this quiz dives deep into specific career pathways and advanced opportunities. By analyzing your detailed educational achievements, experiences, and skills, it offers personalized advice on strategic steps to take your career to the next level. Ideal for college students, recent graduates, or professionals seeking targeted guidance.</article>
        </div>
    </>
  )
}

const ValidKey = ({valid} : {valid: boolean}) => {
  return <div className={valid ? "valid-key" : "invalid-key"}></div>
}
