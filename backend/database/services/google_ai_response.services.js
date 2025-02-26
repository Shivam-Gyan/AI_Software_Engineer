import { GoogleGenerativeAI } from "@google/generative-ai";


const googleGeminiResponseServices = {

    geminiResponse: async (prompt) => {
        const genAI = new GoogleGenerativeAI(process.env.GOOGLE_GEMINI_API_KEY);
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash",
            systemInstruction:"please dont provide details explaination without permission "
         });

        const result = await model.generateContent(prompt);

        if(!result){
            throw new Error("error while responsing")
        }

        return result.response.text();
    }
}


export default googleGeminiResponseServices;