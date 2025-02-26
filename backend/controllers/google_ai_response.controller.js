import googleGeminiResponseServices from "../database/services/google_ai_response.services.js";


const aiGenereatedResponse = {

    sendGeneratedResponse: async (req, res) => {

        try {
            const { prompt } = req.query;

            const result=await googleGeminiResponseServices.geminiResponse(prompt);

            res.status(200).json({
                success: true,
                response: result
            })
        } catch (error) {
            res.status(500).json({
                success: false,
                message: error.message
            })
        }
    }
}

export default aiGenereatedResponse;