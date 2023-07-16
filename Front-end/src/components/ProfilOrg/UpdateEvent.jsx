import React from 'react'
import Input from '../UI/input';
import Inputwraper from '../UI/inputwraper';
import { Submit } from '../UI/button';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { useEffect ,useState } from 'react';
import { BtnLoading } from "../UI/button";
import Spinners from '../UI/Spinner';
import { AppContext } from '../ProfilUser/APPcontext';
import { useContext } from "react";
import { Button } from '../UI/button';
import MessageComp from '../UI/MessageComp';

export default function UpdateEvent() {
  const {seteventupdate} = useContext(AppContext)
    const [previewURL, setPreviewURL] = useState(null);
    const [btnLoading, setbtnLoading] = useState(false);
    const [message, setMessage] = useState(false);
    const [message2, setMessage2] = useState(false);
    const [isLoading, setIsLoading] = useState(true);
    const [data, setData] = useState('')
    const [idevent, setidevent] = useState('')


    useEffect(() => {
      const eventId = localStorage.getItem("eventId");
      if (eventId) {
          axios
            .get(`${import.meta.env.VITE_APP_API_URL}/api/events/${eventId}`)
            .then(function (response) {
              setPreviewURL(response.data.eventImage); 
              setData(response.data)
              setidevent(eventId)
              setIsLoading(false);
    
            })
            .catch(function (res) {
              console.log(res);
              setIsLoading(false);
    
            });
          }else{
            setIsLoading(false);
           setMessage2(true);
          }
      }, []);



      function DeleteMessage(){
        window.location.href='/'
      }

  const initialValues = {
    titreEvnt: '',
    date: '',
    heure: '',
    lieu: '',
    description: '',
    eventImage: previewURL,
  };

  const validationSchema = Yup.object({
    titreEvnt: Yup.string()
      .min(4)
      .max(50)
      .required('Event name is required')
      .matches(/^\S.*$/, 'cannot start with whitespace'),
    date: Yup.string().required('Date is required'),
    heure: Yup.string()
      .required('heure is required')
      .matches(
        /^(0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$/,
        'Invalid heure format (HH:MM)'
      ),
    lieu: Yup.string()
      .required('lieu is required')
      .matches(/^\S.*$/, 'cannot start with whitespace'),
    description: Yup.string()
      .required('Description is required')
      .min(
        10,
        'Please give us more details about your organisation'
      )
      .max(1000, 'Description must be less than 500 characters')
      .matches(/^\S.*$/, 'cannot start with whitespace'),
  });

  const onSubmit = (values,{resetForm}) => {
    if(previewURL === null){
      setMessage(true)
      return
    }
    setbtnLoading(true)
    axios.put(`${import.meta.env.VITE_APP_API_URL}/api/events/update/${idevent}`, {...values,eventImage:previewURL})
      .then((response) => {
        if (response.data) {
          resetForm();
          setbtnLoading(false)
          seteventupdate(true);
        }
      })
      .catch((error) => {
        setbtnLoading(false)
        console.log(error);
        console.log('Error: Unable to update organization profile');
      });
  };

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit,
  });
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    // setSelectedFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      setPreviewURL(reader.result);
    };
    reader.readAsDataURL(file);
  };

  
  
  useEffect(() => {
    formik.setValues({
      titreEvnt: data.titreEvnt || '',
      date: data.date || '',
      heure: data.heure || '',
      lieu: data.lieu || '',
      description: data.description || '',
      eventImage: previewURL || '',
    });
  }, [previewURL]);




  return (
<form className='py-11' onSubmit={formik.handleSubmit}>
{isLoading && <Spinners />}
{
        message2 &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
    <h1 className='text-4xl underline mb-6'>Update event</h1>
      <Inputwraper>
        <label htmlFor='' className='text12'>
          Events name
        </label>
        <Input
          type='text'
          placeholder='Name'
          name='titreEvnt'
          onChange={formik.handleChange}
          value={formik.values.titreEvnt}
          onBlur={formik.handleBlur}
          className={`${
            formik.errors.titreEvnt && formik.touched.titreEvnt
              ? 'border-red-600'
              : ''
          }`}
        />
        {formik.errors.titreEvnt && formik.touched.titreEvnt && (
          <p className='text-red-700'>{formik.errors.titreEvnt}</p>
        )}
      </Inputwraper>
      <Inputwraper>
        <label htmlFor='' className='text12'>
          Date
        </label>
        <Input
          type='date'
          placeholder='Date'
          name='date'
          onChange={formik.handleChange}
          value={formik.values.date}
          onBlur={formik.handleBlur}
          className={`${
            formik.errors.date && formik.touched.date
              ? 'border-red-600'
              : ''
          }`}
        />
        {formik.errors.date && formik.touched.date && (
          <p className='text-red-700'>{formik.errors.date}</p>
        )}
      </Inputwraper>
      <Inputwraper>
        <label htmlFor='' className='text12'>
          heure
        </label>
        <Input
          type="time"
          placeholder='heure'
          name='heure'
          onChange={formik.handleChange}
          value={formik.values.heure}
          onBlur={formik.handleBlur}
          className={`${
            formik.errors.heure && formik.touched.heure
              ? 'border-red-600'
              : ''
          }`}
        />
        {formik.errors.heure && formik.touched.heure && (
          <p className='text-red-700'>{formik.errors.heure}</p>
        )}
      </Inputwraper>
      <Inputwraper>
        <label htmlFor='' className='text12'>
          lieu
        </label>
        <Input
          type='text'
          placeholder='lieu'
          name='lieu'
          onChange={formik.handleChange}
          value={formik.values.lieu}
          onBlur={formik.handleBlur}
          className={`${
            formik.errors.lieu && formik.touched.lieu
              ? 'border-red-600'
              : ''
          }`}
        />
        {formik.errors.lieu && formik.touched.lieu && (
          <p className='text-red-700'>{formik.errors.lieu}</p>
        )}
      </Inputwraper>
      <Inputwraper>
        <label htmlFor='' className='text12'>
          Descripion
        </label>
        <textarea
          id=''
          cols='30'
          rows='10'
          name='description'
          onChange={formik.handleChange}
          value={formik.values.description}
          onBlur={formik.handleBlur}
          className={`outline-none bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3${
            formik.errors.description && formik.touched.description
              ? 'border-red-600'
              : ''
          }`}
          placeholder='what is ur organisation goals for example'
        ></textarea>
        {formik.errors.description && formik.touched.description && (
          <p className='text-red-700'>{formik.errors.description}</p>
        )}
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
