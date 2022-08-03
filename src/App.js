import GlobalStyle from "./globalStyles";
import LoginScreen from "./LoginScreen/LoginScreen";
import RegistrationScreen from "./RegistrationScreen/RegistrationScreen";
import HabitsScreen from "./HabitsScreen/HabitsScreen";
import HistoryScreen from "./HistoryScreen/HistoryScreen";
import TodayScreen from "./TodayScreen/TodayScreen";

import { BrowserRouter, Routes, Route } from "react-router-dom";
const App = () => {
  return (
    <>
      <BrowserRouter>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<LoginScreen />} />
          <Route path="/cadastro" element={<RegistrationScreen />} />
          <Route path="/habitos" element={<HabitsScreen />} />
          <Route path="/historico" element={<HistoryScreen />} />
          <Route path="/hoje" element={<TodayScreen />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
