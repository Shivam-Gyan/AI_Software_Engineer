import axios from "../config/axios.config"
// import { initializationSocket, receiveMessage } from "../config/socket_io.config"

const databaseServices = {

    getprojects: function (setProjects) {
        axios.get('project/all-projects').then((response) => {
            // console.log(response)
            setProjects(response.data.projects)
        }).catch((error) => {
            console.error(error)
        })
    },

    getProfile: function (setUser) {
        axios.get("user/user-profile")
            .then((response) => {
                // console.log(response.data.user)
                setUser(response.data.user)
            }).catch((error) => {
                console.error(error)
            })
    },

    projectDetailsbyId: function (setProject, projectId) {
        axios.get(`project/project-details/${projectId}`).then((response) => {
            // console.log(response)
            setProject(response.data.projectDetails)
            // initializationSocket(response.data.projectDetails._id)
            // receiveMessage('project-message', (data) => {
            //     console.log(data)
            // })
        }).catch((error) => {
            console.error(error)
        })
    },
    updateFileTree:async function (projectId, fileTree) {

        console.log(projectId, fileTree)
        const response=await axios.put('project/update-file-tree', { projectId, fileTree })
        if(!response.data.success){
            throw new Error(response.data.message)
        }
        return response.data;
    },
    getFileTree:async function (projectId) {
        const response=await axios.get(`project/get-file-tree/${projectId}`)
        return response.data;
    },

     getAllusers :async () => {

        const response=await axios.get("user/all-user");

        return response.data.users;
    },

    addCollaborators :async (projectId,selectedUser) => {
        const response=await axios.patch('project/add-user', {
            projectId,
            users: selectedUser
        })
        return response.data;
    },

}

export default databaseServices;