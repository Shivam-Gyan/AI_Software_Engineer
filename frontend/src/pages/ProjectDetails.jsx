import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import databaseServices from '../Services/database.services'
import { ChatPanel, ContributorPanel, Footer, Navbar } from '../component'

const ProjectDetails = () => {

  const { projectId } = useParams()
  const [project, setProject] = useState(null);
  const [showContributorBox, setShowContributorBox] = useState(false)

  useEffect(() => {
    databaseServices.projectDetailsbyId(setProject, projectId)
  }, [projectId])
  return (
    <>
      {/* <Navbar/> */}
      {/* h-screen */}
      <main className='relative w-full flex '>

        <ChatPanel project={project} setShowContributorBox={setShowContributorBox} />

        <section className={`fixed top-0 right-0 h-full min-w-full sm:min-w-96 bg-white shadow-lg transition-transform duration-300 ${showContributorBox ? "translate-x-0" : "translate-x-full"
          }`}>
          <ContributorPanel project={project} setShowContributorBox={setShowContributorBox} />
        </section>


      </main>

      <Footer />
    </>
  )
}



export default ProjectDetails