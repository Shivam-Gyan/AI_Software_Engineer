import mongoose from "mongoose";
import projectModel from "../../model/project.model.js";


const projectServices = {

    createProject: async ({ name, userId }) => {

        if (!name || !userId) {
            throw new Error('name and userId are required')
        }

        const project = await projectModel.create({
            name,
            users: [userId],
            createdBy: userId
        })
        return project;
    },

    getAllProjects: async ({ userId }) => {
        if (!userId) {
            throw new Error('userId is required')
        }

        const allUserProjects = await projectModel.find({ users: userId }).select('name _id users').sort({ createdAt: -1 }) // Sort by createdAt (or your timestamp field)
            .limit(5);;

        return allUserProjects;
    },

    addUserToProject: async (projectId, users, { userId }) => {

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            throw new Error("Project id is required or Invalid project id")
        }

        if (!users) {
            throw new Error("users required in order to add");

        }

        if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
            throw new Error("User not authorized to add")
        }

        if (!Array.isArray(users) || users.some((user) => !mongoose.Types.ObjectId.isValid(user))) {
            throw new Error("invalid Users")
        }

        const project = await projectModel.findOne({
            _id: projectId,
            users: userId
        });

        if (!project) {
            throw new Error('Project not found or user not Authorized to add');
        }

        const updateProject = await projectModel.findOneAndUpdate({ _id: projectId }, {
            $addToSet: {
                users: {
                    $each: users
                }
            }
        }, {
            new: true
        })

        return updateProject;
    },

    // getProjectDetails: async ({ projectId }) => {

    //     if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
    //         throw new Error("project not exist or invalid project id")
    //     }

    //     // 67b49e259aeb73f28b3610a6
    //     const projectDetails = await projectModel.findOne({
    //         _id: projectId,
    //     })
    //         .populate({ path: 'users', select: 'name email _id' }) // Populate users
    //         .populate({ path: 'createdByUser', select: 'name email _id' }) // Populate createdByUser
    //         .exec();

    //     if (!projectDetails) {
    //         throw new Error("project not found");
    //     }

    //     return projectDetails;
    // },
    updateFileTree: async ({ projectId, fileTree, userId }) => {

        console.log(projectId, fileTree);

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            throw new Error("project not exist or invalid project id")
        }

        if (typeof fileTree !== 'object' || fileTree === null || Array.isArray(fileTree)) {
            throw new Error("fileTree must be a not-null object");
        }

        const fileTreeSaved = {
            fileTree,
            savedBy: userId
        };

        const project = await projectModel.findOneAndUpdate({
            _id: projectId
        }, {
            fileTreeSaved: fileTreeSaved
        }, {
            new: true,
            runValidators: true
        });

        if (!project) {
            throw new Error("project not found");
        }
    },

    getProjectDetails: async ({ projectId }) => {

        if (!projectId || !mongoose.Types.ObjectId.isValid(projectId)) {
            throw new Error("project not exist or invalid project id")
        }

        const projectDetails = await projectModel.findOne({
            _id: projectId,
        })
        .populate({ path: 'users', select: 'name email _id' }) // Populate users
        .populate({ path: 'createdByUser', select: 'name email _id' }) // Populate createdByUser
        .populate('fileTreeSaved.savedBy', 'name email  ')
        .exec();

        if (!projectDetails) {
            throw new Error("project not found");
        }
        return projectDetails;
    }
}

export default projectServices;