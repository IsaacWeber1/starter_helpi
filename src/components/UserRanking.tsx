import { useState } from "react";
import { Button } from 'react-bootstrap';

export function UserRanking({
    question,
    options,
    onNext,
    isFirst
}: {
    question: string;
    options: string[];
    onNext: (answer: string) => void;
    isFirst: boolean;
}): JSX.Element {
    const [categories, setCategories] = useState<string[]>(options);
    
    /**
    const updatePriorities = (priority: string) => (event: React.ChangeEvent<HTMLInputElement>) => {
        event.target.checked
            ? setCategories([...categories, priority])
            : setCategories(
                [...categories].filter((chosenMember: string): boolean => chosenMember !== priority)
            )
    }
     */

    function compressAnswer(): string {
        return categories.reduce((combined: string, selected: string) => combined ? combined + ", " + selected : selected, "");
    }
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
            <ol style={{textAlign: "left"}}>
                {categories.map((category) => (
                    <li key={category}>
                        <Button
                            key={`${category}⬆️`}
                            variant="outline-success"
                            size="sm"
                            onClick={() => pushUp(category)}
                        >⬆</Button>
                        {' '}
                        <Button
                            key={`${category}⬇️`}
                            variant="outline-danger"
                            size="sm"
                            onClick={() => pushDown(category)}
                        >⬇</Button>
                        {' '}
                        {category}
                    </li>
                ))}
            </ol>
            <Button
                    variant={isFirst ? "outline-primary" : "primary"}
                    disabled={isFirst}
                    onClick={() => onNext(compressAnswer())}>Back</Button>
            <Button onClick={() => onNext(compressAnswer())}>Next</Button>  
        </div>
    )
}