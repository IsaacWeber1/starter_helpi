import { openaiToken } from "./openaiToken";

export const CreateImage = async (career: string) => {
    const asyncResponse = openaiToken.images.generate({
        model: "dall-e-2",
        prompt: `return a picture of a typical ${career}`,
        n: 1,
        size: "1024x1024",
      });
    asyncResponse.catch((error) => {
        return undefined;
    })
    const response = await asyncResponse;
    return response.data[0].url;
}