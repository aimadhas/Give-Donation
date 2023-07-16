import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Event from "./pages/Events";
import About from "./pages/Aboutus";
import Contact from "./pages/Contact";
import Apply from "./pages/Apply";
import Login from "./pages/Login";
import Registeruser from "./pages/Registeruser";
import Choosen from "./pages/Choosen";
import Profiluser from "./pages/Profiluser";
import Registerorg from "./pages/Registerorg";
import NotFound from "./pages/NotFound";
import Profilinfo from "./components/ProfilUser/Profilinfo";
import Modifierinfo from "./components/ProfilUser/Modifierinfo";
import Modifierpassword from "./components/ProfilUser/Modifierpassword";
import Favoritepost from "./components/ProfilUser/Favoritepost";
import Profilorg from "./pages/Profilorg";
import Organisationinfo from "./components/ProfilOrg/Organisationinfo";
import ModifierOrginfo from "./components/ProfilOrg/ModifierOrginfo";
import MdfpasswordOrg from './components/ProfilOrg/MdfpasswordOrg'
import Historiqueorg from "./components/ProfilOrg/Historiqueorg";
import Creatpost from './components/ProfilOrg/Creatpost'
import Donationpost from "./components/ProfilOrg/Donationpost";
import Eventpost from "./components/ProfilOrg/Eventpost";
import APPcontext from "./components/ProfilUser/APPcontext";
import Loginorgs from "./pages/Loginorg";
import ChoosenOrg from "./pages/ChoosenOrg";
import UpdateEvent from "./components/ProfilOrg/UpdateEvent";
import UpdateDonation from "./components/ProfilOrg/UpdateDonation";
import Messagepayment from "./components/Messagepayment";
import DonationApply from './components/DonationApply'



function App() {
  return (
    <APPcontext>
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/Opportunities" element={<Event />} />
        <Route path="/About" element={<About />} />
        <Route path="/Contact" element={<Contact />} />
        <Route path="/Apply" element={<Apply />} />
        <Route path="/Apply-Donation" element={<DonationApply />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Loginorg" element={<Loginorgs />} />
        <Route path="/Registeruser" element={<Registeruser />} />
        <Route path="/Choosen" element={<Choosen />} />
        <Route path="/ChoosenOrg" element={<ChoosenOrg />} />

        <Route path="/Profil-user" element={<Profiluser />}>
        <Route path="/Profil-user" element={<Profilinfo/>}></Route>
        <Route path="/Profil-user/modifierinfo" element={<Modifierinfo/>}></Route>
        <Route path="/Profil-user/modifierpassword" element={<Modifierpassword/>}></Route>
        <Route path="/Profil-user/Favorites" element={<Favoritepost/>}></Route>
        </Route>

        <Route path="/Profil-org" element={<Profilorg />}>
        <Route path="/Profil-org" element={<Organisationinfo/>}></Route>
        <Route path="/Profil-org/modifierinforg" element={<ModifierOrginfo/>}></Route>
        <Route path="/Profil-org/modifierpasswordorg" element={<MdfpasswordOrg/>}></Route>
        <Route path="/Profil-org/historyorg" element={<Historiqueorg/>}></Route>
        <Route path="/Profil-org/creatpost" element={<Creatpost/>}>
        <Route path="/Profil-org/creatpost" element={<Eventpost/>}></Route>
        <Route path="/Profil-org/creatpost/donation" element={<Donationpost/>}></Route>
        </Route>
        <Route path="/Profil-org/UpdateEvent" element={<UpdateEvent/>}></Route>
        <Route path="/Profil-org/UpdateDonation" element={<UpdateDonation/>}></Route>
        </Route>
        <Route path="/Registerorg" element={<Registerorg />} />
        <Route path="/payement" element={<Messagepayment />} />
        <Route path="/*" element={<NotFound />} />
      </Routes>
      </APPcontext>
  );
}

export default App;
