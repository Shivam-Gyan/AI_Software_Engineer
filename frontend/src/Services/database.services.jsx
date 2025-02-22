import axios from "../config/axios.config"

const databaseServices = {

    getprojects: function (setProjects) {
        axios.get('project/all-projects').then((response) => {
            console.log(response)
            setProjects(response.data.projects)
        }).catch((error) => {
            console.error(error)
        })
    },

    getProfile:function(setUser){
        axios.get("user/user-profile")
        .then((response) => {
            console.log(response.data.user)
            setUser(response.data.user)
        }).catch((error) => {
            console.error(error)
        })
    },

    projectDetailsbyId:function(setProject,projectId){
        axios.get(`project/project-details/${projectId}`).then((response)=>{
            console.log(response)
            setProject(response.data.projectDetails)
        }).catch((error)=>{
            console.error(error)
        })
    }
}

export default databaseServices;