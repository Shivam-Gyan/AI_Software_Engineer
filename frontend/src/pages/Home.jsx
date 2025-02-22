import React, { useEffect } from 'react'
import { useUser } from '../context/user.context'
import { CreateProject, HeroSection } from '../component';
import databaseServices from '../Services/database.services';


const Home = () => {

  const { user, setProjects } = useUser();

  useEffect(() => {
    databaseServices.getprojects(setProjects);
  }, [user])
  return (
    <div>
      <HeroSection />
      <CreateProject />
    </div>
  )
}

export default Home;