import GlobalStyle from "./globalStyles";
import LoginScreen from "./LoginScreen/LoginScreen";
import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";
import HabitsScreen from "./HabitsScreen/HabitsScreen";
import HistoryScreen from "./HistoryScreen/HistoryScreen";
import TodayScreen from "./TodayScreen/TodayScreen";

import { useState } from "react";
import UserContext from "./contexts/UserContext";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersonPlus } from "styled-icons/bootstrap";

const App = () => {
  // Component Logic
  const [token2, setToken] = useState(localStorage.getItem("token"));
  const [percentage2,setPercentage2] = useState(0);
  //Compoent ui
  return (
    <>
      <BrowserRouter>
        <UserContext.Provider value={{ token2,percentage2,setPercentage2 }}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/cadastro" element={<RegistrationScreen />} />
            <Route path="/habitos" element={<HabitsScreen />} />
            <Route path="/historico" element={<HistoryScreen />} />
            <Route path="/hoje" element={<TodayScreen />} />
          </Routes>
        </UserContext.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
