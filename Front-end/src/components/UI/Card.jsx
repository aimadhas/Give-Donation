import React from 'react'

export default function Card(props) {
  return (
    <div onSubmit={props.onSubmit} className={` border-[1px] bg-[#FCFDFF]  border-[#CACACA]  px-10 py-14 rounded-md ${props.className}`}>
      {props.children}
    </div>
  )
}
