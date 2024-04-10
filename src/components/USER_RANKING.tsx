import React, { useState } from "react";
import { Button } from 'react-bootstrap';

export function USER_RANKING({
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
    const [categories, setCategories] = useState<string[]>(options);

    const submitting = () => {
        setAnswer(categories.reduce((combined: string, selected: string) => combined + selected, ""))
        onNext(true)
    }
    /**
    const updatePriorities = (priority: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked
            ? setCategories([...categories, priority])
            : setCategories(
                [...categories].filter((chosenMember: string): boolean => chosenMember !== priority)
            )
    }
     */
    const pushUp = (priority: string) => {
        const currIndex = categories.findIndex((chosenMember: string): boolean => chosenMember === priority);
        if (currIndex > 0) {
            // Swap with the previous item
            const newPriorities = [...categories];
            [newPriorities[currIndex - 1], newPriorities[currIndex]] = [newPriorities[currIndex], newPriorities[currIndex - 1]];
            setCategories(newPriorities);
        }
    }
    const pushDown = (priority: string) => {
        const currCount = categories.reduce((count: number, chosenMember: string) => count += 1, 0);
        const currIndex = categories.findIndex((chosenMember: string): boolean => chosenMember === priority);
        if (currIndex < (currCount - 1)) {
            // Swap with the previous item
            const newPriorities = [...categories];
            [newPriorities[currIndex + 1], newPriorities[currIndex]] = [newPriorities[currIndex], newPriorities[currIndex + 1]];
            setCategories(newPriorities);
        }
    }
    return (
        <div>
            <h3>{question}</h3>
            <ol>
                {categories.map((category) => (
                    <li key={category}>
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => pushUp(category)}
                        >⬆️</Button>
                        {' '}
                        <Button
                            variant="outline-secondary"
                            size="sm"
                            onClick={() => pushDown(category)}
                        >⬇️</Button>
                        {' '}
                        {category}
                    </li>
                ))}
            </ol>
            <Button onClick={submitting}></Button>  
        </div>
    )
}