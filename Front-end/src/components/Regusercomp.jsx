import Inputwraper from "./UI/inputwraper"
import Input from "./UI/input"
import { Submit } from "./UI/button"
import { Link } from 'react-router-dom';
import { Formik, useFormik } from "formik";
import * as Yup from 'yup';
import Card from "./UI/Card";
import axios from 'axios'
import { Button } from './UI/button';
import { useState } from "react";
import { BtnLoading } from "./UI/button";


export default function Regusercomp() {
  const [btnLoading, setbtnLoading] = useState(false);
  
  const cityOptions = ["Tanger-Tétouan-Al Hoceïma","L'Oriental","Fès-Meknès","Rabat-Salé-Kénitra","Béni Mellal-Khénifra",'Marrakech-Safi',"Drâa-Tafilalet","Souss-Massa","Guelmim-Oued Noun","Laâyoune-Sakia El Hamra","Dakhla-Oued Ed Dahab"]
  const formik = useFormik({
    initialValues:{
      f_name:'',
      l_name:'',
      email:'',
      city:'',
      password:'',
      // confirmpassword:'',
    },
    validationSchema:Yup.object().shape({
      f_name: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace')
        .required('Please entre  your first name'),
        l_name: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace')
        .required('Please entre  your  last name'),
      email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message:"Please enter a valid email address"}).required('please enter an email'),
      city: Yup.string().required('Option is required').oneOf(cityOptions, 'Invalid option'),
      password:Yup.string().min(8).max(20).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).{8,}$/,{message:"Your password should have at least 8 characters, including one uppercase letter, one number, and one special character"}).required('please enter a password'),
      confirmpassword:Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).{8,}$/,{message:"Your password should have at least 8 characters, including one uppercase letter, one number, and one special character"}).required('please enter a password').oneOf([Yup.ref("password"),null]),
    }),
    onSubmit,
  })
  function onSubmit(values){
    setbtnLoading(true);
    axios.post(`${import.meta.env.VITE_APP_API_URL}/api/users/register`,values).then(function(response){
      window.location.href = '/Login';
    }).catch(function(res){
      console.log(res);
    })
      values.resetForm()
  }
  return (
    <Card className='w-2/4 mx-auto mt-10 px-20 pt-16 pb-8 text-center max-lga:w-[90%] max-lga:text-[16px]'>
    <form onSubmit={formik.handleSubmit}>
    <h1 className='text-[#000000] text-[32px] underline mb-4 font-bold text-start'>Register</h1>
    <div className='w-full flex gap-2 max-600px:flex-col'>
    <Inputwraper className='w-1/2 max-600px:w-full'>
      <label htmlFor="">First name</label>
      <Input type='text' placeholder='First name'  name='f_name' onChange={formik.handleChange} value={formik.values.f_name} onBlur={formik.handleBlur} className={`${formik.errors.f_name && formik.touched.f_name?'border-red-600':''}`}></Input>
      {formik.errors.f_name && formik.touched.f_name && <p className="text-red-700">{formik.errors.f_name}</p>}
      </Inputwraper>
    <Inputwraper className='w-1/2 max-600px:w-full'>
      <label htmlFor="">last name</label>
      <Input type='text' placeholder='Last name' name='l_name' onChange={formik.handleChange} value={formik.values.l_name} onBlur={formik.handleBlur} className={`${formik.errors.l_name && formik.touched.l_name?'border-red-600':''}`}></Input>
      {formik.errors.l_name && formik.touched.l_name && <p className="text-red-700">{formik.errors.l_name}</p>}
      </Inputwraper>
    </div>

    <Inputwraper>
      <label htmlFor="">Email</label>
      <Input type='email' placeholder='user@gmail.com' name='email' onChange={formik.handleChange} value={formik.values.email} onBlur={formik.handleBlur} className={`${formik.errors.email && formik.touched.email?'border-red-600':''}`}></Input>
      {formik.errors.email && formik.touched.email && <p className="text-red-700">{formik.errors.email}</p>}
      </Inputwraper>
    <Inputwraper>
    <label htmlFor="">City</label>
          <select  name='city' onChange={formik.handleChange}  value={formik.values.city} onBlur={formik.handleBlur} className={`bg-[#F9F9F9] text-[#5A5A5D] w-full border-[1px] border-[#CACACA] rounded-lg px-4 py-3 outline-none ${formik.errors.city && formik.touched.city?'border-red-600':''}`}>
          <option value="">Select a city</option>
            {cityOptions.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
          </select>
        {formik.errors.city && formik.touched.city && <p className="text-red-700 w-full">{formik.errors.city}</p>}
      </Inputwraper>
      <Inputwraper>
      <label htmlFor="">Password</label>
      <Input type='password' placeholder='Enter your password' name='password' onChange={formik.handleChange}  value={formik.values.password} onBlur={formik.handleBlur} className={`${formik.errors.password && formik.touched.password?'border-red-600':''}`}></Input>
      {formik.errors.password && formik.touched.password && <p className="text-red-700">{formik.errors.password}</p>}
      </Inputwraper>
      <Inputwraper>
      <label htmlFor="">Confirm Password</label>
      <Input type='password' placeholder='confirm your password' name='confirmpassword'  value={formik.values.confirmpassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`${formik.errors.confirmpassword && formik.touched.confirmpassword?'border-red-600':''}`} ></Input> 
      {formik.errors.confirmpassword && formik.touched.confirmpassword && <p className="text-red-700">{formik.errors.confirmpassword}</p>}
      </Inputwraper>
      {!btnLoading &&  <Submit type='submit' value='Register' className='mt-5 max-sma:px-2'></Submit>}
      {btnLoading &&  <BtnLoading></BtnLoading>}
      <p className="text-[#BEBEBF] mt-3">Already have an account ? <a href="#" className="text-[#747474]">
        <Link to='/Login'>Log in</Link></a></p>
    </form>
    </Card>
  )
}
