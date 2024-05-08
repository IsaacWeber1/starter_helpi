// Import necessary hooks and components
import { useEffect, useState } from "react";
import { Question, QuestionComponentProps } from "../interfaces/QuestionTypes";
import { McSingleResponse } from "./McSingleResponse";
import { McMultiResponse } from "./McMultiResponse";
import { TextResponse } from "./TextResponse"
import { UserRanking } from "./UserRanking"
import { SliderResponse } from "./SliderResponse";
import { addResponseGBT, callGBT } from "src/controller/CallChat";
import OpenAI from "openai";
import { CreateBasicStartingPrompt, CreateStartingPrompt, createFinalResponse } from "src/controller/StartingPrompt";
import { QuestionAnswer } from "src/interfaces/PromptQuestionsSetup";
import { Loading } from "./Loading";
import { Container } from "react-bootstrap";

type DisplayQuizProps = Record<string, Question>;

type QuestionAns = {
    questionId: string,
    answer: string
}

type AnswerResponse = {
    summary: string,
    advice: string,
    interactiveElements: string,
    recommendations: string,
    reasoning: string
}

export function DisplayQuiz(
    { 
        quiz,
        title,
        questionsAnswerd,
        initialMax,
        totalQuestions,
        currTotQuestions,
        setQuestionsAnswered,
        setCurrTotQuestions
    } 
    : 
    {
        title: string,
        quiz : DisplayQuizProps,
        questionsAnswerd : number,
        initialMax: number,
        totalQuestions: number,
        currTotQuestions: number,
        setQuestionsAnswered : (questionsAnswerd: number) => void 
        setCurrTotQuestions: (currTotQuestions: number) => void
    }
    ): JSX.Element {
    const [curQuiz, setCurQuiz] = useState<DisplayQuizProps>(quiz);
    const [currentQuestionId, setCurrentQuestionId] = useState<string>("question1"); // Starting question ID
    const [isQuizComplete, setIsQuizComplete] = useState<boolean>(false); // Used to determine when curQuiz is complete
    const [answers, setAnswers] = useState<QuestionAns[]>([]); // Array of all question answers
    const [lastQuestionArray, setQuestionArray] = useState<number>(0) // Keeps track of lastmost question answered to determine when to append answers
    const [gbtConversation, setGBTConversation] = useState<OpenAI.ChatCompletion.Choice[]>();
    const [isLoading, setIsLoading] = useState(false);
    const [type, setType ] = useState("");
    const [followUp, setFollowUp] = useState<boolean>(false);
    // const [nextPrompt, setNextPrompt] = useState<string>("");

    async function connectToGBT(startingPrompt: string, prompt: string)  {
        const response = await callGBT({startingPrompt: startingPrompt, userPrompt: prompt});
        // will parse the response so the messages are added
        return response;
    }

    const addToQuiz = (newQuestions: DisplayQuizProps): void => {
        console.log("new questions:", newQuestions);
        const quizTotal = {...curQuiz, ...newQuestions};
        //console.log("combination ", {...curQuiz, ...newQuestions});
        setCurQuiz(quizTotal);
        console.log("Current Quiz:", curQuiz);
    }

    // when passed new chats from gbt it gets the last chat, parses
    // it as json and adds it to the curQuiz
    const parseChatHistory = (newChats: OpenAI.ChatCompletion) => {
        console.log("new chats:", newChats);
        const len = newChats.choices.length;
        if(len === 0) return;
        const res = newChats.choices[len-1].message.content;
        if(res === null) return;
        addToQuiz(JSON.parse(res));
    }

    // gets the next questions
    async function createNextQuestion() {
        //setIsLoading(true);
        setType("generatingQuestions")
        // if basic curQuiz only one call is nessesary
        const questionAns: QuestionAnswer[] = answers.map((q: QuestionAns) => ({question: curQuiz[q.questionId], answer: q.answer}));
        const newQuestions = currTotQuestions < initialMax ? initialMax-currTotQuestions : totalQuestions - currTotQuestions
        if ((currTotQuestions + newQuestions) >= initialMax) setFollowUp(true);
        console.log(`new total: ${currTotQuestions + newQuestions}`);
        followUp ? console.log("follow up questions") : console.log("initial questions")
        setCurrTotQuestions(currTotQuestions + newQuestions);
        const response = await connectToGBT(CreateStartingPrompt({
                questionsAns: questionAns,
                status: followUp ? "followUp" : "",
                quiz: title
            }), CreateBasicStartingPrompt(newQuestions, questionsAnswerd));
        console.log("GBT response", response);
        parseChatHistory(response);
        //adding new messages to chat history
        setGBTConversation(gbtConversation);
        //setIsLoading(false); 
        return
    }

    // used to determine next question
    const determineNextQuestionId = async (currentQuestionId: string, curQuiz: DisplayQuizProps, forewards: boolean): Promise<string> => {
        // questions are id'd as `quiestion${questionNumber}`
        if (currentQuestionId.includes("question")) {
          if (forewards) { // process for getting the next question
            const newId = `question${parseInt(currentQuestionId.substring(8)) + 1}`; // returns next numerical question
            if (newId in curQuiz) return (newId);
            //quiz is done
            console.log("Q Id:", newId);
            if(parseInt(currentQuestionId.substring(8)) >= totalQuestions) return "";
            // curQuiz is not over but needs more questions
            else if(currTotQuestions < totalQuestions) {
                await createNextQuestion();
                // assuming nothing breaks and the next question is actually loaded
                return `question${parseInt(currentQuestionId.substring(8)) + 1}`;
            }
            else return "";
          } 
          else { //go-back
            const newId = `question${parseInt(currentQuestionId.substring(8)) - 1}`;
            if (newId in curQuiz) return (newId);
            else return ""
          }
        } 
        else return "";
      };

    /**
     * 
     * @param answer - the answer for the current question
     * when an answer is submitted the answer is passed and added to the answers
     * the next question is then displayed
     * if there is no next question then the curQuiz is over
     */
    const handleAnswerSubmit = async (answer: string, forewards: boolean) => {
        setIsLoading(true);
        setType("nextQuestion")
        
        if (forewards) { // if going to next question
            const nextQuestionId = await determineNextQuestionId(currentQuestionId, curQuiz, true);
            console.log("next question id", nextQuestionId);
            if (questionsAnswerd === lastQuestionArray) { // if questions answered is equal to the latest array, appends it with newest answer
                setAnswers([...answers, {questionId: currentQuestionId, answer: answer}])
                setQuestionArray(lastQuestionArray + 1);
            } 
            else { // else, splices array and puts in the new answer
                const newAnswers = [...answers]
                newAnswers.splice(questionsAnswerd, 1, {questionId: currentQuestionId, answer: answer})
                setAnswers(newAnswers);
            }
            setQuestionsAnswered(questionsAnswerd + 1); // increments questions answered

            if (nextQuestionId === "") {
                setIsQuizComplete(true); // End of the curQuiz
            } 
            else {
                setCurrentQuestionId(nextQuestionId); // Move to the next question
            }
        } 
        else { // backwards
            setQuestionsAnswered(questionsAnswerd - 1);
            const nextQuestionId = determineNextQuestionId(currentQuestionId, curQuiz, false);
            setCurrentQuestionId(await nextQuestionId);
        }
        setIsLoading(false);
    }
    // if(Object.keys(quiz).length === 0) createQuiz();
    
    const DisplayResults = () => {
        const questionAns: QuestionAnswer[] = answers.map((q: QuestionAns) => ({question: curQuiz[q.questionId], answer: q.answer}));
        const [response, setResponse] = useState<OpenAI.ChatCompletion>();
        const [loaded, setLoaded] = useState(false);
    
        useEffect(() => {
            async function getFinalResponse() {
                const response = await addResponseGBT({choices: gbtConversation, newMessage: createFinalResponse(questionAns)});
                setResponse(response);
                setLoaded(true);
            }
    
            if (!response) getFinalResponse();
        }, [questionAns, response]);
    
        if (!loaded) return <Loading type="finalReport"/>;
    
        if (!response || !response.choices.length) return <p>Error Occurred</p>;

        const finalAns = response.choices[response.choices.length-1].message.content;
        if(finalAns == null) return<>Error Occured</>
        const finalResponse: AnswerResponse = JSON.parse(finalAns);
    
        return (
            <>
                <h2>Career Report Summary</h2>
                <p>{finalResponse.summary}</p>
                <h3>Detailed Advice</h3>
                <p>{finalResponse.advice}</p>
                <h3>Explore Further</h3>
                <p>{finalResponse.interactiveElements}</p>
                <h3>Recommended Career Paths</h3>
                <p>{finalResponse.recommendations}</p>
                <h3>Why These Paths?</h3>
                <p>{finalResponse.reasoning}</p>
            </>
        );
    }
    


    if (isLoading) {
        return <Loading type={type}/>;
    }    

    if (isQuizComplete) {
        return (
        <>
            <h2>Your results</h2>
            <DisplayResults/>
        </>)
    }

    const currentQuestion = curQuiz[currentQuestionId];

    const foundAnswer = answers.find((targetAnswer) => (targetAnswer.questionId === currentQuestion.id))
    
    const questionComponentProps: QuestionComponentProps = {
        question: currentQuestion.prompt,
        options: currentQuestion.options,
        onNext: handleAnswerSubmit,
        isFirst: currentQuestionId === "question1",
        description: currentQuestion.description,
        prevAnswer: foundAnswer ? foundAnswer.answer : ""
    };

    const renderQuestionComponent = () => {
        switch (currentQuestion.type) {
            case "MC_SINGLE_RESPONSE":
                return <McSingleResponse {...questionComponentProps} />;
            case "MC_MULTI_RESPONSE":
                return <McMultiResponse {...questionComponentProps} />;
            case "USER_RANKING":
                return <UserRanking {...questionComponentProps} />;
            case "TEXT_RESPONSE":
                return <TextResponse {...questionComponentProps} />;
            case "SLIDER_RESPONSE":
                return <SliderResponse {...questionComponentProps} />;
            default:
                return <h1>Unknown question type</h1>;
        }
    };

    return (
        <Container className="quiz-container">
            {renderQuestionComponent()}
        </Container>
    );
}
