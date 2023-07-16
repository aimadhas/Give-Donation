import Welcom from "./UI/welcom"
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { Link } from 'react-router-dom';
export default function ChoosenLogin() {
  return (
    <section className="w-3/4 flex mx-auto my-32 border-[1px] border-[#eee6e6] max-lga:w-[90%] max-lga:text-[16px] max-mda:flex-col ">
        <Welcom className='text-[#054DEC] bg-[#FFFFFF] max-mda:w-full'>
        <div className='bg-[#054DEC] w-[156px] h-[156px] rounded-[50%] flex justify-center items-center'>
        <FaUser className='text-[#FFFFFF] text-[70px]'></FaUser>
            </div>
         <Link to='/Login' className='text-[#FFFFFF] bg-[#054DEC]  px-16 py-4 font-semibold text-[18px] cursor-pointer rounded-sm  max-sma:text-center max-sma:px-2'> Are you a user ?</Link>
        </Welcom>
        <Welcom className='colors text-white max-mda:w-full'>
        <div className='bg-white w-[156px] h-[156px] rounded-[50%] flex justify-center items-center'>
        <FaUsers className='text-[#4B8DDF] text-[100px]'></FaUsers>
        </div>
         <Link to='/Loginorg' className='text-[#458CE6] bg-[#FFFFFF] px-6 py-4 font-semibold text-[18px] cursor-pointer rounded-sm max-sma:text-center max-sma:px-2 '> Are you an organisation ? </Link>
        </Welcom>
    </section>
  )
}
