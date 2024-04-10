import { useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from 'react-bootstrap';

export function TEXT_RESPONSE({
    question,
    options,
    setAnswer,
    onNext
}: {
    question: string;
    options: string[];
    setAnswer: (answer: string) => void;
    onNext: (next: boolean) => void;
}): JSX.Element {
    const [localAnswer, setLocalAnswer] = useState<string>("");
    function updateAnswer(currAnswer: string) {
        setLocalAnswer(currAnswer)
        setAnswer(currAnswer)
    }
    
    return(
        <div>
            <h3>{question}</h3>
            <Form.Group>
                <Form.Label>{question}</Form.Label>
                <Form.Control
                    value={localAnswer}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => updateAnswer(event.target.value)}
                />
                <Button onClick={() => onNext(true)}>Next</Button>
            </Form.Group>
        </div>
    )
}

