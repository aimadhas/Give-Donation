import axios from "axios"
import { useState,useEffect } from "react"
import Spinners from "../UI/Spinner"
import Eventinfo from "../ProfilOrg/Eventinfo";
import MessageComp from "../UI/MessageComp";
import { Button } from "../UI/button";


export default function Favoritepost() {
  const [message, setmessage] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [data,setdata] = useState([])
  const [message2, setmessage2] = useState(false);



  const fetchEvents = async (data) => {
    if (Array.isArray(data)) {
      const eventIds = data
        .filter((item) => item.event !== null)
        .map((item) => item.event._id);
  
      const promises = eventIds.map((eventId) =>
        axios.get(`${import.meta.env.VITE_APP_API_URL}/api/events/${eventId}`)
      );
  
      try {
        const responses = await Promise.all(promises);
  
        const events = responses.map((response) => response.data);
        if(events.length === 0){
          setmessage(true);
        }else{
          setdata(events);
        }

      } catch (error) {
        console.error(error);
      }
  
      setIsLoading(false);
  
    } else {
      console.log("Data is not an array");
    }
  };



  useEffect(() => {
    setIsLoading(true);
    const id = localStorage.getItem("idUser")
    if(id){
      axios
      .get(`${import.meta.env.VITE_APP_API_URL}/api/events/users/${id}/favorites`)
      .then(function (response) {
        fetchEvents(response.data)
      })
      .catch(function (res) {

        setIsLoading(false);
      });
    }else{
      setIsLoading(false);
      setmessage2(true);
    }
  },[])

  function DeleteMessage(){
    window.location.href='/'
  }
  

  return (
    <>
          {isLoading && <Spinners />}
          {
        message2  &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
          <h1 className='text-[#000000] text-[28px] underline mb-12 font-bold  max-400px:text-[18px]'>Saved Opportunities</h1>
          {message  && <p className="text-white bg-red-700 w-full px-4 py-2 rounded-xl text-center">You don't apply ton  any Event yet.</p>}
          <div>
          {!isLoading && data.map((data) => {
    return (
      <Eventinfo
        key={data.IdEvnt}
        idevnt={data._id}
        type={data.Type}
        eventImage={data.eventImage}
        titreEvnt={data.titreEvnt}
        description={data.description}
        heure={data.heure}
        date={data.date}
      >
      </Eventinfo>
    );
})}           
          </div>
    </>
  )
}
