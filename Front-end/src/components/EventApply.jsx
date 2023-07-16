import React , { useState,useEffect } from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import axios from 'axios';
import Spinners from './UI/Spinner';
import MessageComp from './UI/MessageComp';
import question from '../assets/question.png'
import image1 from '../assets/1.png'
import { Button } from './UI/button';
import { BtnLoading } from "./UI/button";









const EventApply = () => {

  const [isLoading, setIsLoading] = useState(false);
  const [dataorg, setdataorg] = useState({});
  const [datapost, setdatapost] = useState({});
  const [message, setMessage] = useState(false)
  const [confirmed, setconfirmed] = useState(false)
  const [userid, setcheck] = useState(false)
  const [btnLoading, setbtnLoading] = useState(false);
  const [day,setday] = useState(0)
  const [month,setmounth] = useState(0)
  const [year,setyear] = useState(0)


  const data = JSON.parse(localStorage.getItem('postdata'));
  const iduser = localStorage.getItem('idUser');


  useEffect(() => {
    if(iduser){
      setcheck(true);
    }
  },[])

  useEffect(() => {
    const id = data.org
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/organisation/profile/${id}`)
        .then(function (response) {

          setdataorg(response.data); 

        })
        .catch(function (res) {
          setIsLoading(false);
        });
    }
  }, []);

  useEffect(() => {
    const id = data.id
    setIsLoading(true);
    if (id) {
        axios
          .get(`${import.meta.env.VITE_APP_API_URL}/api/events/${id}`)
          .then(function (response) {
            setdatapost(response.data); 
            setIsLoading(false);
  
          })
          .catch(function (res) {
            setIsLoading(false);
  
          });
    }
  }, []);


  function ApplyEvent(){
    setMessage(true)
  }

function AnnulerApply(){
  setMessage(false)
}
function DoneApply(){
  setMessage(false)
  location.href ='/Opportunities'
  localStorage.removeItem('postdata')
}


function ConfiermApply(){
  setbtnLoading(true);
  const Token = localStorage.getItem('tokenUser');
  const data = {
    user: `${iduser}`,   
    event: `${datapost._id}`  
  };
  axios.post(`${import.meta.env.VITE_APP_API_URL}/api/events/${datapost._id}/favorite`, data, {
    headers: {
      'Authorization': `Bearer ${Token}` 
    }
  })
  .then(response => {
    setbtnLoading(false);
    setconfirmed(true)
  })
  .catch(error => {
    console.error(error);
  });
}


useEffect(()=>{
  const date = new Date(datapost.date)
  const day = date.getDate()  // 15
  const month = date.getMonth() + 1  // 07 
  const year = date.getFullYear()  // 2023
  setday(day)
  setmounth(month)
  setyear(year)


})



  return (
    <>
    {isLoading && <Spinners />}
    {message && (
  <MessageComp>
    {!confirmed && (
      <>
        <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={question} alt="" />
      </div>
      </div>
        <p className='font-bold text-2xl text-center uppercase my-4'>are you sure you want to participate in this event? </p>
        <div className='flex items-center justify-center gap-3 my-4 max-[700px]:flex-col'>
          {!btnLoading && <Button className='bg-[#054DEC] text-white' onClick={ConfiermApply}>confirm</Button>
          }
          {btnLoading && <BtnLoading></BtnLoading> }
          <Button className='bg-[#E47070] text-white' onClick={AnnulerApply}>cancel</Button>
        </div>
      </>
    )}
    {confirmed && (
      <>
      <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
        <p className='font-medium text-xl text-center uppercase my-5'>Thank you for your participation. You will find this event in the Applied page in your profile.</p>
        <div className='w-full text-right'>
        <Button className='bg-[#054DEC] text-white' onClick={DoneApply}>Done</Button>
        </div>
      </>
    )}
  </MessageComp>
)}
    {!isLoading &&
    <div className='px-28 py-3 mt-5 max-[900px]:px-10'>

        <div  className='flex justify-start items-center gap-5'>
          <div className='w-14 h-14 rounded-[50%] flex justify-center items-center'>
          <img className='w-full h-full object-cover rounded-full' src={`${dataorg.picture}`} alt="" />
          </div>
          <h1 className='text-2xl font-bold uppercase'>{dataorg.org_name}</h1>
        </div>

        <div  className='flex justify-between items-center mt-5'>
          <h1 className='text-2xl  font-semibold uppercase'>{datapost.titreEvnt}</h1>
        </div>

      <div className='flex justify-center max-[1000px]:w-[100%]'>
        <img className='w-full my-[40px] rounded-2xl ' src={`${datapost.eventImage}`} alt="Event_img" />
      </div>
        
        
        <div  className='w-full flex justify-between max-[900px]:flex-col'>
          <div className='max-[900px]:w-full'>
            <h1 className='text-xl font-bold mb-5'>About us</h1>
            <p className='mb-5 w-[70%] text-gray-500 max-[900px]:w-full'>{dataorg.Descripion}</p>

            <h1 className='text-xl font-bold mb-5 capitalize'>what we want from you</h1>
            <p className='w-[70%] text-gray-500 max-[900px]:w-full'>{datapost.description}</p>
            <div className='lg:mt-[70px] my-5'>
              {userid &&   <Button  className='bg-[#054DEC] text-white px-5' onClick={ApplyEvent}>Apply Event</Button>}
            </div>
          </div>
          <div className='flex flex-col justify-between my-5 '>
            <div className='flex items-center bg-gray-100 p-[30px] rounded-xl mb-5 cursor-pointer min-[1000px]:w-[300px]'>
              <div className='me-5 '>
                <AccessTimeFilledIcon/>
              </div>
              <div>
                <h1 className='text-xl font-bold '>location</h1>
                <p className='font-normal text-xl'>{datapost.lieu}</p>
              </div>
            </div>
            <div className='flex items-center bg-gray-100 p-[30px] rounded-xl mb-5 cursor-pointer'>
              <div className='me-5 '>
                <AddLocationIcon/>
              </div>
              <div>
                <h1 className='text-xl font-bold '>heure</h1>
                <p className='font-normal text-xl'>{datapost.heure}</p>
              </div>
            </div>
            <div className='flex items-center bg-gray-100 p-[30px] rounded-xl mb-5 cursor-pointer'>
              <div className='me-5 '>
                <ScheduleSendIcon/>
              </div>
              <div>
                <h1 className='text-xl font-bold '>Deadline</h1>
                <p className='font-normal text-xl'>{day}/{month}/{year}</p>
              </div>
            </div>
          </div>
        </div>
        
    </div>
    }
    </>
  );
};

export default EventApply