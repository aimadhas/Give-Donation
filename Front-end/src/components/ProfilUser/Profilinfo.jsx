import Input from "../UI/input"
import Inputwraper from "../UI/inputwraper"
import { Button } from "../UI/button"
import { Link } from "react-router-dom"
import { FaUser } from "react-icons/fa";
import { useEffect } from "react";
import { useState } from "react"
import axios from 'axios'
import { AppContext } from "./APPcontext";
import { useContext } from "react";
import Spinners from "../UI/Spinner";
import MessageComp from "../UI/MessageComp";

export default function Profilinfo() {
  const {setId,userdata,setUserData} = useContext(AppContext)
  const [isLoading, setIsLoading] = useState(true);
  const [previewURL, setPreviewURL] = useState(null);
  const [message, setmessage] = useState(false);



  useEffect(() => {
    const id = localStorage.getItem('idUser')
    if (id) {
      setId(id)
      axios.get(`${import.meta.env.VITE_APP_API_URL}/api/users/profile/${id}`)
        .then(function (response) {
          setUserData(response.data)
          setPreviewURL(response.data.photo);
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

  return (
    <div className="flex justify-between gap-10 max-lga:flex-col max-lga:items-center max-lga:justify-center">
      {
        message &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
       {isLoading && <Spinners />}
      <div className="flex flex-col justify-center w-1/4 gap-4 h-72 max-1024px:h-64 max-lga:w-full">
      <div className="flex flex-col justify-center text-center w-1/4  gap-4 h-72 max-1024px:h-64 max-lga:w-full">
        <div className="w-52 h-52 bg-[#F9F9F9] rounded-[50%] flex justify-center items-center  mx-auto">
         { previewURL  &&   <img src={userdata.photo} alt="Organization logo" className="w-full h-full object-cover rounded-full" />}
          {previewURL === null || previewURL === undefined && <FaUser className="text-[#054DEC] text-[70px]"></FaUser>} 
        </div>
      </div>
        {/* <div className="w-52 h-52 bg-[#F9F9F9] rounded-[50%] flex justify-center items-center mx-auto">
          <FaUser className="text-[#054DEC] text-[70px]" />
        </div> */}
      </div>
      <div className="w-[70%] text-start max-lga:w-full">
        <div>
          <h1 className='text-[#000000] text-[28px] underline mb-4 font-bold text-start max-400px:text-[18px]'>Personal information</h1>
          <div className='w-full flex gap-2 max-400px:flex-col'>
            <Inputwraper className='w-1/2 max-400px:w-full'>
              <label htmlFor="">First name</label>
              <Input type='text' placeholder='username' value={userdata.f_name} className='invalid-input' />
            </Inputwraper>
            <Inputwraper className='w-1/2 max-400px:w-full'>
              <label htmlFor="">last name</label>
              <Input type='text' placeholder='username' value={userdata.l_name} className='invalid-input' />
            </Inputwraper>
          </div>
          <Inputwraper>
            <label htmlFor="">Email</label>
            <Input type='email' placeholder='user@gmail.com' value={userdata.email} className='invalid-input' />
          </Inputwraper>
          <Inputwraper>
            <label htmlFor="">City</label>
            <Input type='text' placeholder='City' value={userdata.city} className='invalid-input' />
          </Inputwraper>
        </div>
        <div className="w-full text-right mt-5">
          <Link to='/Profil-user/modifierinfo'>
          <Button className='text-white bg-[#054DEC] rounded-xl mt-4'>  Edit </Button>
          </Link>
        </div>
      </div>
    </div>
  )
}