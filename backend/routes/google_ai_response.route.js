import express from 'express';
import aiGenereatedResponse from '../controllers/google_ai_response.controller.js';

const GoogleResponseRouter = express.Router();


GoogleResponseRouter
    .get('/get-response', aiGenereatedResponse.sendGeneratedResponse)




export default GoogleResponseRouter;