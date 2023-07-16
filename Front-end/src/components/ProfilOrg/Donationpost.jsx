import React from 'react'
import Input from '../UI/input'
import Inputwraper from '../UI/inputwraper'
import { Submit } from '../UI/button'
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios'
import { useEffect ,useState } from 'react';
import { BtnLoading } from "../UI/button";
import { AppContext } from '../ProfilUser/APPcontext';
import { useContext } from "react";


export default function Donationpost() {
  const [id, setId] = useState();
  const [previewURL, setPreviewURL] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);
  const [message, setMessage] = useState(false);
  const {setaddevent} = useContext(AppContext)



  useEffect(() => {
    const id = localStorage.getItem("idOrg");
    if (id) {
          setId(id)
    }
  }, []);
  const initialValues = {
    titreDonation: '',
    date: '',
    GoalAmount: '',
    description: '',
  };

  const validationSchema = Yup.object({
    titreDonation: Yup.string().min(4).max(50).required('Event name is required').matches(/^\S.*$/, 'cannot start with whitespace'),
    date: Yup.string().required('Date is required'),
    GoalAmount: Yup.number().required('Amount is required'),
    description: Yup.string().required('Description is required').min(10,'Please give us more details about your organisation').max(1000, 'Description must be less than 500 characters') .matches(/^\S.*$/, 'cannot start with whitespace'),
  });
  const onSubmit = (values, { resetForm }) => {
    if(previewURL === null){
      setMessage(true)
      return
    }
    setbtnLoading(true)
    axios.post(`${import.meta.env.VITE_APP_API_URL}/api/donations/donation`,{
      titreDonation: values.titreDonation,
      description:values.description,
      GoalAmount: values.GoalAmount,
      iniAmount: 0,
       date: values.date,
      org: id,
      DonationImage: previewURL,
    }).then(function(response){
        resetForm();
        // setPreviewURL(null);
        setaddevent(true);
        setbtnLoading(false)
  }).catch(function(res){
    console.log(res);
    setbtnLoading(false)
      })
  };
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };



  return (
    <form className='py-11' onSubmit={formik.handleSubmit}>
    <Inputwraper>
    <label htmlFor="" className='text12'>Donation name</label>
    <Input type="text" placeholder='Name'   name='titreDonation' onChange={formik.handleChange}  value={formik.values.titreDonation} onBlur={formik.handleBlur} className={`${formik.errors.titreDonation && formik.touched.titreDonation?'border-red-600':''}`}></Input>
      {formik.errors.titreDonation && formik.touched.titreDonation && <p className="text-red-700">{formik.errors.titreDonation}</p>}
    </Inputwraper>
    <Inputwraper>
    <label htmlFor="" className='text12'>deadline</label>
    <Input type="date" placeholder='date'   name='date' onChange={formik.handleChange}  value={formik.values.date} onBlur={formik.handleBlur} className={`${formik.errors.date && formik.touched.date?'border-red-600':''}`}></Input>
      {formik.errors.date && formik.touched.date && <p className="text-red-700">{formik.errors.date}</p>}
    </Inputwraper>
    <Inputwraper>
    <label htmlFor="" className='text12'>The goal amount</label>
    <Input type="number" placeholder='Amount'   name='GoalAmount' onChange={formik.handleChange}  value={formik.values.GoalAmount} onBlur={formik.handleBlur} className={`${formik.errors.GoalAmount && formik.touched.GoalAmount?'border-red-600':''}`}></Input>
      {formik.errors.GoalAmount && formik.touched.GoalAmount && <p className="text-red-700">{formik.errors.GoalAmount}</p>}
    </Inputwraper>
    <Inputwraper>
    <label htmlFor=""className='text12'>Descripion</label>
    <textarea  id="" cols="30" rows="10"  name='description' onChange={formik.handleChange}  value={formik.values.description} onBlur={formik.handleBlur} className={`outline-none bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3${formik.errors.description && formik.touched.description?'border-red-600':''}`} placeholder='what is ur organisation goals for example'   ></textarea>
        {formik.errors.description && formik.touched.description && <p className="text-red-700">{formik.errors.description}</p>}
    </Inputwraper>
    <div className="flex flex-col justify-center w-full gap-4 h-96 my-14 rounded-md">
       <div className="w-full h-full bg-[#F9F9F9] rounded-md text-start">
       {previewURL && (
        <img src={previewURL} alt="img of the event"  className="w-full h-full object-cover rounded-md " />
      )}
      </div>
      <label  htmlFor='inputTag' className="cursor-pointer bg-[#054DEC] text-white w-36 text-center py-4 px-2 rounded-xl mx-auto ">
        + change
      <input id="inputTag" type="file" accept="image/*" onChange={handleFileChange} className='hidden' />
      </label>
      {message && <p className="text-red-700">please choose your event image</p>}
    </div>
      <div className='w-full text-right mt-5 '>
        {!btnLoading &&    <Submit
          value='Post'
          type='submit'
          className='text-white bg-[#054DEC] rounded-xl mt-4 mx-3'
        />}
      {btnLoading &&  <BtnLoading></BtnLoading>}
      </div>
</form>
  )
}
