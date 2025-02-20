import React from 'react'
import { Link } from 'react-router-dom';


const ProjectCard = ({project}) => {

  return (
    <Link to={`/project/${project._id}`}>
      <div className='flex items-center w-[12rem] hover:bg-indigo-700 hover:text-white max-h-auto flex-col justify-between border-2 border-slate-200 rounded-lg mt-3 py-4 px-3'>
        <h1 className='text-md font-medium capitalize'>{project ?project.name:"Project name"}</h1>
        <div className='flex justify-center items-center gap-2 mt-2'>
          
          <p className='capitalize'><i className="fi fi-rr-user mr-2"></i>Collaborators :</p>
          <p>{project ?project.users.length:"0"}</p>
        </div>
      </div>
    </Link>
  )
}

export default ProjectCard;