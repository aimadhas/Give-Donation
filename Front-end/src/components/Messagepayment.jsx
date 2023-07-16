import React from 'react'
import MessageComp from './UI/MessageComp'
import image1 from '../assets/1.png'
import { Button } from './UI/button'

export default function Messagepayment() {
  function DoneApply(){
    window.location.href='http://194.163.172.157:4173'
  }
  return (
    <>
     <MessageComp>
     <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
        <p className='font-medium text-xl text-center uppercase my-5'>Thank you for your Donation.</p>
        <div className='w-full text-right'>
        <Button className='bg-[#054DEC] text-white' onClick={DoneApply}>Done</Button>
        </div>
    </MessageComp> 
    </>
  )
}
