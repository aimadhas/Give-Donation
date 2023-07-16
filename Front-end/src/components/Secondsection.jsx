import React from 'react'
import image_3 from "../assets/image_3.png"

const Secondsection = () => {
  return (
    <section className='mb-[100px] pt-5 relative bg-blue-500 sm:bg-transparent'>
        <span className='bg-gradient-to-r from-cyan-500 to-blue-500 absolute sm:w-[100%] lg:w-[70%] right-0 rounded-bl-[20px] rounded-tl-[20px] h-[520px] z-[-30]'></span>
        <div className='uppercase font-bold text-2xl  cursor-pointer text-center text-white font-normal pt-[15px]' >who are we ?</div>
        <div className='flex-wrap flex items-center justify-around p-[40px] mt-[30px]'>
            <div className='w-[500px] border-[15px] border border-white rounded'>
                <img className='rounded' src={image_3} alt="" />
            </div>
            <div className='w-[500px] text-white '>
                <h1 className='font-bold text-lg uppercase mt-[30px]' >making life changing opportunities  </h1>
                <p className='mt-[30px] '>
                A group of students created a charity website to make a difference in their community! It's a one-stop-shop for all fundraising efforts, featuring past and upcoming events, donation opportunities, and easy registration. Their stories showcase the impact of the charity's work, inspiring supporters to contribute towards a better future. Join us and be part of something bigger than ourselves!
                </p>
            </div>
        </div>
    </section>
  )
}

export default Secondsection
