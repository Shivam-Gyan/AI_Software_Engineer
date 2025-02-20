import React, { useState } from 'react'
import ProjectCard from './project.card';
import { useUser } from '../context/user.context';
import axios from '../config/axios.config';

const CreateProject = () => {

    const [projectName, setProjectName] = useState('');

    const { projects, setProjects } = useUser();

    const handleProjectCreation = (e) => {
        e.preventDefault();

        axios.post('project/create', { name: projectName }).then((response) => {
            setProjects([...projects, response.data.project]);
            setProjectName('');
        }).catch((error) => {
            console.error(error);
        })
    }


    return (
        <section className='py-20'>

            <div className='flex flex-col items-center justify-center max-h-full '>
                <h1 className='text-xl text-center font-bold tracking-wide uppercase text-indigo-600'>Let's start a new project</h1>
                <form onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                        handleProjectCreation(e)
                    }
                }} className='flex flex-col items-center justify-center mt-7 '>
                    <div className='flex items-center gap-4 px-3 py-2 justify-between border-2 w-[50vh] border-indigo-300 rounded-lg'>
                        <input type='text' placeholder='project Name' className='outline-none px-3 py-2' value={projectName} onChange={(e) => setProjectName(e.target.value)} />

                        <button onClick={(e) => handleProjectCreation(e)} className=''> <i className="fi fi-ss-apps-add text-indigo-700 cursor-pointer text-xl"></i></button>
                    </div>

                </form>
            </div>


            {/* project card */}

            
            {projects?<div className='flex flex-wrap gap-5 items-center justify-center mt-7'>
                {projects.map((project, index) => (
                    <ProjectCard key={index} project={project} />
                ))}
            </div>:<div className='flex items-center justify-center mt-7'>
                <img src="https://assets-v2.lottiefiles.com/a/0953d504-117d-11ee-aa49-1f149204cb5f/9uZcoEJaoF.gif" alt="" />
            </div>}


        </section>
    )
}

export default CreateProject;