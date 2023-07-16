import Input from '../UI/input'
import Inputwraper from '../UI/inputwraper'
import { Button,Submit } from '../UI/button'
import { Link } from 'react-router-dom'
import {Formik, useFormik} from 'formik'
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import axios from "axios";
import { AppContext } from '../ProfilUser/APPcontext';
import { useContext } from "react";
import { BtnLoading } from '../UI/button';
import MessageComp from "../UI/MessageComp";




export default function MdfpasswordOrg() {
  const {setpassword} = useContext(AppContext)
  const [id,setId] = useState();
  const [btnLoading, setbtnLoading] = useState(false);
  const [message,setmessage] = useState(null);

  useEffect(() => {
    const id = localStorage.getItem("idOrg");
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/organisation/profile/${id}`)
        .then(function (response) {
          setId(id)
        })
        .catch(function (res) {
          console.log(res);
        });
    }else{
      setmessage(true);
    }
  }, []);
  
  function DeleteMessage(){
    window.location.href='/'
  }





  const formik = useFormik({
    initialValues:{
      password:'',
      confirmpassword:'',
    },
    validationSchema:Yup.object().shape({
      password:Yup.string().min(8).max(20).matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).{8,}$/,{message:"Your password should have at least 8 characters, including one uppercase letter, one number, and one special character"}).required('please enter a password'),
      confirmpassword:Yup.string().matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()\-=_+{};':"\\|,.<>/?]).{8,}$/,{message:"Your password should have at least 8 characters, including one uppercase letter, one number, and one special character"}).required('please enter a password').oneOf([Yup.ref("password"),null]),
    }),
    onSubmit: (values, { resetForm }) => {
      setbtnLoading(true);
      axios.put(`${import.meta.env.VITE_APP_API_URL}/api/organisation/profile/${id}`,values)
      .then(response => {
        if (response.data) {
          if(response.status === 200) {
            resetForm();
            setpassword(true)
            setbtnLoading(false)
          }else{
            alert("somthing went wrong please try  later")
          }
        } else {
          console.log('this is an error')
        }
      })
    }
  })
  return (
      <form className='w-3/4  mx-auto max-lga:w-full'onSubmit={formik.handleSubmit}>
         {
        message &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
    <h1 className='text-[#000000] text-[28px] underline mb-12 font-bold max-400px:text-[18px]'>Changing  password</h1>
    <Inputwraper>
      <label htmlFor="">Actual Password</label>
      <Input type='password' placeholder='****************' name='password' onChange={formik.handleChange}  value={formik.values.password} onBlur={formik.handleBlur} className={`${formik.errors.password && formik.touched.password?'border-red-600':''}`}></Input>
      {formik.errors.password && formik.touched.password && <p className="text-red-700">{formik.errors.password}</p>}
      </Inputwraper>
    <Inputwraper>
      <label htmlFor="">New Password</label>
      <Input type='password' placeholder='****************' name='confirmpassword'  value={formik.values.confirmpassword} onChange={formik.handleChange} onBlur={formik.handleBlur} className={`${formik.errors.confirmpassword && formik.touched.confirmpassword?'border-red-600':''}`} ></Input> 
      {formik.errors.confirmpassword && formik.touched.confirmpassword && <p className="text-red-700">{formik.errors.confirmpassword}</p>}
      </Inputwraper>
      <div className="w-full text-right mt-5 max-lga:text-center max-lga:flex-col ">
      <Link to='/Profil-org/modifierinforg'> <Button  className='bg-[#F9F9F9] text-[#054DEC] rounded-xl mt-4 mx-3'>Cancel</Button></Link>
      {!btnLoading &&  <Submit value='Save' type='submit'  className='text-white bg-[#054DEC] rounded-xl mt-4 mx-3'></Submit> }
      {btnLoading &&  <BtnLoading></BtnLoading>}
      </div>
    </form>
  )
}
