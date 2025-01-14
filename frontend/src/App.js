import React from "react";
// We use Route in order to define the different routes of our application
import { Route, Routes } from "react-router-dom";
import MbtaAlertsPage from "./components/pages/mbtaAlerts";
import MbtaAPIFunctionPage from "./components/pages/mbtaAPIFunction";
import AuthorizationPage from "./components/pages/authorizationsPage";
import TicketCalculator from "./components/pages/ticketCalculator";
import SelectingTickets from "./components/pages/selectingTickets";
import UseTickets from "./components/pages/useATicketPage";
import AllAuthorizations from "./components/pages/allAuthorizationsPage";

// We import all the components we need in our app
import Navbar from "./components/navbar";
import LandingPage from "./components/pages/landingPage";
import HomePage from "./components/pages/homePage";
import Login from "./components/pages/loginPage";
import Signup from "./components/pages/registerPage";
import PrivateUserProfile from "./components/pages/privateUserProfilePage";
import { createContext, useState, useEffect } from "react";
import getUserInfo from "./utilities/decodeJwt";

export const UserContext = createContext();
//test change
//test again
const App = () => {
  const [user, setUser] = useState();

  useEffect(() => {
    setUser(getUserInfo());
  }, []);

  return (
    <>
      <Navbar />
      <UserContext.Provider value={user}>
        <Routes>
          <Route exact path="/" element={<LandingPage />} />
          <Route exact path="/home" element={<HomePage />} />
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/signup" element={<Signup />} />
          <Route exact path="/mbtaAlerts" element={<MbtaAlertsPage />} />
          <Route exact path="/mbtaAPIFunction" element={<MbtaAPIFunctionPage />} />
          <Route exact path="/ticketCalculator" element={<TicketCalculator />} />
          <Route exact path="/selectingTickets" element={<SelectingTickets />} />
          <Route exact path="/authorizationsPage" element={<AuthorizationPage />} />
          <Route exact path="/allAuthorizationsPage" element={<AllAuthorizations />}/>
          <Route path="/privateUserProfile" element={<PrivateUserProfile />} />
          <Route path="/useTickets" element={<UseTickets />} />
        </Routes>
      </UserContext.Provider>
    </>
  );
};



export default App
