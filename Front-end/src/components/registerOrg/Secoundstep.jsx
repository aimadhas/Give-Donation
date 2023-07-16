import React, { useContext } from 'react'
import Input from '../UI/input'
import Inputwraper from '../UI/inputwraper'

export default function Secoundstep(props) {
  const data = props.data
  const citylist = props.citylist
  return (
    <div className='my-10'>
     <div className='w-full flex gap-2 max-600px:flex-col'>
    <Inputwraper className='w-1/2 max-600px:w-full'>
      <label htmlFor="">City</label>
          <select  as="select"  name='city' onChange={data.handleChange}  value={data.values.city} onBlur={data.handleBlur} className={`bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3 outline-none ${data.errors.city && data.touched.city?'border-red-600':''}`}>
          <option value="">Select a city</option>
            {citylist.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
          </select>
        {data.errors.city && data.touched.city && <p className="text-red-700">{data.errors.city}</p>}
      </Inputwraper>
    <Inputwraper className='w-1/2 max-600px:w-full'>
      <label htmlFor="">Organisation address</label>
      <Input type="text" placeholder='Organisation' name='address' onChange={data.handleChange}  value={data.values.address} onBlur={data.handleBlur} className={`${data.errors.address && data.touched.address?'border-red-600':''}`}/>
        {data.errors.address && data.touched.address && <p className="text-red-700">{data.errors.address}</p>}
      </Inputwraper>
    </div>
    <Inputwraper>
      <label htmlFor="">Organisation Type</label>
      <Input name='Type' onChange={data.handleChange}  value={data.values.Type} onBlur={data.handleBlur} className={`bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3 outline-none ${data.errors.Type && data.touched.Type?'border-red-600':''}`}>
          </Input>
        {data.errors.Type && data.touched.Type && <p className="text-red-700">{data.errors.Type}</p>}
      </Inputwraper>
      <Inputwraper>
      <label htmlFor="">Descripion</label>
      <textarea name="Descripion" id="" cols="30" rows="10" placeholder='what is ur organisation goals for example' onChange={data.handleChange}  value={data.values.Descripion} onBlur={data.Descripion} className={`outline-none bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3${data.errors.Descripion && data.touched.Descripion?'border-red-600':''}`}></textarea>
      {data.errors.Descripion && data.touched.Descripion && <p className="text-red-700">{data.errors.Descripion}</p>}
      </Inputwraper>
    </div>
  )
}
