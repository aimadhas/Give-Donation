// import React from 'react'
import image1 from '../../assets/1.png'
import { Button } from '../UI/button'
import { Link } from 'react-router-dom'

export default function Thirdstep() {
  return (
    <div className='w-full h-96 flex flex-col justify-center items-center gap-9 my-10'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center'>
        <img src={image1} alt="" />
      </div>
      <h1 className='font-semibold text-[24px] text-[#054DEC] max-600px:text-[16px] max-600px:text-center'>Account created successfully !</h1>
      <Link to='/Loginorg' className='bg-[#054DEC] text-[#FFFFFF] px-16 py-4 font-semibold text-[18px] cursor-pointer rounded-sm  max-sma:px-4'>Log in</Link>
    </div>
  )
}
