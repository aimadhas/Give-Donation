import React from 'react'

export default function Eventinfo(props) {
  return (
<div key={props.IdEvnt}  className="flex justify-between border flex-wrap mb-5rounded-lg w-full h-auto px-8 py-6 my-5 flex-col max-[800px]:flex-col ">
      <div className="w-[100%]  h-[400px] max-[800px]:w-full">
      <img src={props.eventImage} alt="" className="rounded w-full h-full object-cover" />
      </div>
      <div className="w-[100%]  max-[800px]:w-full ">
            <h1 className="font-bold mb-[20px] mt-[20px] capitalize">{props.titreEvnt}</h1>
            <p className='mb-2'>OPPORTUNITY TYPE : <span className='text-[#054DEC]'>{props.type}</span></p>
             <p className="mb-[20px] description">{props.description}</p>
             <div className='mt-5 mb-5 '>
               <h1>time commitment :{props.heure}</h1>
               <p className="mb-[20px]">deadline :{props.date.slice(0, 10)}</p>
             </div>
            <div className="flex w-full gap-3">
            {props.children}
            </div>
      </div>
    </div>
  )
}
