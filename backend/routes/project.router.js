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
    .get('/all-projects',
        userMiddleware.verifyUser,
        projectController.getAllProjects
    )
    .patch('/add-user',
        userMiddleware.verifyUser,
        body('projectId').isString().withMessage('projectId required'),
        body('users').isArray({ min: 1 }).withMessage("users must be an Array")
            .custom((users) => users.every(user => typeof user == 'string')).withMessage("user must be string"),
        projectController.addUsersToProject
    )
    .get('/project-details/:projectId',
        projectController.getProjectDetails
    )
    

export default projectRouter;