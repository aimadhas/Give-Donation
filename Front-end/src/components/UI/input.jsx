import React from 'react'

export default function Input(props) {
  return (
<input  className={`bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3 outline-none ${props.className}`} value={props.value} type={props.type} ref={props.ref} name={props.name} placeholder={props.placeholder} onChange={props.onChange} onBlur={props.onBlur} />
  )
}
