
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { Home, Login, Signup } from '../pages';
import Layout from '../Layout/Layout';
import { Toaster } from 'react-hot-toast'



const AppRoute = () => {
    return (
        <BrowserRouter>
            <Toaster />
            <Routes>
                <Route path='/' element={<Layout />} >
                    <Route index element={<Home />} />
                    <Route path='/login' element={<Login />} />
                    <Route path='/register' element={<Signup />} />
                </Route>
            </Routes>
        </BrowserRouter>
    )
}

export default AppRoute;