import React, { useEffect } from 'react'
import { useUser } from '../context/user.context'
import { CreateProject, HeroSection } from '../component';
import axios from '../config/axios.config';

const Home = () => {

  const { user, projects, setProjects } = useUser();

  const getprojects = () => {
    axios.get('project/all-projects').then((response) => {
      console.log(response)
      setProjects(response.data.projects)
    }).catch((error) => {
      console.error(error)
    })
  }
  useEffect(() => {
    if(user){
      getprojects();
    }
  }, [user])
  return (
    <div>
      <HeroSection />
      <CreateProject />

    </div>
  )
}

export default Home;