import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import databaseServices from '../Services/database.services'
import { ChatPanel, ContributorPanel, Footer, Navbar } from '../component'
// import { useUser } from '../context/user.context'
// import { receiveMessage, sendMessage } from '../config/socket_io.config'


const ProjectDetails = () => {

  const { projectId } = useParams()
  const [project, setProject] = useState(null)
  const [showContributorBox, setShowContributorBox] = useState(false)


  useEffect(() => {

    databaseServices.projectDetailsbyId(setProject, projectId);


  }, [])


  return (
    <>
      {/* <Navbar/> */}

      <main className='relative h-screen w-screen flex flex-col sm:flex-row '>
        {/* <main className='relative h-screen w-full flex '> */}

        {/* left side chat panel */}
        <ChatPanel project={project} setShowContributorBox={setShowContributorBox} />

        {/* slideing panel of contributor */}
        <section >
          <ContributorPanel project={project} showContributorBox={showContributorBox} setShowContributorBox={setShowContributorBox} />
        </section>

        <section className='right bg-red-50 flex-grow h-full'>

          <div className='max-w-56 min-w-52 bg-slate-200 py-3 h-full '>
            <div className='file-tree '>
              <div className='tree-element p-2 px-4 flex item-center'>
                <p className='text-lg font-medium'>
                  app.js
                </p>
              </div>
            </div>
          </div>


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