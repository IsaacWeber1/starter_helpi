import { useEffect, useRef, useState } from "react";
import { Button } from "react-bootstrap";
import { Form } from 'react-bootstrap';
import { FaQuestionCircle } from "react-icons/fa";

/**
 * 
 * @param question - input of the question
 * @param options - options of the question (the min and max of the slider)
 * @param setanswer - function for setting the answer
 * @param onNext - function for getting the next question
 * @returns 
 */
export function SliderResponse({
    question,
    description,
    options,
    onNext,
    isFirst
}: {
    question: string;
    description: string;
    options: string[];
    onNext: (answer: string, forewards: boolean) => void;
    isFirst: boolean;
}): JSX.Element {
    const [tooltip, setTooltip] = useState<string>("");
    const [localAnswer, setLocalAnswer] = useState<string>("50");
    const questionRef = useRef<HTMLHeadingElement>(null);
    const [questionWidth, setQuestionWidth] = useState<number>(0);

    useEffect(() => {
        /**
        * Positioning for dynamic tooltip that appears when the user hovers over
        * an informational icon, providing additional context for the question.
        *
        * The tooltip's horizontal position adjusts dynamically to align with the
        * end of the question text. This alignment is recalculated on window resize
        * to maintain the correct position across different screen sizes.
         */
        const updateTooltipPosition = () => {
            if (questionRef.current) {
                setQuestionWidth(questionRef.current.offsetWidth);
            }
        };

        window.addEventListener('resize', updateTooltipPosition);
        updateTooltipPosition();

        return () => window.removeEventListener('resize', updateTooltipPosition);
    }, [question]);

    
    return (
        <div style={{ position: 'relative' }}>
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', position: 'relative' }}>
                <h4 ref={questionRef} style={{maxWidth: "60%"}}>{question}</h4>
                <FaQuestionCircle
                    onMouseEnter={() => setTooltip(description)}
                    onMouseLeave={() => setTooltip('')}
                    size={35}
                    style={{ cursor: 'pointer',  color: "red", marginLeft: '5px'}}
                />
            </div>
            {tooltip && (
                <div style={{
                    position: "absolute",
                    top: "0%",
                    right: `calc(15% - ${questionWidth / 2}px - 20px)`,
                    transform: 'translateX(-100%)',
                    width: "max-content",
                    maxWidth: "200px",
                    border: "1px solid #ccc",
                    padding: "10px",
                    backgroundColor: "white",
                    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
                    zIndex: "1000",
                    pointerEvents: "none"
                }}>
                    {tooltip}
                </div>
            )}
            <Form.Group>
                <Form.Label>{localAnswer}</Form.Label>
                <Form.Range
                    value={localAnswer}
                    onChange={(event: React.ChangeEvent<HTMLInputElement>) => setLocalAnswer(event.target.value)}
                    size={25}
                />
                <Button
                    variant={isFirst ? "outline-primary" : "primary"}
                    disabled={isFirst}
                    onClick={() => onNext(localAnswer, false)}>Back</Button>
                <Button onClick={() => onNext(localAnswer, true)}>Next</Button>
            </Form.Group>
        </div>
    )
}
