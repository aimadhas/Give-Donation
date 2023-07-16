import React , { useState,useEffect } from 'react'
import AddLocationIcon from '@mui/icons-material/AddLocation';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import ScheduleSendIcon from '@mui/icons-material/ScheduleSend';
import axios from 'axios';
import Spinners from './UI/Spinner';
import MessageComp from './UI/MessageComp';
import image1 from '../assets/1.png'
import { Button } from './UI/button';
import Input from './UI/input';
import Inputwraper from './UI/inputwraper'
import { BtnLoading } from "./UI/button";

export default function DonationApply() {
    const [isLoading, setIsLoading] = useState(false);
    const [dataorg, setdataorg] = useState({});
    const [datapost, setdatapost] = useState({});
    const [message, setMessage] = useState(false)
    const [userid, setcheck] = useState(false)
    const [btnLoading, setbtnLoading] = useState(false);
    const [day,setday] = useState(0)
    const [month,setmounth] = useState(0)
    const [year,setyear] = useState(0)
    const [amount, setAmount] = useState()
    const [messagerrore, setmessagerrore] = useState(false)



    const data = JSON.parse(localStorage.getItem('postdata'));
     const iduser = localStorage.getItem('idUser');

     function donate() {
      if(amount === '' || amount === undefined){
        setmessagerrore(true)
      }else{
        setmessagerrore(false)
        setbtnLoading(true);
        const Token = localStorage.getItem('tokenUser');
        const data = {
          user:iduser,
          donationId: datapost._id,
          amount: +amount, 
        };
  
         axios.post(`${import.meta.env.VITE_APP_API_URL}/api/donations/donate`, data, {
          headers: {
            'Authorization': `Bearer ${Token}` 
          }
        })
        .then(response => {
          setbtnLoading(false);
          console.log(response)
          window.location.href = response.data.sessionUrl
        })
        .catch(error => {
          setbtnLoading(false);
        });
      }
    }











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
          .get(`${import.meta.env.VITE_APP_API_URL}/api/donations/donation/${id}`)
          .then(function (response) {
            setdatapost(response.data); 
            setIsLoading(false);
  
          })
          .catch(function (res) {
            setIsLoading(false);
  
          });
    }
  }, []);



useEffect(()=>{
  const date = new Date(datapost.date)
  const day = date.getDate()  // 15
  const month = date.getMonth() + 1  // 07 
  const year = date.getFullYear()  // 2023
  setday(day)
  setmounth(month)
  setyear(year)
})

function AnnulerApply(){
  setMessage(false)
}


  return (
    <>
    
    
    
    {isLoading && <Spinners />}
    {message && (
  <MessageComp>
      <>
        <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
        <p className='font-bold text-2xl text-center uppercase my-4'>Please specify the amount that you want to donate to this organisation</p>
      <Inputwraper>
        <Input type='number' value={amount} onChange={(e) => setAmount(e.target.value)}></Input>
      {messagerrore && <p className='text-red-600'>Please fill out this field</p>}
      </Inputwraper>
        <div className='flex items-center justify-center gap-3 my-4 max-[700px]:flex-col'>
          {!btnLoading && <Button className='bg-[#054DEC] text-white' onClick={donate}>confirm</Button>
          }
          {btnLoading && <BtnLoading></BtnLoading> }
          <Button className='bg-[#E47070] text-white' onClick={AnnulerApply}>cancel</Button>
        </div>
      </>
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
          <h1 className='text-2xl  font-semibold uppercase'>{datapost.titreDonation}</h1>
        </div>

      <div className='flex justify-center max-[1000px]:w-[100%]'>
        <img className='w-full my-[40px] rounded-2xl ' src={`${datapost.DonationImage}`} alt="Donation image" />
      </div>
        
        
        <div  className='w-full flex justify-between max-[900px]:flex-col'>
          <div className='max-[900px]:w-full'>
            <h1 className='text-xl font-bold mb-5'>About us</h1>
            <p className='mb-5 w-[70%] text-gray-500 max-[900px]:w-full'>{dataorg.Descripion}</p>

            <h1 className='text-xl font-bold mb-5 capitalize'>what we want from you</h1>
            <p className='w-[70%] text-gray-500 max-[900px]:w-full'>{datapost.description}</p>
            <div className='lg:mt-[70px] my-5'>
          {userid &&   <Button  className='bg-[#054DEC] text-white px-5' onClick={()=>{setMessage(true)}}>Donate</Button>}
            </div>
          </div>
          <div className='flex flex-col justify-between my-5  '>
            <div className='flex items-center bg-gray-100 p-[30px] rounded-xl mb-5 cursor-pointer min-[1000px]:w-[300px]'>
              <div className='me-5 '>
                <AccessTimeFilledIcon/>
              </div>
              <div>
                <h1 className='text-xl font-bold '>Amount require</h1>
                <p className='font-normal text-xl'>{datapost.GoalAmount} DH</p>
              </div>
            </div>
            <div className='flex items-center bg-gray-100 p-[30px] rounded-xl mb-5 cursor-pointer'>
              <div className='me-5 '>
                <AddLocationIcon/>
              </div>
              <div>
                <h1 className='text-xl font-bold '>the current Amount</h1>
                <p className='font-normal text-xl'>{datapost.iniAmount} DH</p>
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
  )
}
