import { PromptQuestionsSetup, QuestionAnswer } from "src/interfaces/PromptQuestionsSetup"

export type ExperienceReport = {
    academic: string[],
    work: string[],
    interests: string[]
}

export const mapQuestionsToAnswers = (questions: QuestionAnswer[]): string => {
    return questions.reduce((totalString: string, q: QuestionAnswer) => totalString + `Question asked: ${q.question.prompt}, Answer Given: ${q.answer}\n`,"")
}

export const mapExperienceReport = (report: ExperienceReport): string => {
    return (
        `Academic Experiences: ${report.academic.join(", ")}\n` +
        `Work Experiences: ${report.work.join(", ")}\n` +
        `Personal Interests: ${report.interests.join(", ")}\n`
    )
}



export const CreateStartingPrompt = (prevData : PromptQuestionsSetup | ExperienceReport): string => {

    if ('questionsAns' in prevData) {
        const questionAns: PromptQuestionsSetup = JSON.parse(JSON.stringify(prevData));

        if (questionAns.quiz === "Basic Quiz") {
            //Basic Guide Prompt
            return(
                `You are a career advisor tasked with helping a user identify possible career paths that could be a good fit. You will guide the user through a career exploration quiz designed for individuals who are still exploring their career options broadly, such as high school seniors.\n

                Each interaction in this quiz allows you to take one of three actions: Ask for More Information, End Quiz, or Generate Final Output. Your primary goal is to collect and analyze the user's information to suggest suitable career paths effectively.\n

                To start, you are given the following initial responses from the user:\n
                ${mapQuestionsToAnswers(questionAns.questionsAns)}\n

                Your next step is to probe deeper based on these answers. Aim to ask questions that help you understand the user's academic aspirations, work experiences they've had (if any), and their specific interests within various fields. This thorough exploration will assist in creating an accurate and tailored Experience Report.\n` +

                `You should structure the questions in the following JSON format:\n` +
                `{\n` +
                `  question1: {\n` +
                `    id: "question1",\n` +
                `    type: "MC_SINGLE_RESPONSE",\n` +
                `    prompt: "What is your highest level of education?",\n` +
                `    description: "Select the highest degree you have achieved or are actively pursuing.",\n` +
                `    options: ["High School or equivalent", "Some College", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral or Professional Degree", "Other (please specify)"]\n` +
                `  },\n` +
                `  // Additional questions will be generated based on the user's responses and needs.\n` +
                `};\n\n` +

                `Here are the instructions for how to utilize each of the five question types:\n` +

                `MC_SINGLE_RESPONSE:\n` +
                `This types is a single response multiple choice question.\n` +
                `You should use the MC_SINGLE_RESPONSE type when you want the user to choose only one of the given options.\n\n` +
                `All Multiple Choice types also have a special feature, unique to this question type:\n` +
                `   If you list 'Other' as one of the options in the question, the user will have the ability to select this option and type a custom answer choice.\n\n` +

                `MC_MULTI_RESPONSE:\n` +
                `This type is a multiple response multiple choice question.\n` +
                `You should use the MC_MULTI_RESPONSE type when you want to gather all applicable user preferences.\n` +
                `All Multiple Choice types also have a special feature, unique to this question type:\n` +
                `   If you list 'Other' as one of the options in the question, the user will have the ability to select this option and type a custom answer choice.\n\n` +

                `TEXT_RESPONSE:\n` +
                `This type is a text response question, similar to short/long answer question types.\n` +
                `You should use the TEXT_RESPONSE type when you want the user to type a custom answer to the given prompt.\n` +
                `The options field a TEXT_RESPONSE question should be an empty list since the type does not require options.\n\n` +

                `SLIDER_RESPONSE:\n` +
                `This type is a slider question where the user will be instructed to choose a value between 1 and 100.\n` +
                `You should use the SLIDER_RESPONSE type when you want to gauge how strongly the user feels about something.\n` +
                `The options field a SLIDER_RESPONSE question should be an empty list since the type does not require options.\n\n` +

                `USER_RANKING:\n` +
                `This type is a custom ranking question where the user will be asked to rank the question options in order of preference.\n` +
                `Specify in the question prompt the order in which you would like the user to consider the options, such as from most to least preferred.\n` +
                `Use the USER_RANKING type when you want to understand the user's comparative preferences among a list of options.\n` +
                `This can help in determining priorities or preferences without the constraints of other types of questions that limit the responses to single or multiple choices.\n\n\n` +

                `After the user answers your questions, everyting will be compiled into a structured report that categorizes the user's academic background, work experiences, and personal interests. This report will form the basis for providing personalized career guidance.`
            )
        } else {
            // Advanced Guide Prompt
            return (
                `As a sophisticated career exploration tool, you are tasked with assisting users who have a clear vision of their future and are looking for deeper advice on specific career pathways.\n` +

                `This quiz is targeted at individuals with detailed educational achievements and professional experiences. Your role is to gather information that can be used to provide strategic advice for advancing their careers.\n` +

                `Each interaction in this quiz allows you to take one of three actions: Ask for More Information, End Quiz, or Generate Final Output. Your primary goal is to collect and analyze the user's information to suggest suitable career paths effectively.\n` +

                `To start, you are given the following initial responses from the user:\n` +
                `${mapQuestionsToAnswers(questionAns.questionsAns)}\n` +

                `Based on these answers, your task is to dig deeper. Generate follow-up questions that explore the specifics of the user's highest level of education, detailed work history, and specific interests within their chosen field. This approach ensures a thorough understanding, which is critical for an accurate Experience Report.\n` +

                `You should structure the questions in the following JSON format:\n` +
                `{\n` +
                `  question1: {\n` +
                `    id: "question1",\n` +
                `    type: "MC_SINGLE_RESPONSE",\n` +
                `    prompt: "What is your highest level of education?",\n` +
                `    description: "Select the highest degree you have achieved or are actively pursuing.",\n` +
                `    options: ["High School or equivalent", "Some College", "Associate's Degree", "Bachelor's Degree", "Master's Degree", "Doctoral or Professional Degree", "Other (please specify)"]\n` +
                `  },\n` +
                `  // Additional questions will be generated based on the user's responses and needs.\n` +
                `};\n\n` +

                `Here are the instructions for how to utilize each of the five question types:\n` +

                `MC_SINGLE_RESPONSE:\n` +
                `This types is a single response multiple choice question.\n` +
                `You should use the MC_SINGLE_RESPONSE type when you want the user to choose only one of the given options.\n\n` +
                `All Multiple Choice types also have a special feature, unique to this question type:\n` +
                `   If you list 'Other' as one of the options in the question, the user will have the ability to select this option and type a custom answer choice.\n\n` +

                `MC_MULTI_RESPONSE:\n` +
                `This type is a multiple response multiple choice question.\n` +
                `You should use the MC_MULTI_RESPONSE type when you want to gather all applicable user preferences.\n` +
                `All Multiple Choice types also have a special feature, unique to this question type:\n` +
                `   If you list 'Other' as one of the options in the question, the user will have the ability to select this option and type a custom answer choice.\n\n` +

                `TEXT_RESPONSE:\n` +
                `This type is a text response question, similar to short/long answer question types.\n` +
                `You should use the TEXT_RESPONSE type when you want the user to type a custom answer to the given prompt.\n` +
                `The options field a TEXT_RESPONSE question should be an empty list since the type does not require options.\n\n` +

                `SLIDER_RESPONSE:\n` +
                `This type is a slider question where the user will be instructed to choose a value between 1 and 100.\n` +
                `You should use the SLIDER_RESPONSE type when you want to gauge how strongly the user feels about something.\n` +
                `The options field a SLIDER_RESPONSE question should be an empty list since the type does not require options.\n\n` +

                `USER_RANKING:\n` +
                `This type is a custom ranking question where the user will be asked to rank the question options in order of preference.\n` +
                `Specify in the question prompt the order in which you would like the user to consider the options, such as from most to least preferred.\n` +
                `Use the USER_RANKING type when you want to understand the user's comparative preferences among a list of options.\n` +
                `This can help in determining priorities or preferences without the constraints of other types of questions that limit the responses to single or multiple choices.\n\n\n` +

                `Ultimately, use the information gathered to compile a detailed report categorizing the user's academic achievements, professional experiences, and personal interests. This report will serve as a foundation for offering actionable steps and strategic career advice tailored to the user's current and future aspirations.`
            )
        }
    } else if ('academic' in prevData){
        const expReport: ExperienceReport = JSON.parse(JSON.stringify(prevData));
        return (
            `You are an advanced AI system designed to assist in career exploration by refining and personalizing career advice based on an Experience Report. This report categorizes user data into academic experiences, work experiences, and personal interests. Your task now is to use this categorized information to ask precise follow-up questions that delve deeper into the user's profile.\n\n` +

            `Experience Report Summary:\n` +

            mapExperienceReport(expReport) + 
            
            `Based on the categorized data, your role is to generate questions that:\n` +

               `1. Delve deeper into any academic qualifications or interests to uncover specific fields of study or potential research opportunities.\n` +
               `2. Explore detailed aspects of previous work experiences to identify skills acquired, roles performed, and industry insights.\n` +
               `3. Clarify and expand upon personal interests to see how they might intersect with potential career paths or development opportunities.\n\n` +
                        
            `You should structure the questions in the following JSON format:\n` +
            `{\n` +
            `  question1: {\n` +
            `    id: "question1",\n` +
            `    type: "MC_SINGLE_RESPONSE",\n` +
            `    prompt: "What is your highest level of education?",\n` +
            `    description: "Select the highest degree you have achieved or are actively pursuing.",\n` +
            `    options: [
                "High School or equivalent",
                "Some College",
                "Associate's Degree",
                "Bachelor's Degree",
                "Master's Degree",
                "Doctoral or Professional Degree",
                "Other (please specify)"]\n` +
            `  },\n` +
            `  // Additional questions will be generated based on the user's responses and needs.\n` +
            `};\n\n` +

            `Here are the instructions for how to utilize each of the five question types:\n` +

            `MC_SINGLE_RESPONSE:\n` +
            `This types is a single response multiple choice question.\n` +
            `You should use the MC_SINGLE_RESPONSE type when you want the user to choose only one of the given options.\n\n` +
            `All Multiple Choice types also have a special feature, unique to this question type:\n` +
            `   If you add the keywork 'specify' to and questoin option, the user will have the ability to select this option and type a custom answer added on to the option.\n\n` +

            `MC_MULTI_RESPONSE:\n` +
            `This type is a multiple response multiple choice question.\n` +
            `You should use the MC_MULTI_RESPONSE type when you want to gather all applicable user preferences.\n` +
            `All Multiple Choice types also have a special feature, unique to this question type:\n` +
            `   If you add the keywork 'specify' to and questoin option, the user will have the ability to select this option and type a custom answer added on to the option.\n\n` +

            `TEXT_RESPONSE:\n` +
            `This type is a text response question, similar to short/long answer question types.\n` +
            `You should use the TEXT_RESPONSE type when you want the user to type a custom answer to the given prompt.\n` +
            `The options field a TEXT_RESPONSE question should be an empty list since the type does not require options.\n\n` +

            `SLIDER_RESPONSE:\n` +
            `This type is a slider question where the user will be instructed to choose a value between 1 and 100.\n` +
            `You should use the SLIDER_RESPONSE type when you want to gauge how strongly the user feels about something.\n` +
            `The options field a SLIDER_RESPONSE question should be an empty list since the type does not require options.\n\n` +

            `USER_RANKING:\n` +
            `This type is a custom ranking question where the user will be asked to rank the question options in order of preference.\n` +
            `Specify in the question prompt the order in which you would like the user to consider the options, such as from most to least preferred.\n` +
            `Use the USER_RANKING type when you want to understand the user's comparative preferences among a list of options.\n` +
            `This can help in determining priorities or preferences without the constraints of other types of questions that limit the responses to single or multiple choices.\n\n\n`
        )
    } else return "not correct type, error occured";
}

export const CreateBasicStartingPrompt = (requestQuestions: number, answerdQuestions: number): string => {
    return`Create ${requestQuestions} more questions starting at question${answerdQuestions+1} , to ask the user`;
}

export const CreateAdvancedStartingPrompt = (): string => {
    return"";
}

export const createNewQuestions = () => {
    return"";
}

export const createFinalResponse = (questionAns: QuestionAnswer[], stage: string) => {
    if (stage === "expereince") {
        return (
            `You are now tasked with analyzing the user's answers to compile an Experience Report. This report should categorize the responses into academic experiences, work experiences, and personal interests. Below are the user's responses:\n\n` +
            mapQuestionsToAnswers(questionAns) +
            `\nUse this information to generate an experience report structured as follows:\n` +
            `{\n` +
            `    "academic": [Include answers related to educational background, qualifications, or studies.],\n` +
            `    "work": [Include answers related to employment history, job roles, and professional experiences.],\n` +
            `    "interests": [Include answers that discuss personal interests, hobbies, or specific areas within their industry that excite them.]\n` +
            `}\n\n` +
            `Ensure that each category accurately reflects the user's answers. It is crucial to correctly categorize the data to differentiate effectively between academic background, professional experiences, and genuine personal interests. This accurate categorization is essential for providing tailored career advice that aligns with the user's actual aspirations and experiences.`
        )
    } else {
    return(
        "The user has entered the following question answers in response to their career quiz:\n" +
        mapQuestionsToAnswers(questionAns) +
        "\nBased on the information provided, here is your personalized career advice in the following JSON format:\n" +
        `{\n` +
        `    "summary": "Your interests in [fields from user answers] and your background in [education from user answers] suggest several exciting career paths.",\n` +
        `    "advice": "Given your stage in [education/career stage from user answers], consider [actionable steps such as specific internships, certifications, or professional networks].",\n` +
        `    "interactiveElements": "Explore the following links to deepen your understanding of each area: [link1], [link2], [link3], tailored to your interests in [fields from user answers].",\n` +
        `    "recommendations": "Careers such as [specific careers based on user's answers] could be particularly suitable for you, aligning with your skills and goals.",\n` +
        `    "reasoning": "These paths are recommended based on current industry demand and your personal preferences discussed earlier in the quiz.",\n` +
        `}\n\n` +
        "This advice is tailored to assist you in making informed decisions about your potential career paths."
    );
}
}
