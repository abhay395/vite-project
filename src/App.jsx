import React,{useEffect,useState} from 'react'
import Header from './Header/Header'
import { Outlet } from 'react-router-dom'
import Footer from './Footer/Footer'
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
    <div className='sticky top-0 z-10' >
    <Header/>
    </div>
    <Outlet/>
    <Footer/>
    </>
  
  )
}

export default App
