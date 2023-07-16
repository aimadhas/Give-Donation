import React, { useState,useEffect } from 'react';
import { Link } from "react-router-dom";
import { Button } from './UI/button';
import axios from 'axios';
import Spinners from './UI/Spinner';
import Eventinfo from './ProfilOrg/Eventinfo';


const EventInfo1 = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState("All");
  const [Posts, setPosts] = useState([])
  const [Posts2, setPosts2] = useState([])
  const [AllPosts, setAllPosts] = useState([])
  const [message, setMessage] = useState(false)

  function getAllPosts() {
    setIsLoading(true);
      setIsEditMode('All')
        axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/events/events`)
        .then(res => {
          const events = res.data;
          axios
            .get(`${import.meta.env.VITE_APP_API_URL}/api/donations/donations`)
            .then(res => {
              const donations = res.data;
              const allPosts = [...events, ...donations];
              if(allPosts.length === 0){
                setMessage(true); 
                setIsLoading(false); 
              }else{
                    setMessage(false);
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
  }





  function getEvents (){
    setIsEditMode('event')
    setIsLoading(true)
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/events/events`)
        .then(function (response) {
          if(response.data.length === 0){
            setMessage(true); 
            setIsLoading(false); 
          }else{
                setMessage(false);
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



  function getDonsation (){
    setIsEditMode('donation')
    setIsLoading(true)
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/donations/donations`)
        .then(function (response) {
          if(response.data.length === 0){
            setMessage(true);
            setIsLoading(false); 
          }else{
            const reversedData = response.data.reverse();
            setPosts2(reversedData); 
            setIsLoading(false);
                setMessage(false);
            
          }
        })
        .catch(function (res) {
          console.log(res);
          setIsLoading(false);
          setMessage(true)
        });
  }

  useEffect(()=>{
    if(isEditMode === "All"){
        getAllPosts()
    }
  },[])

  function handleApply(id,org,){
    const data = {
      id:id,
      org:org,
    }
    localStorage.setItem('postdata', JSON.stringify(data));
  }

  return (
    <section className='container mt-[50px] '>

<div className='w-full mb-6'>
<div className="w-[100%] mx-auto border-[1px] flex justify-between items-center px-9 rounded-2xl py-3 max-[600px]:flex-col max-[600px]:gap-10">
    <Button className={`bg-white rounded-xl  max-[700px]:px-6 max-[700px]:py-2 ${isEditMode==='All'?'btn-active':''}`} onClick={getAllPosts}>All</Button>
    <Button className={`bg-white rounded-xl  max-[700px]:px-6 max-[700px]:py-2 ${isEditMode==='donation'?'btn-active':''}`}  onClick={getDonsation}>Donations</Button>
    <Button className={`bg-white rounded-xl  max-[700px]:px-6 max-[700px]:py-2 ${isEditMode==='event'?'btn-active':''}`} onClick = {getEvents} >Events</Button>
      </div>
    </div>


    <div className='my-10'>
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
          <Link  to='/Apply' className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleApply(post._id,post.org_.id)}>view more</Link>
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
                  <Link  to='/Apply-Donation' className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleApply(post._id,post.org[0]._id)}>view more</Link>
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
                 <Link  to='/Apply-Donation' className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleApply(post._id,post.org[0]._id)}>view more</Link>
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
                <Link  to='/Apply' className="bg-[#054DEC] rounded-lg text-white px-10 py-3" onClick={() => handleApply(post._id,post.org._id)}>view more</Link>
      </Eventinfo>
    );
  } else {
    return null;
  }
})}

    {message  && <p className="text-white bg-red-700 w-full px-4 py-2 rounded-xl text-center">they are no event yet</p>}
    </div>

    </section>
  );
};

export default EventInfo1;
