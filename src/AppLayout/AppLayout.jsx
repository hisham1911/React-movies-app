import React from 'react'
import NavBar from '../component/header/navBar'
import Footer from '../component/Footer/footer'
import { Outlet } from 'react-router-dom'
function AppLayout() {
    return (
        <div>
            <NavBar />
            <Outlet/>
            <Footer />
        </div>
    )
}
export default AppLayout