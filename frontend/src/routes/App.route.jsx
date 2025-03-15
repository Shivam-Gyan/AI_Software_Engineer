
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Project, Signup } from '../pages';
import Layout from '../Layout/Layout';
import { Toaster } from 'react-hot-toast'
import { useEffect } from 'react';
import { useUser } from '../context/user.context';
import databaseServices from '../Services/database.services';



const AppRoute = () => {
    const { user, setUser } = useUser();

    useEffect(() => {

        databaseServices.getProfile(setUser)

    }, [setUser])
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Signup />} />
                </Route>
                <Route path='/project/:projectId' element={<Project/>} />
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;