import Card from '../UI/Card';
import { useState,useEffect  } from "react";
import { Outlet } from "react-router-dom";
import { NavLink,Link,useLocation } from "react-router-dom"
import LoginIcon from '@mui/icons-material/Login';
import GroupIcon from '@mui/icons-material/Group';
import HistoryIcon from '@mui/icons-material/History';
import AddIcon from '@mui/icons-material/Add';
import MessageComp from '../UI/MessageComp';
import { AppContext } from '../ProfilUser/APPcontext';
import { useContext } from "react";
import { Button } from '../UI/button';
// import image1 from '../assets/1.png'
import image1 from '../../assets/1.png'


export default function ProfilorgUI() {
  const {password,information,setinformation,setpassword,setUserData,eventupdate, seteventupdate,addevent, setaddevent} = useContext(AppContext)
  const [Page2, setPage2] = useState("profile");
  const location = useLocation();
    useEffect(() => {
      if(location.pathname === '/Profil-org'){
        setPage2('profile')
      }
      if(location.pathname === '/Profil-org/historyorg'){
        setPage2('history')
      }
      if(location.pathname === '/Profil-org/creatpost'){
        setPage2('creat')
      }
    }, [location]);

    function UserLougout(){
      localStorage.clear();
      window.location.href = '/';
    }
    function DeleteMessage(){
      setinformation(false)
      setpassword(false)
      window.location.href = '/Profil-org';
     }
    function DeleteMessage2(){
      seteventupdate(false)
      setaddevent(false)
      window.location.href = '/Profil-org/historyorg';
      localStorage.removeItem("eventId");
     }


  return (
    <>
    <Card className='w-3/4 mx-auto my-10 px-10 py-5 flex justify-between items-center max-1024px:w-[90%] max-lga:px-4 max-600px:flex-col max-600px:gap-4'>
     <div className="flex gap-20 items-center max-lga:gap-5 max-sma:flex-col">
       <NavLink  to='/Profil-org'
       activeClassName="text-blue-500">
       <a href="" className={`font-semibold text-[18px] flex items-center gap-2 ${Page2 ==='profile'?'text-[#054DEC]':'text-[#8C8C8C]'}`} onClick={(e)=>{
        setPage2('profile')
       }}> <GroupIcon></GroupIcon> Profile</a>
       </NavLink> 
       <NavLink to='/Profil-org/creatpost'>
       <a href="" className={`font-semibold text-[18px] flex items-center gap-2 ${Page2 === 'creat'?'text-[#054DEC]':'text-[#8C8C8C]'}`}  onClick={(e)=>{
        setPage2('creat')
       }}><AddIcon></AddIcon> Create</a>
       </NavLink>
       <NavLink to='/Profil-org/historyorg'>
       <a href="" className={`font-semibold text-[18px] flex items-center gap-2 ${Page2 ==="history" ?'text-[#054DEC]':'text-[#8C8C8C]'}`}  onClick={(e)=>{
        setPage2('history')
       }}> <HistoryIcon></HistoryIcon> History</a>
       </NavLink>
     </div>
     <button className="font-semibold text-[18px] text-red-500 flex items-center gap-2" onClick={UserLougout}> <LoginIcon></LoginIcon>Log Out</button>
   </Card>
   <Card className='w-3/4 mx-auto max-1024px:w-[90%]'>
    <Outlet />
   </Card>
   {
    information &&
    <MessageComp>
        <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
         <p className='font-medium text-xl text-center uppercase my-5'>Your personal information was successfully updated</p>
        <div className='w-full text-right'>
         <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Done</Button>
          </div>
      </MessageComp>
   }
   {
    password &&
    <MessageComp>
       <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
    <p className='font-medium text-xl text-center uppercase my-5'> Your password was sccessfully updated</p>
    <div className='w-full text-right'>
         <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Done</Button>
          </div>
    </MessageComp>
   }
   {
    eventupdate &&
    <MessageComp>
      <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
    <p className='font-medium text-xl text-center uppercase my-5'> Your Post was successfully updated</p>
    <div className='w-full text-right'>
    <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage2}>Done</Button>
    </div>
    </MessageComp>
   }
   {
    addevent &&
    <MessageComp>
      <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
    <p className='font-medium text-xl text-center uppercase my-5'> Your Post was  poted successfully go to historique to see it</p>
    <div className='w-full text-right'>
    <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage2}>Done</Button>
    </div>
    </MessageComp>
   }
    
    </>
  )
}
