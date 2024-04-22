import { useEffect, useRef, useState } from 'react';
import { Form, Button, ToggleButton } from 'react-bootstrap';
import { FaQuestionCircle } from 'react-icons/fa';

export function McMultiResponse({
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
    const [localAnswer, setLocalAnswer] = useState<string[]>([]);
    const questionRef = useRef<HTMLHeadingElement>(null);
    const [questionWidth, setQuestionWidth] = useState<number>(0);
    

    // compresses the current answer into a string format
    function compressAnswer(): string {
        return localAnswer.reduce((combined: string, selected: string) => combined ? combined + ", " + selected : combined + selected, "")
    }

    function addAnswer(currAnswer: string) {
        if (localAnswer.includes(currAnswer)) {
            setLocalAnswer(localAnswer.filter((target: string) => target !== currAnswer));
        } else {
            setLocalAnswer([...localAnswer, currAnswer]);
        }
    }

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
                    style={{ cursor: 'pointer',  color: "darkblue", marginLeft: '5px'}}
                />
            </div>
            {tooltip && (
                <div style={{
                    position: "absolute",
                    top: "0%",
                    right: `calc(20% - ${questionWidth / 2}px - 20px)`,
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
            <Form>
                <ul>
                    {options.map((choice) => (
                        <li key={choice}>
                            <ToggleButton
                                variant={localAnswer.includes(choice) ? "primary" : "outline-primary"}
                                key={`${choice}Select`}
                                type="checkbox"
                                id={choice}
                                value={choice}
                                onChange={() => addAnswer(choice)}
                                checked={localAnswer.includes(choice)}
                            >
                                {choice} 
                            </ToggleButton>
                        </li>
                    ))}
                </ul>
                <Button
                    variant={isFirst ? "outline-primary" : "primary"}
                    disabled={isFirst}
                    onClick={() => onNext(compressAnswer(), false)}>Back</Button>
                <Button onClick={() => onNext(compressAnswer(), true)}>Next</Button>
            </Form>
        </div>
    );
}
