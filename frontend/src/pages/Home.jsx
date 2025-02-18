import React from 'react'
import { useUser } from '../context/user.context'

const Home = () => {

  const {user}=useUser();
  return (
    <div>{user ?<h1 className='py-8 text-3xl text-center'>{user.email}</h1>:"Home"}</div>
  )
}

export default Home;