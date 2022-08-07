import GlobalStyle from "./globalStyles";
import LoginScreen from "./LoginScreen/LoginScreen";
import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";
import HabitsScreen from "./HabitsScreen/HabitsScreen";
import HistoryScreen from "./HistoryScreen/HistoryScreen";
import TodayScreen from "./TodayScreen/TodayScreen";

import { useState } from "react";
import ContextUser from "./contexts/ContextUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { PersonPlus } from "styled-icons/bootstrap";

const App = () => {
  // Component Logic
  const [token, setToken] = useState(localStorage.getItem("token"));
  //Compoent ui
  return (
    <>
      <BrowserRouter>
        <ContextUser.Provider value={token}>
          <GlobalStyle />
          <Routes>
            <Route path="/" element={<LoginScreen />} />
            <Route path="/cadastro" element={<RegistrationScreen />} />
            <Route path="/habitos" element={<HabitsScreen />} />
            <Route path="/historico" element={<HistoryScreen />} />
            <Route path="/hoje" element={<TodayScreen />} />
          </Routes>
        </ContextUser.Provider>
      </BrowserRouter>
    </>
  );
};

export default App;
