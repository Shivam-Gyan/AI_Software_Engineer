import projectServices from "../database/services/project.services.js";
import userAuth from "../model/user.auth.js";
import { validationResult } from "express-validator";


const projectController = {

    createProject: async (req, res) => {

        const errors = validationResult(req);

        if (errors.array().length > 0) {
            return res.status(400).json({ errors: errors.array() })
        }

        try {
            const { name } = req.body;
            const userId = await userAuth.findOne({ email: req.user.email }).select('_id');

            const project = await projectServices.createProject({ name, userId });
            res.status(201).json({
                message: 'Project created successfully',
                success: true,
                project
            })
        } catch (error) {
            res.status(400).json({
                success: false,
                message: error.message
            })
        }
    },

    getAllProjects: async (req, res) => {

        try{
            const userId=await userAuth.findOne({email:req.user.email}).select("_id");
            const allProjects=await projectServices.getAllProjects({userId});
            
            res.status(200).json({
                success:true,
                message:'All projects',
                projects:allProjects
            })

        }catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    },

    addUsersToProject:async(req,res)=>{

        const errors=validationResult(req);

        if(!errors.isEmpty()){
            return res.status(500).json({
                message:"Validation Error",
                errors:errors.array()
            })
        }

        try{
            const {projectId,users}=req.body;
            const userId=await userAuth.findOne({email:req.user.email}).select('_id');

            const project=await projectServices.addUserToProject(projectId,users,{userId:userId._id});

            res.status(200).json({
                success:true,
                message:'Users added to project successfully',
                project
            })

        }catch(error){
            res.status(400).json({
                success:false,
                message:error.message
            })
        }
    },

    getProjectDetails:async(req,res)=>{

        try{
            const projectId=req.params.projectId;

            const projectDetails=await projectServices.getProjectDetails({projectId});

            return res.status(200).json({
                message:"project fetched successfully",
                projectDetails
            })
        }catch(error){
            return res.status(500).json({
                error:"error while fetching project details",
                messsage:error.message
            })
        }
    }

    
}

export default projectController;