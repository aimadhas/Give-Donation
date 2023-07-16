import { useState } from 'react';
import { BtnLink } from './UI/button'
import { FaUsers } from "react-icons/fa";
import Input from "./UI/input"
import Inputwraper from "./UI/inputwraper"
import Welcom from "./UI/welcom"
import { Submit } from './UI/button';
import { Link } from 'react-router-dom';
import VisibilityIcon from '@mui/icons-material/Visibility';
import VisibilityOffIcon from '@mui/icons-material/VisibilityOff';
import axios from 'axios';
import { BtnLoading } from './UI/button';


export default function Loginorg() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(false);
  const [message, setmessage] = useState('');
  const [hidepassword,showpassword] = useState(true)
  const [btnLoading, setbtnLoading] = useState(false);


  

  function handleSubmit(event) {
    setbtnLoading(true);
    event.preventDefault();
    axios.post(`${import.meta.env.VITE_APP_API_URL}/api/organisation/login`, {
      email,
      password
    })
      .then(response => {
        if (response.data) {
          const { token, _id } = response.data;
          localStorage.setItem('tokenOrg', token);
          localStorage.setItem('idOrg', _id);
          localStorage.setItem('Org', true);
          window.location.href = '/';
           setbtnLoading(false);
        }
      })
      .catch(error => {
        console.error('Error:', error.response.status);
        setError('An error occurred. Please try again later.');
        if(error.response.status === 400){
          setError(true)
          setmessage('invalid email or password')
          setbtnLoading(false);
        }
        if(error.response.status === 500){
        setmessage('you are offline')
        }
      });
  }
  function Deletmessage(){
    setError(false)
  }

  function Password(){
    if(hidepassword === true){
      showpassword(false)
    }else{
      showpassword(true)
    }
  }
  return (
    <>
    {error &&   <p className='bg-red-700 py-2 text-center text-white fixed w-full cursor-pointer' onClick={Deletmessage}>{message}</p> }

    <main className='h-screen flex justify-center items-center'>
      <section className='flex w-3/4 mx-auto h-[450px] items-center text-center max-lga:w-[90%] max-lga:text-[16px]'>
        <form className='w-1/2 bg-[#FCFDFF] px-10 py-7 rounded-sm h-full border-[1px] border-[#CACACA] max-mda:w-full' onSubmit={handleSubmit}>
          <h1 className='text-[#000000] text-[32px] underline mb-4 font-bold'>Log in</h1>
          <div>
            <Inputwraper>
              <label htmlFor="">Email</label>
              <Input type='email' placeholder='user@gmail.com' value={email} onChange={e => setEmail(e.target.value)}></Input>
            </Inputwraper>
            <Inputwraper className='relative'>
              <label htmlFor="">Password</label>
              <Input type={!hidepassword ? 'text' : 'password'} placeholder='Enter your password' value={password} onChange={e => setPassword(e.target.value)}>                
              </Input>
              {hidepassword && <VisibilityIcon className='absolute right-3 top-[55%] cursor-pointer' onClick={Password}></VisibilityIcon>}
              {!hidepassword && <VisibilityOffIcon className='absolute right-3 top-[55%] cursor-pointer' onClick={Password}></VisibilityOffIcon>}
            </Inputwraper>
          </div>
          {!btnLoading &&    <Submit type='submit' value='Log in' className='mt-4'></Submit> }
            {btnLoading &&   <BtnLoading></BtnLoading>}
          <p className="text-[#BEBEBF] mt-3 mda:hidden max-mda:block">Already have an account ? <a href="#" className="text-[#747474]">
            <Link to='/Login'>Log in</Link></a></p>
        </form>
        <Welcom className='colors h-full text-white max-mda:hidden'>
          <div className='bg-white w-[156px] h-[156px] rounded-[50%] flex justify-center items-center'>
            <FaUsers className='text-[#4B8DDF] text-[50px]'></FaUsers>
          </div>
          <p className='font-bold text-xl underline'>Don’t Have An Account ?</p>
          <BtnLink className='text-[#458CE6] bg-[#FFFFFF] rounded-lg'> <Link to='/Registerorg'>Sign Up</Link> </BtnLink>
        </Welcom>
      </section>
    </main>
    </>
  )
}