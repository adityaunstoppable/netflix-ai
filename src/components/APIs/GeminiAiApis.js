
import { GoogleGenerativeAI } from "@google/generative-ai";
import { GEMINI_AI_API_KEY } from "../../constants";

const genAI = new GoogleGenerativeAI(GEMINI_AI_API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" });

export const getSuggestionsFromGeminiAi = async (query) => {
  try{
    const aiResponse = await model.generateContent(query)
    const aiResponseAsText = aiResponse?.response?.text()
    return aiResponseAsText
  }
  catch(error){
    return error
  }
  
}