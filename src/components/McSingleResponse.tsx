import { useEffect, useRef, useState } from 'react';
import { Form, Button, ToggleButton, FormControl } from 'react-bootstrap';
import { BsFillInfoCircleFill } from 'react-icons/bs'; // This line imports a question circle icon from Font Awesome


export function McSingleResponse({
    question,
    description,
    options,
    onNext,
    isFirst,
    prevAnswer
}: {
    question: string;
    description: string;
    options: string[];
    onNext: (answer: string, forewards: boolean) => void;
    isFirst: boolean;
    prevAnswer: string;
}): JSX.Element {
    const otherOption = "other"; // Define the text for the "Other" option
    const [tooltip, setTooltip] = useState<string>("");
    const initialOtherValue = prevAnswer && prevAnswer.startsWith(otherOption + ": ") ? prevAnswer : "";
    const [localAnswer, setLocalAnswer] = useState<string>(
        prevAnswer.startsWith(otherOption + ": ") ? otherOption : (prevAnswer ? prevAnswer : "")
    );
    const [customAnswer, setCustomAnswer] = useState<string>(initialOtherValue);

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

    const handleOptionChange = (option: string) => {
        console.log(option);
        if (option === otherOption) {
            setLocalAnswer(option);
            // Optionally reset customAnswer if needed when "Other" is selected
        } else {
            setLocalAnswer(option);
            if (localAnswer === otherOption) {
                setCustomAnswer("");  // Clear custom answer if moving away from "Other"
            }
        }
    };

    
    return (
        <div>
            <div className='question-header'>
                <h4 ref={questionRef} style={{maxWidth: "60%"}}>{question}</h4>
                <BsFillInfoCircleFill className="quiz-tooltip"
                    onMouseEnter={() => setTooltip(description)}
                    onMouseLeave={() => setTooltip('')}
                    size={35}
                />
            </div>
            {tooltip && (
                <div style={{
                    position: "absolute",
                    top: "0%",
                    right: `calc(10% - ${questionWidth / 2}px - 20px)`,
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
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                    {options.map((option, idx) => (
                        <li key={idx}>
                            <ToggleButton
                                className="App-quiz"
                                id={`option-${idx}`}
                                type="radio"
                                variant={localAnswer === option ? "selected" : "single-selected"}
                                name="options"
                                checked={localAnswer === option}
                                value={option}
                                onChange={() => handleOptionChange(option)}
                            >
                                {option}
                            </ToggleButton>
                        </li>
                    ))}
                    {localAnswer.toLowerCase().includes(otherOption) && (
                        <li>
                            <FormControl
                            style={{ marginTop: '10px' }}
                            placeholder="Type your custom answer here"
                            value={customAnswer}
                            onChange={(e) => setCustomAnswer(e.target.value)}
                            />
                        </li>
                    )}
                </ul>
                <Button
                    variant={isFirst ? "nav-disabled" : "nav"}
                    disabled={isFirst}
                    onClick={() => onNext(localAnswer.toLocaleLowerCase().includes(otherOption) ? customAnswer : localAnswer, false)}>Back</Button>
                <Button
                    variant={localAnswer === "" ? "nav-disabled" : "nav"}
                    disabled={localAnswer === ""}
                    onClick={() => onNext(localAnswer.toLocaleLowerCase().includes(otherOption) ? customAnswer : localAnswer, true)}> Next</Button>
            </Form>
        </div>
    );
}
