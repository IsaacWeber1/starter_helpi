import { useState } from "react";
import { Form } from "react-bootstrap";

export function Secret(): JSX.Element {
    const [isArmyRecruiter, setRecruiter] = useState<boolean>(false);

    function updateRecruiter(event: React.ChangeEvent<HTMLInputElement>) {
        setRecruiter(event.target.checked)
    }

    return(
        <>
            {!isArmyRecruiter ? "🙂" : "🫡"}
            <Form.Check
                type="checkbox"
                id="is-recruiter-check"
                checked={isArmyRecruiter}
                onChange={updateRecruiter}
            />
        </>
    )
}