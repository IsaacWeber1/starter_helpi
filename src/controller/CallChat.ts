//import { Assistant, Assistants } from 'openai/resources/beta/assistants/assistants';
import OpenAI from 'openai';
import { openaiToken } from './openaiToken';





export async function callGBT(
    {
        userPrompt, 
        startingPrompt
    } 
    : 
    {
        userPrompt: string, 
        startingPrompt: string
    }
) {
  console.log("user prompt:", userPrompt);
  console.log("starting prompt", startingPrompt);
    const chatCompletion = await openaiToken.chat.completions.create({
      messages: [
        { role: 'system', content: startingPrompt },
        { role: 'user', content: userPrompt}
        ],
      model: 'gpt-4-turbo',
      response_format: { type: 'json_object' }
    });
    return chatCompletion;
}

export async function addResponseGBT(
  {
      choices,
      newMessage
  } 
  : 
  {
      choices: OpenAI.ChatCompletion.Choice[] | undefined,
      newMessage: string
  }
) {
  // maps previous choices to an array of message objects
  console.log(choices, newMessage);
  var messages = choices?.map((choice: OpenAI.ChatCompletion.Choice) => choice.message);
  console.log("Chat Messages to api: ", messages);
  if(messages === undefined) messages = [];
  const chatCompletion = await openaiToken.chat.completions.create({
    messages: [
      ...messages,
      {role: 'user', content: newMessage}
    ],
    model: 'gpt-4-turbo',
    response_format: { type: 'json_object' }
  });
  return chatCompletion;
}

