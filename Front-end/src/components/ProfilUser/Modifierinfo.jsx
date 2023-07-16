import React, { useEffect, useState } from 'react';
import Input from "../UI/input"
import Inputwraper from "../UI/inputwraper"
import LockIcon from '@mui/icons-material/Lock';
import { Button,Submit } from '../UI/button'
import { Link,useLocation } from 'react-router-dom'
import { FaUser } from "react-icons/fa";
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup';
import axios from 'axios'
import { AppContext } from "./APPcontext";
import { useContext } from "react";
import Spinners from "../UI/Spinner";
import { BtnLoading } from '../UI/button';
import MessageComp from "../UI/MessageComp";



export default function Modifierinfo() {
  const {setinformation,userdata,id,setUserData} = useContext(AppContext)
  const [valid,setvalid] = useState(false)
  const [isLoading, setIsLoading] = useState(true);
  const [previewURL, setPreviewURL] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);
  const [message, setmessage] = useState(false);





  const path = useLocation()
  const cityOptions = ["Tanger-Tétouan-Al Hoceïma","L'Oriental","Fès-Meknès","Rabat-Salé-Kénitra","Béni Mellal-Khénifra",'Marrakech-Safi',"Drâa-Tafilalet","Souss-Massa","Guelmim-Oued Noun","Laâyoune-Sakia El Hamra","Dakhla-Oued Ed Dahab"]
  useEffect(()=>{
    if(path.pathname === '/Profil-user/modifierinfo'){
      setvalid(true)
    }
  },[path])
  useEffect(() => {
    const id = localStorage.getItem('idUser')
    if (id) {
      axios.get(`${import.meta.env.VITE_APP_API_URL}/api/users/profile/${id}`)
        .then(function (response) {
          setUserData(response.data)
          setPreviewURL(response.data.photo)
          setIsLoading(false);
        })
        .catch(function (res) {
          console.log(res);
        })
    }else{
      setIsLoading(false);
      setmessage(true);
    }
  }, [])
  
  function DeleteMessage(){
    window.location.href='/'
  }


  const formik = useFormik({
    initialValues:{
      f_name:'',
      l_name:'',
      email:'',
      city:'',
      photo:null,
    },
    validationSchema:Yup.object().shape({
      f_name: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace')
        .required('Please enter your first name'),
      l_name: Yup.string()
        .min(4, 'Too Short!')
        .max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace')
        .required('Please enter your last name'),
      email: Yup.string().matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message:"Please enter a valid email address"}).required('Please enter an email'),
      city: Yup.string().required('Option is required').oneOf(cityOptions, 'Invalid option'),
    }),
    onSubmit: (values,{resetForm}) => {
      setbtnLoading(true);
      axios.put(`${import.meta.env.VITE_APP_API_URL}/api/users/profile/${id}`,{...values, photo: previewURL})
        .then(response => {
          if (response.data) {
            if(response.status === 200) {
              resetForm();
            setbtnLoading(false);
              setinformation(true)
            }else{
              alert("somthing went wrong please try  later")
            }
            console.log(response.data)
          } else {
            console.log('this is an error')
          }
        })
    }
  })
  
  useEffect(() => {
    formik.setValues({
      f_name: userdata.f_name || '',
      l_name: userdata.l_name || '',
      email: userdata.email || '',
      city: userdata.city || '',
      photo: userdata.photo || '',
    });
  }, [userdata]);
  

  const handlePhotoChange = (event) => {
    const file = event.target.files[0];
    // setSelectedPhoto(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
    formik.setFieldValue('photo', file);
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
      // setDataURL(reader.result);
    };
    reader.readAsDataURL(file);
  };




  return (
<div className="flex justify-between max-lga:flex-col max-lga:items-center max-lga:justify-center">
      {isLoading && <Spinners />}
      {
        message &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
      <div className="flex flex-col justify-center text-center w-1/4  gap-4 h-72 mt-5  max-lga:w-full max-lga:items-center">
    <h1 className='mb-2 font-medium text-[18px]'>Modifier your profile picture</h1>
      <div className="flex flex-col justify-center   gap-4 ">
        <div className="w-52 h-52 bg-[#F9F9F9] flex justify-center items-center rounded-full object-cover">
        {previewURL === null && <FaUser className="text-[#054DEC] text-[70px]"></FaUser>} 
            
            {previewURL && (
                <img src={previewURL} alt="Preview" style={{ maxWidth: '200px' }} className="w-full h-full rounded-full object-cover" />
              )}
      </div>
      <label  htmlFor='inputTag' className='cursor-pointer bg-[#054DEC] text-white w-36 text-center py-4 px-2 rounded-xl mx-auto'>
        + change
      <input id="inputTag" type="file" accept="image/*" onChange={handleFileChange} className='hidden' />
      </label>
      {formik.errors.picture && formik.touched.picture && <p className="text-red-700">{formik.errors.picture}</p>}
    </div>
    </div>
    <form className="w-[70%] text-start max-lga:w-full" onSubmit={formik.handleSubmit}>
    <div>
    <h1 className='text-[#000000] text-[28px] underline mb-4 font-bold text-start  max-400px:text-[18px]'>Personal information</h1>
      <div className='w-full flex gap-2 max-400px:flex-col'>
    <Inputwraper className='w-1/2  max-400px:w-full'>
      <label htmlFor="">First name</label>
      <Input type='text' placeholder='First name'  name='f_name' onChange={formik.handleChange} value={formik.values.f_name} onBlur={formik.handleBlur} className={`${formik.errors.f_name && formik.touched.f_name?'border-red-600':''}`}></Input>
      {formik.errors.f_name && formik.touched.f_name && <p className="text-red-700">{formik.errors.f_name}</p>}
      </Inputwraper>
    <Inputwraper className='w-1/2  max-400px:w-full'>
      <label htmlFor="">last name</label>
      <Input type='text' placeholder='Last Name' name='l_name' onChange={formik.handleChange} value={formik.values.l_name} onBlur={formik.handleBlur} className={`${formik.errors.l_name && formik.touched.l_name?'border-red-600':''}`}></Input>
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
          <select  name='city' onChange={formik.handleChange}  value={formik.values.city} onBlur={formik.handleBlur} className={`bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3 outline-none ${formik.errors.city && formik.touched.city?'border-red-600':''}`}>
          <option value="">Select a city</option>
            {cityOptions.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
          </select>
        {formik.errors.city && formik.touched.city && <p className="text-red-700">{formik.errors.city}</p>}
      </Inputwraper>
        </div>
        <a href="/" className="underline text-[18px] font-semibold flex gap-2 items-center"><LockIcon></LockIcon><Link to='/Profil-user/modifierpassword'>Change Password</Link></a>
        <div className="w-full text-right mt-5  max-lga:text-center max-lga:flex-col">
      <Link to='/Profil-user'> <Button  className='bg-[#F9F9F9] text-[#054DEC] rounded-xl mt-4 mx-3'>Cancel</Button></Link>
      {!btnLoading &&  <Submit value='Save' type='submit'  className={`text-white bg-[#054DEC] rounded-xl mt-4 mx-3`}></Submit>  }
      {btnLoading && <BtnLoading></BtnLoading>}
      </div>
    </form>
    </div>
  )
}
