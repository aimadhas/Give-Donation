import Input from "../UI/input";
import Inputwraper from "../UI/inputwraper";
import { Button } from "../UI/button";
import { Link } from "react-router-dom";
import { FaUsers } from "react-icons/fa";
import axios from "axios";
import { useEffect, useState } from "react";
import Spinners from "../UI/Spinner";
import MessageComp from "../UI/MessageComp";

export default function Organisationinfo() {
  const [data, setData] = useState({});
  const [previewURL, setPreviewURL] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [message, setmessage] = useState(false);


  useEffect(() => {
    const id = localStorage.getItem("idOrg");
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/organisation/profile/${id}`)
        .then(function (response) {
          setData(response.data);
          setPreviewURL(response.data.picture);
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
      <div className="flex flex-col justify-center text-center w-1/4  gap-4 h-72 max-1024px:h-64 max-lga:w-full">
        <div className="w-52 h-52 bg-[#F9F9F9] rounded-[50%] flex justify-center items-center  mx-auto">
         { previewURL  &&   <img src={data.picture} alt="Organization logo" className="w-full h-full object-cover rounded-full" />}
          {previewURL === null && <FaUsers className="text-[#054DEC] text-[70px]"></FaUsers>} 
        </div>
      </div>
      <div className="w-[70%] text-start max-lga:w-full">
        <div>
          <h1 className="text-[#000000] text-[28px] underline mb-4 font-bold text-start max-400px:text-[18px]">
            Personal information
          </h1>
          <Inputwraper>
            <label htmlFor="">Organization name</label>
            <Input
              type="text"
              placeholder="Organisation"
              className="invalid-input"
              value={data.org_name || ""}
            />
          </Inputwraper>
          <Inputwraper>
            <label htmlFor="">Email</label>
            <Input
              type="email"
              placeholder="User@gmail.com"
              className="invalid-input"
              value={data.email || ""}
            />
          </Inputwraper>
          <Inputwraper>
            <label htmlFor="">City</label>
            <Input
              type="text"
              placeholder="City"
              className="invalid-input"
              value={data.city || ""}
            />
          </Inputwraper>
          <Inputwraper>
            <label htmlFor="">Organisation address</label>
            <Input
              type="text"
              placeholder="Region, Street, building, ect... "
              className="invalid-input"
              value={data.address || ""}
            />
          </Inputwraper>
          <Inputwraper>
            <label htmlFor="">Organisation Type</label>
            <Input
              type="text"
              placeholder="Organisation Type"
              className="invalid-input"
              value={data.Type || ""}
            />
          </Inputwraper>
          <Inputwraper>
            <label htmlFor="">Description</label>
            <textarea
              name=""
              id=""
              cols="30"
              rows="10"
              className="invalid-input outline-none bg-[#F9F9F9] text-[#5A5A5D] border-[1px] border-[#CACACA] rounded-lg px-4 py-3"
              placeholder="what is your organisation's goals, for example"
              value={data.Descripion || ""}
            ></textarea>
          </Inputwraper>
          <div className="w-full text-right mt-5">
            <Link to="/Profil-org/modifierinforg">
              <Button className="text-white bg-[#054DEC] rounded-xl mt-4 max-600px:px-6">
                Edit
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}