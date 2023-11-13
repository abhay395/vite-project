import React from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'

function App() {

  return (
    <>
    <div className='sticky top-0 z-30' >
    <Header/>
    </div>
    <Outlet/>
    <Footer/>
    </>
  )
}

export default App
