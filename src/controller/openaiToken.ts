import OpenAI from "openai";

export const getApiKey = (): string => {
    const localKey = localStorage.getItem("GBTKEY");
    if (localKey) {
        console.log("API Key retrieved successfully.");
        return localKey;
    } else {
        console.error("API Key is not found in localStorage.");
        return ""; // Consider how you handle cases where the API key is missing
    }
}

// Create an instance of the OpenAI client
export var openaiToken = new OpenAI({
    apiKey: getApiKey(),
    dangerouslyAllowBrowser: true // Be cautious with this setting in production
});










// import OpenAI from "openai";

// export const getApiKey = (): string => {
//     const localKey = localStorage.getItem("GBTKEY")
//     if(localKey != null) return localKey;
//     return"";
// }

// export const openaiToken = new OpenAI({
//     apiKey: getApiKey(),
//     dangerouslyAllowBrowser: true // allows for running in the browser
// });