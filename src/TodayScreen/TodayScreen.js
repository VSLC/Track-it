import Trackitlogo from "../Assets/trackitlogo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { useState, useEffect } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

const HabitUnit = ({
  id,
  name,
  done,
  currentSequence,
  highestSequence,
  handleCheck,
  handleUncheck,
}) => {
  console.log(done);
  return (
    <HabitsUnit>
      <div className="habits-class">
        <HabitPresentation>
          <h4>{name}</h4>
          <p>
            Sequência atual:
            <HabitDayCheck done={done} className="ActualCount">
              {currentSequence} dias
            </HabitDayCheck>
          </p>
        </HabitPresentation>

        <p>
          Seu recorde:{" "}
          {currentSequence === highestSequence ? (
            <span className="green-text">{highestSequence} dias</span>
          ) : (
            <span>{highestSequence} dias</span>
          )}
        </p>
      </div>
      <Checked
        className="div-icon"
        onClick={() => {
          done ? handleUncheck(id) : handleCheck(id);
        }}
        done={done}
      >
        <ion-icon name="checkmark"></ion-icon>
      </Checked>
    </HabitsUnit>
  );
};

const TodayScreen = () => {
  const [image, setImage] = useState(localStorage.getItem("image"));
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [enable, setEnable] = useState(false);
  const isoWeek = require("dayjs/plugin/isoWeek");
  dayjs.extend(isoWeek);
  const [dayIso, setDayIso] = useState(dayjs().isoWeekday());
  const [dayOfMonth, setDayofMonth] = useState(dayjs().date());
  const [month, setMonth] = useState(dayjs().month() + 1);
  const [todayHabit, setTodayHabit] = useState([]);

  const dayOfWeek = (day) => {
    switch (day) {
      case 1:
        return "Segunda";
        break;
      case 2:
        return "Terça";
        break;
      case 3:
        return "Quarta";
        break;
      case 4:
        return "Quinta";
        break;
      case 5:
        return "Sexta";
        break;
      case 6:
        return "Sábado";
        break;
      case 7:
        return "Domingo";
        break;
    }
  };

  const handleMessage = () => {
    let count1 = todayHabit.length;
    let totalHabitsChecked = todayHabit.filter(
      (element) => element.done === true
    );
    let count2 = totalHabitsChecked.length;
    let percentage = (count2 * 100) / count1;
    return percentage;
  };

  const percentage = localStorage.setItem("percentage", handleMessage());

  useEffect(() => {
    const config = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/today",
      config
    );
    promise.then((response) => {
      setTodayHabit(response.data);
      localStorage.setItem("todayHabit", response.data);
    });
  }, [todayHabit]);

  console.log(todayHabit);

  const handleCheck = (id) => {
    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/check`,
      {},
      config2
    );
    promise.then((response) => {
      console.log(response);
      setEnable(true);
    });
    promise.catch((error) => {
      console.log(error);
      setEnable(false);
    });
  };

  const handleUncheck = (id) => {
    const config2 = {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    };
    const promise = axios.post(
      `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}/uncheck`,
      {},
      config2
    );
    promise.then((response) => {
      console.log(response);
      setEnable(false);
    });
    promise.catch((error) => {
      console.log(error);
      setEnable(true);
    });
  };

  return (
    <>
      <Container>
        <Header>
          <img src={Trackitlogo} />
          <img className="personalImage" src={image} />
        </Header>
        <Main>
          <Today>
            <p className="today1">
              {dayOfWeek(dayIso)}, {dayOfMonth}/{month}
            </p>
            {handleMessage() === 0 ? (
              <p className="today2">Nenhum Hábito concluído ainda</p>
            ) : (
              <p className="today21">
                {handleMessage().toFixed(0)}% dos hábitos concluídos
              </p>
            )}
          </Today>
          <Habits>
            {todayHabit.map((element) => (
              <HabitUnit
                id={element.id}
                name={element.name}
                enable={enable}
                done={element.done}
                currentSequence={element.currentSequence}
                highestSequence={element.highestSequence}
                handleCheck={handleCheck}
                handleUncheck={handleUncheck}
              />
            ))}
          </Habits>
        </Main>
        <Footer>
          <div>
            <Link to="/habitos">
              <Paragraph2>Hábitos</Paragraph2>
            </Link>
            <Link to="/hoje">
              <div className="progressBar" style={{ width: 100, height: 100 }}>
                <CircularProgressbar
                  color="white"
                  value={handleMessage()}
                  text="Hoje"
                  background
                  backgroundPadding={6}
                  styles={buildStyles({
                    pathTransitionDuration: 0.5,
                    pathColor: "#fff",
                    textColor: "#fff",
                    trailColor: "transparent",
                    backgroundColor: "#52B6FF",
                  })}
                />
              </div>
            </Link>
            <Link to="/historico">
              <Paragraph2>Histórico</Paragraph2>
            </Link>
          </div>
        </Footer>
      </Container>
    </>
  );
};

export default TodayScreen;

const Container = styled.div`
  @media (max-width: 600px) {
    width: 100vw;
    overflow-y: scroll;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    background-color: #f2f2f2;
  }
`;

const Header = styled.div`
  @media (max-width: 600px) {
    z-index: 1;
    display: flex;
    position: fixed;
    left: 0;
    top: 0;
    width: 100%;
    justify-content: space-between;
    align-items: center;
    background-color: #126ba5;
    height: 70px;
    box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.15);
    img {
      padding: 0 20px;
    }
    .personalImage {
      width: 80px;
      height: 50px;
      border-radius: 50%;
    }
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 150px 0;
`;

const Today = styled.div`
  @media (max-width: 600px) {
    margin-top: 80px;
    width: 320px;
    .today1 {
      color: #126ba5;
      font-size: 20px;
      display: flex;
      justify-content: flex-start;
    }
    .today2 {
      color: #bababa;
      font-size: 18px;
    }
    .today21 {
      color: #8fc549;
      font-size: 18px;
    }
  }
`;

const Habits = styled.div`
  display: flex;
  gap: 20px 0;
  flex-direction: column;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 100px;
  width: 320px;
  border-radius: 5px;
  gap: 40px;
`;

const HabitsUnit = styled.div`
  background-color: #fff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 10px;
  width: 320px;
  margin-bottom: -20px;
  gap: 40px;
  height: 80px;

  ion-icon {
    font-size: 100px;
    color: #fff;
  }

  p {
    margin-left: 10px;
    color: #666666;
    font-size: 12px;
  }

  .green-text {
    color: #8fc549;
  }
`;

const HabitPresentation = styled.div`
  margin-top: -10px;
  h4 {
    margin: 10px 0;
    font-size: 16px;
    font-weight: bold;
    color: #666666;
    margin-left: 10px;
  }
`;

const HabitDayCheck = styled.span`
  color: ${(props) => (props.done ? "#8FC549" : "#666666")};
`;

const Checked = styled.div`
  background-color: red;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50px;
  width: 50px;
  background-color: ${(props) => (props.done ? "#8FC549" : "#EBEBEB")};
`;

const Footer = styled.div`
  @media (max-width: 600px) {
    display: flex;
    justify-content: center;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #fff;
    color: #52b6ff;

    div {
      width: 300px;
      display: flex;
      align-items: center;
      justify-content: space-between;
    }
    .progressBar {
      margin-bottom: 50px;
    }
  }
`;

const Paragraph2 = styled.a`
  display: inline-block;
  color: #52b6ff;
`;
