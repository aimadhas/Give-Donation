import Input from "../UI/input"
import Inputwraper from "../UI/inputwraper"
import { Button,Submit } from "../UI/button"
import { Link } from "react-router-dom"
import LockIcon from '@mui/icons-material/Lock';
import {Formik, useFormik,Field} from 'formik';
import * as Yup from 'yup';
import { useEffect, useState } from "react";
import axios from "axios";
import { FaUsers } from "react-icons/fa";
import { AppContext } from '../ProfilUser/APPcontext';
import { useContext } from "react";
import Spinners from "../UI/Spinner";
import { BtnLoading } from "../UI/button";
import MessageComp from "../UI/MessageComp";

export default function ModifierOrginfo() {
  const [data, setData] = useState({});
  const [id,setId] = useState();
  const [selectedFile, setSelectedFile] = useState(null);
  const [dataURL, setDataURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const {setinformation} = useContext(AppContext)
  const [previewURL, setPreviewURL] = useState(null);
  const [btnLoading, setbtnLoading] = useState(false);
  const [message, setmessage] = useState(false);




  const cityOptions = ["Tanger-Tétouan-Al Hoceïma","L'Oriental","Fès-Meknès","Rabat-Salé-Kénitra","Béni Mellal-Khénifra",'Marrakech-Safi',"Drâa-Tafilalet","Souss-Massa","Guelmim-Oued Noun","Laâyoune-Sakia El Hamra","Dakhla-Oued Ed Dahab"]
  useEffect(() => {
    const id = localStorage.getItem("idOrg");
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/organisation/profile/${id}`)
        .then(function (response) {
          setData(response.data); 
          setId(id);
          setPreviewURL(response.data.picture); // Preload image URL
          setIsLoading(false);

        })
        .catch(function (res) {
          console.log(res);
          setIsLoading(false);

        });
    }else{
      setIsLoading(false);
      setmessage(true);
    }
  }, []);

  function DeleteMessage(){
    window.location.href='/'
  }


  const validationSchema1 = 
    Yup.object().shape({
      // Validation schema for the first step
      org_name: Yup.string().required('Please entre first Name').min(4, 'Too Short!').max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace'),
      email: Yup.string().email('Invalid email').required('Please entre your Email'),
      picture: Yup.mixed().required('Image is required'),
      city: Yup.string().required('Option is required').oneOf(cityOptions, 'Invalid option'),
      address: Yup.string().required('Please entre your address').matches(/^\S.*$/, 'cannot start with whitespace'),
      Type: Yup.string().required('Please entre the Type of your organisation').min(2, 'Too Short!').max(50, 'Too Long!').matches(/^\S.*$/, 'cannot start with whitespace'),
      Descripion: Yup.string().required('Description is required').min(10,'Please give us more details about your organisation').max(500, 'Description must be less than 500 characters').matches(/^\S.*$/, 'cannot start with whitespace'),
    })
    const formik = useFormik({
      initialValues:{
        org_name:'',
        email:'',
        password:'',
        confirmPassword:'',
        picture:'',
        city:'',
        address:'',
        Type:'',
        Descripion:'',
      },
      validationSchema:validationSchema1,
      onSubmit: (values) => {
        setbtnLoading(true);
        axios.put(`${import.meta.env.VITE_APP_API_URL}/api/organisation/profile/${id}`,{...values, picture: previewURL})
          .then(response => {
            if (response.data) {
              if(response.status === 200) {
                setinformation(true)
                setbtnLoading(false)
              }else{
                alert("somthing went wrong please try  later")
              }
            } else {
              console.log('Error: Unable to update organization profile');
            }
          })
          .catch(error => {
            console.log(error);
            console.log('Error: Unable to update organization profile');
          });
      }
    })

    useEffect(() => {
      formik.setValues({
        org_name: data.org_name || '',
        email: data.email || '',
        address:data.address || '',
        city: data.city || '',
        Type: data.Type || '',
        Descripion: data.Descripion || '',
        picture: previewURL || '',
      });
    }, [previewURL]);

    const handleFileChange = (event) => {
      const file = event.target.files[0];
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onload = () => {
        setPreviewURL(reader.result);
        setDataURL(reader.result);
      };
      reader.readAsDataURL(file);
    };

  return (
    <div className="flex justify-between  max-lga:flex-col max-lga:items-center max-lga:justify-center">
    {isLoading && <Spinners />}
    {
        message &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
    <div className="flex flex-col justify-center text-center w-1/4  gap-4 h-72 mt-5  max-lga:w-full max-lga:items-center">
    <h1 className='mb-2 font-medium text-[18px]'>Modifier your profile picture</h1>
      <div className="flex flex-col justify-center   gap-4 ">
        <div className="w-52 h-52 bg-[#F9F9F9] flex justify-center items-center rounded-full object-cover">
        {previewURL === null && <FaUsers className="text-[#054DEC] text-[70px]"></FaUsers>} 
            
            {previewURL && (
                <img src={previewURL} alt="Preview" style={{ maxWidth: '200px' }} className="w-full h-full rounded-full object-cover" />
              )}
      </div>
      <label  htmlFor='inputTag' className='cursor-pointer bg-[#054DEC] text-white w-36 text-center py-4 px-2 rounded-xl mx-auto'>
        + change
      <input id="inputTag" type="file" accept="image/*" onChange={handleFileChange} className='hidden' />
      </label>
      {formik.errors.picture && formik.touched.picture && <p className="text-red-700">{formik.errors.picture}</p>}
    </div>
    </div>
  <form className="w-[70%] text-start max-lga:w-full max-lga:my-12" onSubmit={formik.handleSubmit}>
  <h1 className='text-[#000000] text-[28px] underline mb-4 font-bold text-start max-400px:text-[18px]'>Personal information</h1>
  <Inputwraper>
        <label htmlFor="">Organization name</label>
        <Input type="text" placeholder='Organisation' name='org_name' onChange={formik.handleChange}  value={formik.values.org_name} onBlur={formik.handleBlur} className={`${formik.errors.org_name && formik.touched.org_name?'border-red-600':''}`}/>
        {formik.errors.org_name && formik.touched.org_name && <p className="text-red-700">{formik.errors.org_name}</p>}
        </Inputwraper>
        <Inputwraper>
        <label htmlFor="">Email</label>
        <Input type="email" placeholder='User@gmail.com' name='email' onChange={formik.handleChange}  value={formik.values.email} onBlur={formik.handleBlur} className={`${formik.errors.email && formik.touched.email?'border-red-600':''}`} />
        {formik.errors.email && formik.touched.email && <p className="text-red-700">{formik.errors.email}</p>}
        </Inputwraper>
        <Inputwraper>
      <label htmlFor="">City</label>
          <select  as="select"  name='city' onChange={formik.handleChange}  value={formik.values.city} onBlur={formik.handleBlur} className={`bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3 outline-none ${formik.errors.city && formik.touched.city?'border-red-600':''}`}>
          <option value="">Select a city</option>
            {cityOptions.map((city, index) => (
          <option key={index} value={city}>
            {city}
          </option>
        ))}
          </select>
        {formik.errors.city && formik.touched.city && <p className="text-red-700">{formik.errors.city}</p>}
      </Inputwraper>
            <Inputwraper >
            <label htmlFor="">Organisation address</label>
            <Input type="text" placeholder='Organisation' name='address' onChange={formik.handleChange}  value={formik.values.address} onBlur={formik.handleBlur} className={`${formik.errors.address && formik.touched.address?'border-red-600':''}`}/>
        {formik.errors.address && formik.touched.address && <p className="text-red-700">{formik.errors.address}</p>}
            </Inputwraper>
            <Inputwraper>
            <label htmlFor="">Organisation Type</label>
            <Input  as="select"  name='Type' onChange={formik.handleChange}  value={formik.values.Type} onBlur={formik.handleBlur} className={`bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3 outline-none ${formik.errors.Type && formik.touched.Type?'border-red-600':''}`}>
          </Input>
        {formik.errors.Type && formik.touched.Type && <p className="text-red-700">{formik.errors.Type}</p>}
            </Inputwraper>
            <Inputwraper>
            <label htmlFor="">Descripion</label>
            <textarea name="Descripion" id="" cols="30" rows="10" placeholder='what is ur organisation goals for example' onChange={formik.handleChange}  value={formik.values.Descripion} onBlur={formik.handleBlur} className={`outline-none bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3${formik.errors.Descripion && formik.touched.Descripion?'border-red-600':''}`}></textarea>
          {formik.errors.Descripion && formik.touched.Descripion && <p className="text-red-700">{formik.errors.Descripion}</p>}
            </Inputwraper>
            <a href="/" className="underline text-[18px] font-semibold flex gap-2 items-center"><LockIcon></LockIcon><Link to='/Profil-org/modifierpasswordorg'>Change Password</Link></a>
      <div className="w-full text-right mt-5 ">
      <Link to='/Profil-org'> <Button  className='bg-[#F9F9F9] text-[#054DEC] rounded-xl mt-4 mx-3'>Cancel</Button></Link>
      {!btnLoading &&  <button type="submit" className='cursor-pointer bg-[#054DEC] text-white w-36 text-center py-4 px-2 rounded-xl'>Save</button> }
      {btnLoading &&  <BtnLoading></BtnLoading>}
      </div>
  </form>
  </div>
  )
}
