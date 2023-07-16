import React from 'react'
import { Button } from './button'
export default function MessageComp(props) {
  return (
    <div className="spinner-overlay">
    <div className="spinner-container">
      <div className="bg-[#FFFFFF] rounded-xl px-4 py-9  max-w-[700px] max-[700px]:w-[300px]">
        {props.children}
        {/* <p className='font-bold text-2xl text-center uppercase my-4'>are you sure you want to participate in this event? </p>
        <p className='font-medium text-sm text-center uppercase my-5'>note: if certain please confirm and an invitation would be sent to your email.</p>
        <div className='flex items-center justify-center gap-3 my-4'>
        <Button className='bg-[#054DEC] text-white'>confirm</Button>
        <Button className='bg-[#E47070] text-white'>cancel</Button>
        </div> */}
      </div>
    </div>
  </div>
  )
}
