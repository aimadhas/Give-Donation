import React from 'react'
import Button from '@mui/material/Button';
import Found404 from "../assets/not404.jpg"
import { Link } from "react-router-dom";



const NotFoundPage = () => {
  return (
    <div className='h-screen flex-wrap flex items-center justify-around'>  
      <div>
        <h1 className='text-blue-600 font-serif text-6xl mb-5'> ERROR <br /> 404! </h1>
        <p className='mb-5 font-serif'>Ooops! the page you are looking for could not be found </p>
        <Button variant="contained"> <Link to="/">Return to home page</Link> </Button>
      </div>
      <div>
        <img className='w-[550px]' src={Found404} alt="Not Found Page" />
      </div>
    </div>
  )
}

export default NotFoundPage
