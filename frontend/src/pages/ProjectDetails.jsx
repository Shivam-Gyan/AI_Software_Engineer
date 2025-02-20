import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import axios from '../config/axios.config'

const ProjectDetails = () => {

    const {projectId}=useParams()
    const [project,setProject]=useState(null)

    useEffect(()=>{
        axios.get(`project/project-details/${projectId}`).then((response)=>{
            console.log(response)
            setProject(response.data.projectDetails)
        }).catch((error)=>{
            console.error(error)
        })
    },[projectId])
  return (
    <div>
        <h1>Project Details</h1>
        <p>{project && project.name}</p>
        <div>
            {project && project.users.map((user,index)=>(
                <p key={index}>{user && user.name}</p>
            ))}
        </div>
    </div>
  )
}

export default ProjectDetails