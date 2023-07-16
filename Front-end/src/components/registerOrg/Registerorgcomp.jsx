import React, { useContext, useState } from 'react'
import Box from '@mui/material/Box';
import { Link } from 'react-router-dom';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Card from '../UI/Card';
import Firststep from './Firststep';
import Secoundstep from './Secoundstep';
import Thirdstep from './Thirdstep';
import { Button,Submit } from '../UI/button'
import {Formik, useFormik,Field} from 'formik';
import * as Yup from 'yup';
import { FaUsers } from "react-icons/fa";
import axios from 'axios'
import { BtnLoading } from '../UI/button';




export default function Registerorgcomp() {
  const [currentstep,setstep] = useState(0)
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewURL, setPreviewURL] = useState(null);
  const [dataURL, setDataURL] = useState(null);
  const [ErrorMessage,setmessage] =useState(false)
  const cityOptions = ["Tanger-Tétouan-Al Hoceïma","L'Oriental","Fès-Meknès","Rabat-Salé-Kénitra","Béni Mellal-Khénifra",'Marrakech-Safi',"Drâa-Tafilalet","Souss-Massa","Guelmim-Oued Noun","Laâyoune-Sakia El Hamra","Dakhla-Oued Ed Dahab"]
  const [btnLoading, setbtnLoading] = useState(false);




const onSubmit = (values,action)=>{
  if(previewURL === null){
    setmessage(true);
    return
  }else{
    setstep(1);
  }
    if(currentstep ==  1){
    setbtnLoading(true);
      axios.post(`${import.meta.env.VITE_APP_API_URL}/api/organisation/register`,{
        org_name: values.org_name,
                email: values.email,
                password: values.password,
                city: values.city,
                address: values.address,
                Type: values.Type,
                Descripion: values.Descripion,
                picture: previewURL,
      }).then(function(response){
          setbtnLoading(false);
          setstep(2);
        }).catch(function(res){
          console.log(res);
        })
    }
}


const validationSchema1 = [
  Yup.object().shape({
    // Validation schema for the first step
    org_name: Yup.string().required('Please entre first Name').min(4, 'Too Short!').max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace'),
    email: Yup.string().email('Invalid email').matches(/^[^\s@]+@[^\s@]+\.[^\s@]+$/,{message:"Please enter a valid email address"}),
    password:Yup.string().min(8).max(20).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).{8,}$/,{message:"Your password should have at least 8 characters, including one uppercase letter, one number, and one special character"}).required('please enter a password'),
    confirmPassword:Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).{8,}$/,{message:"Your password should have at least 8 characters, including one uppercase letter, one number, and one special character"}).required('please enter a password').oneOf([Yup.ref("password"),null]),
  }),
  Yup.object().shape({
    city: Yup.string().required('Option is required').oneOf(cityOptions, 'Invalid option'),
    address: Yup.string().required('Please entre your address').matches(/^\S.*$/, 'cannot start with whitespace'),
    Type: Yup.string().required('Please entre the Type of your organisation').min(2, 'Too Short!').max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace'),
    Descripion: Yup.string().required('Description is required').min(10,'Please give us more details about your organisation').max(1000, 'Description must be less than 500 characters').matches(/^\S.*$/, 'cannot start with whitespace'),
  }),
];


const formik = useFormik({
  initialValues:{
    org_name:'',
    email:'',
    password:'',
    confirmPassword:'',
    picture: previewURL,
    city:'',
    address:'',
    Type:'',
    Descripion:'',
  },
  validationSchema:validationSchema1[currentstep],
  onSubmit
})


const handleFileChange = (event) => {
  const file = event.target.files[0];
  setSelectedFile(file);
  const reader = new FileReader();
  reader.onload = () => {
    setPreviewURL(reader.result);
    setmessage(false)
    setDataURL(reader.result);
  };
  reader.readAsDataURL(file);
};

  return (
    <Card className='my-8 mx-auto w-3/4 max-1024px:w-[90%]'>
    <div className='flex items-center justify-between max-600px:flex-col max-600px:gap-4 max-600px:w-full'>
    <h1 className='font-semibold text-4xl text-Montserrat max-600px:text-2xl'>Register</h1>
    <Box sx={{ width: '80%' }}>
      <Stepper activeStep={currentstep} alternativeLabel>
       <Step>
        <StepLabel></StepLabel>
       </Step>
       <Step>
        <StepLabel></StepLabel>
       </Step>
       <Step>
        <StepLabel></StepLabel>
       </Step>
      </Stepper>
    </Box>
    </div>
    <form onSubmit={formik.handleSubmit}>
    { currentstep === 0 && 
   <div className='flex justify-between my-8 max-lga:flex-col-reverse max-lga:justify-center max-lga:items-center max-lga:gap-10'>
      <Firststep data={formik}></Firststep>
        <div className="flex flex-col justify-center text-center w-1/4  gap-4 h-72 mt-5  max-lga:w-full max-lga:items-center">
    <h1 className='mb-2 font-medium text-[18px]'>Add your profile picture</h1>
      <div className="flex flex-col justify-center   gap-4 ">
        <div className="w-52 h-52 bg-[#F9F9F9] flex justify-center items-center rounded-full object-cover">
        {previewURL === null && <FaUsers className="text-[#054DEC] text-[70px]"></FaUsers>} 
            
            {previewURL && (
                <img src={previewURL} alt="Preview" style={{ maxWidth: '200px' }} className="w-full h-full rounded-full object-cover" />
              )}
      </div>
      <label  htmlFor='inputTag' className='cursor-pointer bg-[#054DEC] text-white w-36 text-center py-4 px-2 rounded-xl mx-auto'>
        + change
      <input id="inputTag" type="file" accept="image/*" onChange={handleFileChange} className='hidden' />
      </label>
      {ErrorMessage && <p className="text-red-700">picture is required</p>}
    </div>
    </div>
    </div>
    
}
    { currentstep === 1 && <Secoundstep  data={formik} citylist={cityOptions}/>}
    { currentstep === 2 && <Thirdstep />}
    <div className="flex justify-center  items-center gap-6 max-600px:flex-col-reverse">
            {currentstep > 0 && currentstep < 2  &&(
              <Button  className='bg-[#F9F9F9] text-[#054DEC]' type="button" onClick={() => setstep(currentstep - 1)}>
                Back
              </Button>
            )}
          {currentstep < 2 ? (
            !btnLoading ? (
              <Button type="submit" className='bg-[#054DEC] text-white'>Next</Button>
            ) : (
             <BtnLoading></BtnLoading>
            )
          ) : null}
          </div>
    </form>
    </Card>
  )
}
