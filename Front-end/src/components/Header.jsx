import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./Header.css";
import { FaBars, FaTimes } from "react-icons/fa";
import { IconContext } from "react-icons/lib";
import { NavLink } from "react-router-dom";
import { FaUser } from "react-icons/fa";
import { FaUsers } from "react-icons/fa";
import { useEffect } from "react";
import logo from '../assets/logo.png';
import axios from "axios";

function Header() {
  const [userlogin,setuser] = useState(false);
  const [Orglogin,setorg] = useState(false)
  const [Lougout,setlogin] = useState(true)
  const [click, setClick] = useState(false);
  const [data, setData] = useState({});
  const handleClick = () => setClick(!click);
  const closeMobileMenu = () => setClick(false);

  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };
  useEffect(()=>{
    const user = localStorage.getItem('User');
    if (user) {
      setuser(true)
      setlogin(false)
      setorg(false)
    }
  },[])
  useEffect(()=>{
    const Org = localStorage.getItem('Org');
    if (Org) {
      setorg(true)
      setuser(false)
      setlogin(false)
    }
  },[])
  function UserLougout(){
    localStorage.clear();
    window.location.href = '/';
  }
  useEffect(() => {
    const id = localStorage.getItem("idOrg");
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/organisation/profile/${id}`)
        .then(function (response) {
          setData(response.data);
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  }, []);
  useEffect(() => {
    const id = localStorage.getItem("idUser");
    if (id) {
      axios
        .get(`${import.meta.env.VITE_APP_API_URL}/api/users/profile/${id}`)
        .then(function (response) {
          console.log(response.data.photo);
          setData(response.data);
        })
        .catch(function (res) {
          console.log(res);
        });
    }
  }, []);

  return (
    <>
      <IconContext.Provider value={{ color: "#0060c1" }}>
        <nav className="navbar">
          <div className="navbar-container container">
            <Link to="/" className="navbar-logo" onClick={closeMobileMenu}>
              <img src={logo} alt="logo" className="w-24" />
            </Link>
            <div className="menu-icon" onClick={handleClick}>
              {click ? <FaTimes /> : <FaBars />} 
            </div>
            <ul className={click ? "nav-menu active" : "nav-menu"}>
              <li className="nav-item">
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Opportunities"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                  Opportunities
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink
                  to="/Contact"
                  className={({ isActive }) =>
                    "nav-links" + (isActive ? " activated" : "")
                  }
                  onClick={closeMobileMenu}
                >
                   Contact Us
                </NavLink>
              </li>
              <li className="nav-item max-[960px]:hidden">
                <NavLink
                    to=""
                    className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}
                  >
                  {
                    (Lougout) && (
                  <div className="flex justify-center items-center">
                    <button
                      id="dropdownDefaultButton"
                      data-dropdown-toggle="dropdown"
                      className="text-white sm:top-0 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      type="button"
                      onClick={toggleDropdown}
                    >
                      Join Us
                      <svg
                        className="w-4 h-4 ml-2"
                        aria-hidden="true"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                      </svg>
                    </button>

                      {dropdownOpen && (
                        <div
                          id="dropdown"
                          className="bg-blue-500 z-10 divide-y rounded-lg shadow w-44 absolute mt-[155px]"
                        >
                          <ul className="py-2 text-sm text-white" aria-labelledby="dropdownDefaultButton">
                            <li >
                              <a href="#" className="block px-4 py-2 hover:bg-blue-900 dark:hover:bg-blue-400 dark:hover:text-white">
                              <Link to="/Choosen"> Sign Up </Link>
                              </a>
                            </li>
                            <li>
                              <a href="#" className="block px-4 py-2 hover:bg-blue-900 dark:hover:bg-blue-400 dark:hover:text-white">
                              <Link to="/ChoosenOrg"> Sign In</Link>
                              </a>
                            </li>
                          </ul>
                        </div>
                      )}
                  </div>
                    )}
                    {(!Lougout) && (
                      <div className="max-[960px]:hidden flex justify-center items-center relative">
                      <div className="bg-[#F9F9F9] w-14 h-14 rounded-[50%] flex justify-center items-center" onClick={handleToggle}>
                        {userlogin &&(
                          <>
                            {data.photo === undefined &&<FaUser></FaUser> }                          
                            {data.photo !== undefined &&  <img src={data.photo} alt="Organization logo" className="w-full h-full object-cover rounded-full" />  }                          
                          </>
                                              )
                        }
                        {Orglogin && (
                          <>
                          {data.picture === undefined &&  <FaUsers></FaUsers> }
                          {data.picture !== undefined &&   <img src={data.picture} alt="Organization logo" className="w-full h-full object-cover rounded-full" /> }
                          </>
                        )}
                      </div>
                      {isOpen && (
                          <div className="bg-[#F9F9F9] absolute flex flex-col top-[110px] left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-28 rounded-xl">
                            {userlogin &&(
                              <>
                              <Link to='/Profil-user' className="border-b-[1px] border-[#CACACA] pb-2 hover:bg-blue-400  hover:text-white hover:rounded-t-xl" onClick={() => setIsOpen(false)}>Profil</Link>
                              <Link to='/Profil-user/Favorites' className="border-b-[1px] border-[#CACACA] pb-2 hover:bg-blue-400  hover:text-white" onClick={() => setIsOpen(false)}>Applied</Link>
                              <button className="text-[#DB9090] pb-2 hover:bg-[#DB9090] hover:rounded-b-xl  hover:text-white" onClick={UserLougout}>Log Out</button>
                              </>
                            )}
                            {Orglogin && (
                              <>
                              <Link to='/Profil-org' className="border-b-[1px] border-[#CACACA] pb-2 hover:bg-blue-400 hover:text-white hover:rounded-t-xl" onClick={() => setIsOpen(false)}>Profile</Link>
                              <Link to='/Profil-org/creatpost' className="border-b-[1px] border-[#CACACA] pb-2 hover:bg-blue-400 hover:text-white" onClick={() => setIsOpen(false)}>Create</Link>
                              <Link to='/Profil-org/historyorg' className="border-b-[1px] border-[#CACACA] pb-2 hover:bg-blue-400 hover:text-white" onClick={() => setIsOpen(false)}>History</Link>
                              <button className="text-[#DB9090] pb-2 hover:bg-[#DB9090] hover:rounded-b-xl hover:text-white"  onClick={UserLougout}>Log Out</button>
                              </>
                            )}
                          </div>
                        )}
                    </div>
                    )}
                </NavLink>
              </li>
              {
                (Lougout) && (
                <div className="min-[960px]:hidden">
                <li >
                <a href="#" className="nav-item">
                <NavLink to="/Choosen"  className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}> Sign Up </NavLink>
                </a>
              </li>
              <li>
                <a href="#" className="nav-item">
                <NavLink to="/ChoosenOrg"  className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}> Sign In</NavLink>
                </a>
              </li>
                </div>
                )
              }
              {
                (!Lougout) && (
                <div className="min-[960px]:hidden my-4">
                  {userlogin &&(
                    <div className="flex flex-col gap-6 pb-5">
                    <Link to='/Profil-user' className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu}  
                    >Profil</Link>
                    <Link to='/Profil-user/Favorites' className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }
                    onClick={closeMobileMenu} >Favourite</Link>
                    <button className="text-[#DB9090] "onClick={UserLougout}>Log Out</button>
                    </div>
                      )}{Orglogin && (
                        <div className="flex flex-col gap-6" >
                          <Link to='/Profil-org' className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }   onClick={closeMobileMenu}  >Profile</Link>
                          <Link to='/Profil-org/creatpost' className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }   onClick={closeMobileMenu} >Create</Link>
                          <Link to='/Profil-org/historyorg' className={({ isActive }) =>
                      "nav-links" + (isActive ? " activated" : "")
                    }  onClick={closeMobileMenu} >History</Link>
                          <button className="text-[#DB9090] pb-2 hover:bg-[#DB9090] hover:rounded-b-xl hover:text-white"  onClick={UserLougout}>Log Out</button>
                        </div>
                      )}
                </div>
                )
              }


            </ul>
          </div>
        </nav>
      </IconContext.Provider>
    </>
  );
}

export default Header;
