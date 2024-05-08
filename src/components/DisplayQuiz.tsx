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
import { HiChevronDown, } from "react-icons/hi2";

type DisplayQuizProps = Record<string, Question>;

type QuestionAns = {
    questionId: string,
    answer: string
}

type Career = {
    role: string, 
    description: string,
    benefits: string[]
    challenges: string[]
    links: string[]
}

type FinalReport = {careers: Career[]};

export function DisplayQuiz(
    { 
        quiz,
        title,
        questionsAnswerd,
        initialMax,
        totalQuestions,
        currTotQuestions,
        setQuestionsAnswerd,
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
        setQuestionsAnswerd : (questionsAnswerd: number) => void 
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
            setQuestionsAnswerd(questionsAnswerd + 1); // increments questions answered

            if (nextQuestionId === "") {
                setIsQuizComplete(true); // End of the curQuiz
            }
            else {
                setCurrentQuestionId(nextQuestionId); // Move to the next question
            }
        } 
        else { // backwards
            setQuestionsAnswerd(questionsAnswerd - 1);
            const nextQuestionId = determineNextQuestionId(currentQuestionId, curQuiz, false);
            setCurrentQuestionId(await nextQuestionId);
        }
        setIsLoading(false);
    }
    // if(Object.keys(quiz).length === 0) createQuiz();

    type RenderReportProps = {
        finalReport: FinalReport;
        currRoles: string[];
        updateRoles: (role: string) => void;
    };
    
    const RenderReport: React.FC<RenderReportProps> = ({ finalReport, currRoles, updateRoles }) => {
        return (
            <>
                <h2>Final Results:</h2>
                {finalReport.careers.map((career: Career) => (
                    <div 
                        className="App-career-container"
                        key={career.role}
                    >
                        <h3>{career.role}</h3>
                        <HiChevronDown 
                            onClick={() => updateRoles(career.role)}
                            size={20}
                            style={{position: "relative"}}
                        ><strong>{career.role}</strong></HiChevronDown>
                        <div style={{textAlign: 'left'}}>
                        {currRoles.includes(career.role) && (
                            <ol style={{listStyleType: 'none'}}>
                                <li><strong>Role:</strong> {career.description}</li>
                                <br></br>
                                <li>
                                    <h5>Benefits:</h5>
                                    <ul style={{listStyleType: 'disk'}}>
                                        {career.benefits.map((benefit, index) => (
                                            <p key={index} style={{listStyleType: 'disk'}}>{benefit}</p>
                                        ))}
                                    </ul>
                                </li>
                                <br></br>
                                <li>
                                    <h5>Challenges:</h5>
                                    <ul style={{listStyleType: 'disk'}}>
                                        {career.challenges.map((challenge, index) => (
                                            <p key={index}>{challenge}</p>
                                        ))}
                                    </ul>
                                </li>
                                <br></br>
                                <li>
                                    <h5>Links:</h5>
                                    <ul style={{listStyleType: 'disk'}}>
                                        {career.links.map((link, index) => (
                                            <a href={link} key={index}>{link}</a>
                                        ))}
                                    </ul>
                                </li>
                            </ol>
                        )}
                        </div>
                    </div>
                ))}
            </>
        );
    };
    
    // const exampleReport: FinalReport = {careers: [
    //         {
    //             "role": "Data Scientist",
    //             "description": "Responsible for analyzing large sets of structured and unstructured data to derive actionable insights and solutions in strategic areas of business.",
    //             "benefits": [
    //                 "High demand in tech and finance sectors",
    //                 "Opportunities for remote work",
    //                 "Excellent salary and growth prospects"
    //             ],
    //             "challenges": [
    //                 "Requires continuous skill upgrades",
    //                 "Handling very large datasets can be complex",
    //                 "Need to translate technical findings to non-technical stakeholders"
    //             ],
    //             "links": [
    //                 "https://www.bls.gov/ooh/math/data-scientists.htm",
    //                 "https://datascience.udacity.com/"
    //             ]
    //         },
    //         {
    //             "role": "Software Engineer",
    //             "description": "Designs, develops, and implements software solutions based on user requirements and industry trends.",
    //             "benefits": [
    //                 "Flexible working hours",
    //                 "High job satisfaction",
    //                 "Good team collaboration environment"
    //             ],
    //             "challenges": [
    //                 "Can involve long hours of debugging",
    //                 "Sometimes requires working with legacy code",
    //                 "Rapidly changing technology landscape"
    //             ],
    //             "links": [
    //                 "https://stackoverflow.com/",
    //                 "https://github.com/"
    //             ]
    //         },
    //         {
    //             "role": "UX Designer",
    //             "description": "Focuses on creating engaging interfaces with logical and thought-out behaviors and actions.",
    //             "benefits": [
    //                 "High impact on user satisfaction",
    //                 "Creativity-driven job role",
    //                 "Opportunities for contract and freelance work"
    //             ],
    //             "challenges": [
    //                 "Must keep up with changing design trends",
    //                 "Balancing user needs with business goals",
    //                 "Sometimes restricted by technology limits"
    //             ],
    //             "links": [
    //                 "https://www.behance.net/",
    //                 "https://www.adobe.com/products/xd.html"
    //             ]
    //         }
    //     ]}
    
    
    const DisplayResults = () => {
        const questionAns: QuestionAnswer[] = answers.map((q: QuestionAns) => ({question: curQuiz[q.questionId], answer: q.answer}));
        const [response, setResponse] = useState<OpenAI.ChatCompletion>();
        const [loaded, setLoaded] = useState(false);
        const [currRoles, setCurrRoles] = useState<string[]>([]); 

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
        const finalResponse:FinalReport = JSON.parse(finalAns.replace("carears", "careers"));

        function updateRoles (newRole: string) {
            // const newRoles: string[] = currRoles.includes(newRole) 
            //     ? [...currRoles].filter((currRole: string) => (currRole !== newRole))
            //     : [...currRoles, newRole];
            //     setCurrRoles(newRoles);
            setCurrRoles(prevRoles => 
                prevRoles.includes(newRole)
                ? prevRoles.filter(role => role !== newRole)
                : [...prevRoles, newRole]
            );
    
        }
        //maybe try using HiChevronDoubleUp when dropdown is down

        return <RenderReport finalReport={finalResponse} currRoles={currRoles} updateRoles={updateRoles} />;
    
        // return (
        //     <>
        //         <h2>Final Results:</h2>
        //         {finalResponse.careers.map((career: Career) => (
        //             <div 
        //                 className="App-career-container"
        //                 key={career.role}
        //             > {/* Assuming role is unique */}
        //                 <h3>{career.role}</h3>
        //                 <HiChevronDown 
        //                     onClick={() => updateRoles(career.role)}
        //                     size={20}
        //                     style={{position: "relative"}}
        //                 ><strong>{career.role}</strong></HiChevronDown>
        //                 <div style={{textAlign: 'left'}}>
        //                 {currRoles.includes(career.role) && (
        //                     <ul
        //                         style={{listStyleType:'none'}}
        //                     >
        //                         <li><strong>Role:</strong> {career.description}</li>
        //                         <br></br>
        //                         <li>
        //                             <h3>Benefits:</h3>
        //                             <ul
        //                                 style={{listStyleType: 'disk'}}
        //                             >
        //                                 {career.benefits.map((benefit, index) => (
        //                                     <li key={index}>{benefit}</li> // Not ideal if benefits can change
        //                                 ))}
        //                             </ul>
        //                         </li>
        //                         <br></br>
        //                         <li>
        //                             {career.challenges.map((challenge, index) => (
        //                                 <li key={index}>{challenge}</li> // Not ideal if challenges can change
        //                             ))}
        //                         </li>
        //                         <br></br>
        //                         <li>
        //                             {career.links.map((link, index) => (
        //                                 <a href={link} key={index}>{link}</a> // Not ideal if links can change
        //                             ))}
        //                         </li>
        //                     </ul>
        //                 )}
        //                 </div>
        //         </div>
        //         ))}

        //     </>
        // );
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
