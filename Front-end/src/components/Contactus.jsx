import {React , useState} from 'react'
import EmailIcon from '@mui/icons-material/Email';
import PhoneIcon from '@mui/icons-material/Phone';
import InstagramIcon from '@mui/icons-material/Instagram';
import TwitterIcon from '@mui/icons-material/Twitter';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import FacebookIcon from '@mui/icons-material/Facebook';
import axios from 'axios';
import MessageComp from '../components/UI/MessageComp'
import image1 from '../assets/1.png'
import { Button } from './UI/button';

const Contactus = () => {
  const [message, setMessage] = useState(false)
  const [confirmed, setconfirmed] = useState(false)


  const [formData, setFormData] = useState({
    f_name: '',
    l_name: '',
    email: '',
    phone_number: '',
    message: ''
  });
  
  const handleSubmit = async (event) => {
    event.preventDefault();
  
    try {
      await axios.post(`${import.meta.env.VITE_APP_API_URL}/api/contact`, formData)
      // window.alert('Data has been successfully posted!');
      setMessage(true);
      setFormData({
        f_name: '',
        l_name: '',
        email: '',
        phone_number: '',
        message: ''
      });
    } catch (error) {
      console.error(error, formData);
      window.alert('ooop! , some thing went wrong');
    }
  };

  const handleChange = (event) => {
    setFormData({...formData, [event.target.name]: event.target.value});
  };


  function DoneApply(){
    setMessage(false)
    location.reload();
  }





  return (
    <>
    {message  && <MessageComp>
      <div className='w-full flex justify-center items-center'>
      <div className='w-56 h-56 bg-[#FFFFFF] rounded-full flex justify-center items-center text-center '>
        <img src={image1} alt="" />
      </div>
      </div>
        <p className='font-medium text-xl text-center uppercase my-5'>Thank you for your Message.</p>
        <div className='w-full text-right'>
        <Button className='bg-[#054DEC] text-white' onClick={DoneApply}>Done</Button>
        </div>
      
      </MessageComp>}
      <h1 className='font-bold mt-[50px] mb-[20px] text-center'>CONTACT US</h1>
      <p className='text-center mb-[30px] uppercase'>any question or remarks? just write us a message</p>
      
      <div className='border rounded-xl sm:w-full md:flex md:justify-between md:items-center container'>
        <div className='mt-5 mb-5 text-white border h-[600px] bg-blue-600 rounded-lg relative z-[-10]'>
          <h1 className='underline mt-[20px] text-center font-normal text-2xl'>contact us</h1>
          <p className='cursor-pointer m-[30px]'>any question or remarkes just write us a message</p>
          <div className='m-[30px] '>
            <div className='mb-[10px]'>
              <PhoneIcon className='mr-[10px]'/>
              <span>05 22 62 06 38 </span>
            </div>
            <div>
              <EmailIcon className='mr-[10px]'/>
              <span>giveOgmail.com</span>
            </div>
            <div className='mt-[100px]'>
              <InstagramIcon className='mr-[15px]'/>
              <TwitterIcon className='mr-[15px]'/>
              <LinkedInIcon className='mr-[15px]'/>
              <FacebookIcon/>
            </div>
            <div className=''>
                <span className=' absolute w-[100px] h-[100px] bg-blue-900 rounded bottom-0 right-0'></span>
                <span className='absolute bottom-[60px] bg-blue-700 rounded-full  w-[100px] h-[100px] right-[60px]'></span>
            </div>
          </div>
        </div>
        <form className='m-[50px]' onSubmit={handleSubmit}>
          <div class="grid md:grid-cols-2 md:gap-6  lg:w-[500px]">
              <div class="relative z-0 w-full mb-6 group">
                  <input type="text" name="f_name" onChange={handleChange} value={formData.f_name} id="floating_first_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="floating_first_name"  class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">First name</label>
              </div>
              <div class="relative z-0 w-full mb-6 group">
                  <input type="text" name="l_name" onChange={handleChange} value={formData.l_name} id="floating_last_name" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
                  <label for="floating_last_name" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Last name</label>
              </div>
            </div>
          <div class="relative z-0 w-full mb-6 group">
              <input type="email" name="email" onChange={handleChange} value={formData.email} id="email" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating_email" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
              <input type="number" name="phone_number" onChange={handleChange} value={formData.phone_number} id="floating_password" class="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none  dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer" placeholder=" " required />
              <label for="floating" class="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:left-0 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone Number</label>
          </div>
          <div class="relative z-0 w-full mb-6 group">
            <label for="message" class="block mb-2 text-sm font-medium text-gray-400">Your message</label>
            <textarea id="message" name='message' onChange={handleChange} value={formData.message} rows="10" class="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 " placeholder="Leave a comment..."></textarea>
          </div>
          <button type="submit" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Send Message</button>
        </form>

      </div>
    </>
  )
}

export default Contactus