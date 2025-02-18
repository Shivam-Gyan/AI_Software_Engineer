import express from "express";
import projectController from "../controllers/project.controller.js";
import * as userMiddleware from '../middleware/user.middleware.js'
import { body } from "express-validator";

const projectRouter = new express.Router();


projectRouter
    .post('/create',
        body('name').isString().withMessage('Name is required'),
        userMiddleware.verifyUser,
        projectController.createProject
    )
    .post('/all-projects',
        userMiddleware.verifyUser,
        projectController.getAllProjects
    )
    .post('/add-user',
        body('name').isString().withMessage('Name is required'),
        userMiddleware.verifyUser,
        projectController.addUserToProject
    )

export default projectRouter;