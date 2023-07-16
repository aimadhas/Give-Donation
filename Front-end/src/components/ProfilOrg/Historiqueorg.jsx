import { Button } from "../UI/button"
import { useState, useEffect } from "react"
import axios from "axios";
import { Link } from "react-router-dom";
import Spinners from '../UI/Spinner';
import Eventinfo from "./Eventinfo";
import MessageComp from "../UI/MessageComp";










export default function Historiqueorg() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState("All");
  const [Posts, setPosts] = useState([])
  const [Posts2, setPosts2] = useState([])
  const [AllPosts, setAllPosts] = useState([])
  const [message, setMessage] = useState(false)
  const [message2, setMessage2] = useState(false)



  function getAllPosts() {
    setIsLoading(true);
      setIsEditMode('All')
      const id = localStorage.getItem("idOrg");
      if (id) {
        axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/events/organisations/${id}/events`)
        .then(res => {
          const events = res.data;
          axios
            .get(`${import.meta.env.VITE_APP_API_URL}/api/donations/organisations/${id}/donation`)
            .then(res => {
              const donations = res.data;
              const allPosts = [...events, ...donations];
              if(allPosts.length === 0){
                setMessage(true); 
                setIsLoading(false); 
              }else{
                allPosts.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));  
                setAllPosts(allPosts);
                setIsLoading(false); 
              }
            })
        })
        .catch(err => {
          console.log(err);
          setIsLoading(false);
          setMessage(true)
        });
      }else{
        setIsLoading(false); 
        setMessage2(true);
      }
   
  }





  function getEvents (){
    setIsEditMode('event')
    setIsLoading(true)
    const id = localStorage.getItem("idOrg");
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/events/organisations/${id}/events`)
        .then(function (response) {
          if(response.data.length === 0){
            setMessage(true);
            setIsLoading(false); 
          }else{
                const reversedData = response.data.reverse();
                setPosts(reversedData); 
                setIsLoading(false);
          }
        })
        .catch(function (res) {
          console.log(res);
          setIsLoading(false);
          setMessage(true)
        });
    }
  }



  function getDonsation (){
    setIsEditMode('donation')
    setIsLoading(true)
    const id = localStorage.getItem("idOrg");
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/donations/organisations/${id}/donation`)
        .then(function (response) {
          if(response.data.length === 0){
            setMessage(true);
            setIsLoading(false); 
          }else{
            const reversedData = response.data.reverse();
            setPosts2(reversedData); 
            setIsLoading(false); 
          }
        })
        .catch(function (res) {
          console.log(res);
          setIsLoading(false);
          setMessage(true)
        });
    }
  }

  useEffect(()=>{
    if(isEditMode === "All"){
        getAllPosts()
    }
  },[])




  function handleUpdate1(id) {
    localStorage.setItem('eventId', id);
    location.replace("/Profil-org/UpdateDonation");
  }

  function handleDelete1(id) {
    setIsLoading(true);
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/donations/donation/${id}`,{
    }).then(function(response){
        setIsLoading(false);
          getDonsation()
      }).catch(function(res){
        console.log(res);
      })
  }
  function handleDelete2(id) {
    setIsLoading(true);
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/donations/donation/${id}`,{
    }).then(function(response){
    setIsLoading(false);
          getAllPosts()
      }).catch(function(res){
        console.log(res);
      })
  }




  function handleUpdate(id) {
    localStorage.setItem('eventId', id);
    location.replace("/Profil-org/UpdateEvent");
  }

  function handleDelete(id) {
    setIsLoading(true);
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/events/delete/${id}`,{
    }).then(function(response){
        setIsLoading(false);
          getEvents()
      }).catch(function(res){
        console.log(res);
      })
  }


  function handleDelete3(id) {
    setIsLoading(true);
    axios.delete(`${import.meta.env.VITE_APP_API_URL}/api/events/delete/${id}`,{
    }).then(function(response){
      setIsLoading(false);
          getAllPosts()
      }).catch(function(res){
        console.log(res);
      })
  }

  function DeleteMessage(){
    window.location.href='/'
  }

  return (
    <>
    <div>
    <h1 className='text-[#000000] text-[28px] underline mb-12 font-bold'>Past posts</h1>
    <div className="w-[100%] mx-auto border-[1px] flex justify-between items-center px-9 rounded-2xl py-3 max-[600px]:flex-col max-[600px]:gap-10">
      <Button className={`bg-white rounded-xl max-[700px]:px-6 max-[700px]:py-2 ${isEditMode==='All'?'btn-active':''}`} onClick={getAllPosts}>All</Button>
      <Button className={`bg-white rounded-xl max-[700px]:px-6 max-[700px]:py-2 ${isEditMode==='donation'?'btn-active':''}`}onClick={getDonsation}>Donations</Button>
      <Button className={`bg-white rounded-xl max-[700px]:px-6 max-[700px]:py-2 ${isEditMode==='event'?'btn-active':''}`} onClick = {getEvents} >Events</Button>
    </div>
    </div>
    <div className="my-6 px-7">
    {isLoading && <Spinners />}
      {isEditMode === 'event' &&  Posts.map((post,inex)=>( 
         <Eventinfo
         key={post.IdEvnt}
         idevnt={post._id}
         type={post.Type}
         eventImage={post.eventImage}
         titreEvnt={post.titreEvnt}
         description={post.description}
         heure={post.heure}
         date={post.date}
       >
          <Link  to='/Profil-org/UpdateEvent' className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleUpdate(post._id)}>Update</Link>
        <button className="bg-[#E47070] rounded-lg text-white px-10 py-3" onClick={() => handleDelete(post._id)}>Delete</button>
       </Eventinfo>
      )) }
      {isEditMode=== 'donation' &&  Posts2.map((post,inex)=>( 
         <Eventinfo
         Key={inex}
         type={post.Type}
         eventImage={post.DonationImage}
         titreEvnt={post.titreDonation}
         description={post.description}
         heure="no time commitment"
         date={post.date}
       >
          <Link   className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleUpdate1(post._id)}>Update</Link>
        <button className="bg-[#E47070] rounded-lg text-white px-10 py-3" onClick={() => handleDelete1(post._id)}>Delete</button>
       </Eventinfo>
      )) }
      {isEditMode === 'All' && AllPosts.map((post, index) => {
  if (post.Type === 'donation') {
    return (
      <Eventinfo
        key={index}
        type={post.Type}
        eventImage={post.DonationImage}
        titreEvnt={post.titreDonation}
        description={post.description}
        heure="no time commitment"
        date={post.date}
      >
        <Link className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleUpdate1(post._id)}>Update</Link>
        <button className="bg-[#E47070] rounded-lg text-white px-10 py-3" onClick={() => handleDelete2(post._id)}>Delete</button>
      </Eventinfo>
    );
  } else if (post.Type === 'event') {
    return (
      <Eventinfo
        key={post.IdEvnt}
        idevnt={post._id}
        type={post.Type}
        eventImage={post.eventImage}
        titreEvnt={post.titreEvnt}
        description={post.description}
        heure={post.heure}
        date={post.date}
      >
        <Link to='/Profil-org/UpdateEvent' className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleUpdate(post._id)}>Update</Link>
        <button className="bg-[#E47070] rounded-lg text-white px-10 py-3" onClick={() => handleDelete3(post._id)}>Delete</button>
      </Eventinfo>
    );
  } else {
    return null;
  }
})}
 {message  && <p className="text-white bg-red-700 w-full px-4 py-2 rounded-xl text-center">You haven't created any posts yet. Click <Link to="/Profil-org/creatpost" className="underline"> here </Link> to create a post.</p>}
 {
        message2 &&
        <MessageComp>
        <p className='font-medium text-xl text-center uppercase my-5'> You Should have account first</p>
        <div className='w-full text-right'>
             <Button className='bg-[#054DEC] text-white' onClick={DeleteMessage}>Okey</Button>
              </div>
        </MessageComp>
       }
    </div>
    </>
  )
      }