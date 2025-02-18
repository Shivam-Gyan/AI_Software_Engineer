import projectModel from "../model/project.model.js";


const projectServices={

    createProject:async ({name,userId})=>{

        if(!name ||!userId){
            throw new Error('name and userId are required')
        }

        const project=await projectModel.create({
            name,
            users:[userId]
        })
        return project;
    },

    getAllProjects:async({userId})=>{
        if(!userId){
            throw new Error('userId is required')
        }

        const allUserProjects=await projectModel.find({users:userId}).select('name _id');

        return allUserProjects;
    },

    addUserToProject:async({name,userId})=>{
        if(!userId){
            throw new Error('userId is required');
        }

        const project=await projectModel.findOne({name});

        if(!project){
            throw new Error('Project not found');
        }

        project.users.push(userId);

        await project.save();

        return project;
    }
}

export default projectServices;