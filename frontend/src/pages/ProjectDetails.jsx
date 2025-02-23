import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import databaseServices from '../Services/database.services'
import { ChatPanel, ContributorPanel, Footer, Navbar } from '../component'
import { initializationSocket } from '../config/socket_io.config'
import { useUser } from '../context/user.context'


const ProjectDetails = () => {

  const { projectId } = useParams()
  const {project,setProject}=useUser()
  const [showContributorBox, setShowContributorBox] = useState(false)

  useEffect(() => {

     databaseServices.projectDetailsbyId(setProject, projectId);

     initializationSocket(project._id)

  }, [])
  return (
    <>
      {/* <Navbar/> */}

      <main className='relative w-full flex '>

        {/* left side chat panel */}
        <ChatPanel project={project} setShowContributorBox={setShowContributorBox} />

        {/* slideing panel of contributor */}
        <section className={`fixed top-0 right-0 h-full min-w-full sm:min-w-96 bg-white shadow-lg transition-transform duration-300 ${showContributorBox ? "translate-x-0" : "translate-x-full"
          }`}>
          <ContributorPanel project={project} showContributorBox={showContributorBox} setShowContributorBox={setShowContributorBox} />
        </section>

      </main>

      {/* footer section  */}
      {/* <footer className="bg-gray-900 text-gray-300">
        <div className="border-t border-gray-700 py-4 text-center text-gray-500 text-sm">
          © {new Date().getFullYear()} YourCompany. All rights reserved.
        </div>
      </footer> */}
    </>
  )
}



export default ProjectDetails