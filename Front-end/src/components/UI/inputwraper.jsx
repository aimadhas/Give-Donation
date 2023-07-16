import React from 'react'

export default function Inputwraper(props) {
  return (
    <div className={`flex flex-col mb-4 gap-2 text-start ${props.className}`}>
      {props.children}
    </div>
  )
}
