import React from 'react'
import { useContext,useState } from 'react';

export const AppContext = React.createContext();

export default function APPcontext(props) {
  const [password,setpassword] = useState(false)
  const [information,setinformation] = useState(false)
  const [id, setId] = useState(null)
  const [eventupdate, seteventupdate] = useState(false)
  const [addevent, setaddevent] = useState(false)
  const [userdata, setUserData] = useState({})
  return (
    <AppContext.Provider  value={{password,setpassword,information,setinformation,id,setId,userdata,setUserData,eventupdate, seteventupdate,addevent, setaddevent}}>
      {props.children}
    </AppContext.Provider>
  )
}
