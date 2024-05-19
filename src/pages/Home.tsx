import React, { useState } from "react";
import { Button, Form} from "react-bootstrap";

import { openaiToken } from "src/controller/openaiToken";
import { SelectQuiz } from "./SelectQuiz";

const verifyAPIKey = async(apiKey: string) => {
  try {
    var res = await openaiToken.chat.completions.create({
      messages: [
        { role: 'user', content: "please say 'validated'" },
        ],
      model: 'gpt-4o'
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

  async function getVaildation() {
    setSubmit(false);
    setValidKey(await verifyAPIKey(apiKey));
  }
  // this only checks for validation once the form has been submitted
  if (isSubmit) getVaildation();

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
      <h1><strong>Welcome to Career Explorer!</strong></h1>
      <br></br>
      <br></br>
      <h3 className="App-misc-text">Select Your Guide:</h3>
      <SelectQuiz/>
    </>
  )
}

const ValidKey = ({valid} : {valid: boolean}) => {
  return <div className={valid ? "valid-key" : "invalid-key"}></div>
}
