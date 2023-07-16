import React from 'react'

export default function Welcom(props) {
  return (
    <div className={`flex flex-col gap-6 w-1/2  rounded-sm px-5 py-7 items-center justify-center ${props.className}`}>
      <h1 className='font-bold text-[32px]'>Welcome </h1>
      {props.children}
    </div>
  )
}
