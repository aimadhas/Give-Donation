import { useState ,useEffect} from "react";
import Card from '../UI/Card';
import PersonIcon from '@mui/icons-material/Person';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import LoginIcon from '@mui/icons-material/Login';
import { Outlet } from "react-router-dom";
import { NavLink,Link,useLocation } from "react-router-dom"
import APPcontext from "./APPcontext";
import { AppContext } from "./APPcontext";
import { useContext } from "react";

export default function ProfilUserUI() {
  const {password,information,setinformation,setpassword} = useContext(AppContext)
  const [isEditMode, setIsEditMode] = useState(true);
  const path = useLocation()
  useEffect(() => {
    if(path.pathname === '/Profil-user'){
      setIsEditMode(true);
    }else if(path.pathname === '/Profil-user/Favorites'){
      setIsEditMode(false);
    }
  },[path])
  function Changestyle(){
    if(isEditMode == false){
      setIsEditMode(true);
    }else{
      setIsEditMode(false);
    }
  }
  function UserLougout(){
    localStorage.removeItem('User');
    localStorage.removeItem('tokenUser');
    localStorage.removeItem('idUser');
    window.location.href = '/';
  }
 function DeleteMessage(){
  setinformation(false)
  setpassword(false)
  window.location.href = '/Profil-user';
 }


 useEffect(() => {
  if (information || password) {
    const timeoutId = setTimeout(() => {
      DeleteMessage()
    }, 3000);
    return () => {
      clearTimeout(timeoutId);
    };
  }
}, [information, password]);








  return (
    <>
    <Card className='w-3/4 mx-auto my-10 px-10 py-5 flex justify-between items-center max-1024px:w-[90%] max-600px:px-4 max-sma:flex-col max-sma:gap-4'>
     <div className="flex gap-20 items-center max-lga:gap-10 max-600px:gap-4 ">
       <NavLink  to='/Profil-user'
       activeClassName="text-blue-500">
       <a href="" className={`font-semibold text-[18px] flex items-center gap-2 max-400px:text-[12px] ${isEditMode?'text-[#054DEC]':'text-[#8C8C8C]'}`} onClick={Changestyle}><PersonIcon></PersonIcon> Profile</a>
       </NavLink> 
       <NavLink to='/Profil-user/Favorites'>
       <a href="" className={`font-semibold text-[18px] flex items-center gap-2 max-400px:text-[12px] ${!isEditMode?'text-[#054DEC]':'text-[#8C8C8C]'}`}  onClick={Changestyle}><FavoriteBorderIcon></FavoriteBorderIcon> Applied </a>
       </NavLink>
     </div>
     <a href="" className="font-semibold text-[18px] text-red-500  flex items-center gap-2 max-400px:text-[12px]"> <LoginIcon></LoginIcon><Link to='/'onClick={UserLougout}>Log Out
     </Link></a>
   </Card>
   <Card className='w-3/4 mx-auto max-1024px:w-[90%]'>
    <Outlet />
   </Card>
   {
    information &&
    <p className="w-full bg-[#054DEC] mt-6 text-center py-2 text-white font-semibold cursor-pointer fixed bottom-0" onClick={DeleteMessage} >
      Your personal information was successfully updated
      </p>
   }
   {
    password &&
    <p  className="w-full bg-[#054DEC] mt-6 text-center py-2 text-white font-semibold cursor-pointer fixed bottom-0"  onClick={DeleteMessage}>
      Your password was sccessfully updated
      </p>
   }
    </>
  )
}
