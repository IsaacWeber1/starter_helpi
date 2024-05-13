import { openaiToken } from "./openaiToken";

export const CreateImage = async (career: string) => {
    const response = await openaiToken.images.generate({
        model: "dall-e-2",
        prompt: `return a picture of a typical ${career}`,
        n: 1,
        size: "1024x1024",
      });
    console.log(response);
    return response.data[0].url;
}