import { Outlet } from "react-router-dom"
import { Button } from "../UI/button"
import { NavLink,useLocation } from "react-router-dom"
import { useState,useEffect  } from "react";
import MessageComp from "../UI/MessageComp";











export default function Creatpost() {
    const [isEvent, setisEvent] = useState(true);
    const [message, setMessage] = useState(false)


    useEffect(() => {
      const id = localStorage.getItem("idOrg");
      if(id){
        setMessage(false)
      }else{
        setMessage(true)
      }
    },[])


    const location = useLocation();
    useEffect(() => {
      if(location.pathname === '/Profil-org/creatpost'){
        setisEvent(true)
      }
      if(location.pathname === '/Profil-org/creatpost/donation'){
        setisEvent(false)
      }

    }, [location]);
    function Changestyle(){
      if(isEvent == false){
        setisEvent(true);
      }else{
        setisEvent(false);
      }
    }
    function DeleteMessage(){
      window.location.href='/'
    }
  return (
    <>
          <h1 className='text-[#000000] text-[28px] underline mb-12 font-bold'>Create post</h1>
          {
        message &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
    <div className="w-[80%] mx-auto" >
          <div className="flex flex-col gap-3">
            <h1 className="text-[20px] font-semibold">post type:</h1>
            <div className="flex gap-4 max-600px:flex-col max-600px:items-center">
                <NavLink to='/Profil-org/creatpost'><Button onClick={Changestyle} className={`bg-[#F9F9F9] text-[#054DEC] rounded-xl ${isEvent?'btn-active':''}`} >Event</Button></NavLink>
                <NavLink to='/Profil-org/creatpost/donation'><Button onClick={Changestyle} className={`bg-[#F9F9F9] text-[#054DEC] rounded-xl ${!isEvent?'btn-active':''}`}>Donation</Button></NavLink>
            </div>
          </div>
          {<Outlet></Outlet>}
    </div>    
    </>
  )
}
