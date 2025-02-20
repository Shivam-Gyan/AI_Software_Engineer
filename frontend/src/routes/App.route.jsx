
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, ProjectDetails, Signup } from '../pages';
import Layout from '../Layout/Layout';
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import axios from '../config/axios.config';
import { useUser } from '../context/user.context';



const AppRoute = () => {
   const {setUser}= useUser()

    useEffect(()=>{
        axios.get("user/user-profile")
        .then((response)=>{
            console.log(response.data.user)   
            setUser(response.data.user)
        }).catch((error)=>{
            console.error(error)
        })
    },[])
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Signup />} />
                    <Route path='/project/:projectId' element={<ProjectDetails />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;