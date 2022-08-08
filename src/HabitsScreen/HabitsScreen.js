import styled from "styled-components";
import Trackitlogo from "../Assets/trackitlogo.png";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import UserContext from "../contexts/UserContext";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

import axios from "axios";

const HabitsScreen = () => {
  const days = ["D", "S", "T", "Q", "Q", "S", "S"];
  const { token2, percentage2, setPercentage2 } = useContext(UserContext);

  const [createHabit, setCreateHabit] = useState(false);
  const [text, setText] = useState(false);
  const [habit, setHabit] = useState("");
  const [enable, setEnable] = useState(true);
  const [newHabits, setNewHabits] = useState([]);
  //const [token, setToken] = useState(localStorage.getItem("token"));//Inutilizado com context api
  const [image, setImage] = useState(localStorage.getItem("image"));
  const [arrayDays, setArrayDays] = useState([]);
  /*const [percentage, setPercentage] = useState(
    localStorage.getItem("percentage")
  ); Progresso do usuário feito com localStorage*/

  console.log(token2);

  const showCreateHabit = () => {
    setCreateHabit(true);
  };
  const hideCreateHabit = () => {
    setCreateHabit(false);
  };

  const UserHabit = ({ name, id }) => {
    return (
      <>
        <Habits>
          <p>{name}</p>
          {enable ? (
            <Days1>
              {days.map((element, index) => (
                <ButtonDays2 key={index}>{element}</ButtonDays2>
              ))}
            </Days1>
          ) : (
            <Days1>
              {days.map((element, index) => (
                <ButtonDays2 key={index} disabled>
                  {element}
                </ButtonDays2>
              ))}
            </Days1>
          )}

          <ion-icon
            name="trash-outline"
            onClick={() => {
              deleteHabit(id);
              loadData();
            }}
          ></ion-icon>
        </Habits>
      </>
    );
  };

  const saveDay = (day) => {
    if (arrayDays.includes(day)) {
      setArrayDays(arrayDays.filter((d) => d !== day));
    } else {
      setArrayDays([...arrayDays, day]);
    }
  };

  console.log(newHabits);

  const loadData = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    };

    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise.then((response) => {
      console.log("Recarregou");
    });
  };

  const handleHabit = (e) => {
    e.preventDefault();
    setEnable(false);
    const config = {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    };
    const object = {
      name: habit,
      days: arrayDays,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      object,
      config
    );
    promise.then((response) => {
      setArrayDays([]);
      setHabit("");
      setEnable(true);
      setCreateHabit(false);
    });
    promise.catch((error) => {
      setEnable(true);
      alert("Erro ao criar o hábito ." + error);
    });
  };

  const getHabits = () => {
    const config = {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    };
    const promise = axios.get(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits",
      config
    );
    promise.then((response) => {
      setNewHabits(response.data);
    });

    if (newHabits.length === 0) {
      setText(true);
    } else {
      setText(false);
    }
  };

  useEffect(getHabits, [newHabits]);

  const deleteHabit = (id) => {
    const config = {
      headers: {
        Authorization: `Bearer ${token2}`,
      },
    };
    if (window.confirm("Deseja deletar o hábito ?")) {
      const promise = axios.delete(
        `https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/habits/${id}`,
        config
      );
      promise.catch((error) => {
        alert("Erro ao deletar hábito. Tente novamente");
      });
    }
  };

  const Loading = () => {
    if (enable) {
      return (
        <ButtonSave
          enable={enable}
          className="button-save"
          onClick={handleHabit}
        >
          Salvar
        </ButtonSave>
      );
    } else {
      return (
        <ButtonSave enable={enable} disabled>
          <ThreeDots height="15px" width="60px" color="#FFFFFF" />
        </ButtonSave>
      );
    }
  };
  return (
    <>
      <Container>
        <Header>
          <img src={Trackitlogo} />
          <img className="personalImage" src={image} />
        </Header>
        <Main>
          <MyHabits>
            <p> Meus Hábitos</p>
            <div onClick={showCreateHabit}>
              <ion-icon name="add-outline"></ion-icon>
            </div>
          </MyHabits>
          {createHabit ? (
            <CreateHabits>
              {enable ? (
                <Input
                  value={habit}
                  enable={enable}
                  type="text"
                  placeholder=" nome do hábito"
                  onChange={(e) => {
                    setHabit(e.target.value);
                  }}
                />
              ) : (
                <Input
                  value={habit}
                  enable={enable}
                  type="text"
                  placeholder=" nome do hábito"
                  onChange={(e) => {
                    setHabit(e.target.value);
                  }}
                  disabled
                />
              )}

              <Days1>
                {days.map((element, index) => (
                  <ButtonDays
                    key={index}
                    backgroundColor={
                      arrayDays.includes(index) ? "#cfcfcf" : "#fff"
                    }
                    color={arrayDays.includes(index) ? "#fff" : "#cfcfcf"}
                    onClick={() => {
                      saveDay(index);
                    }}
                  >
                    {element}
                  </ButtonDays>
                ))}
              </Days1>
              <Buttons>
                {enable ? (
                  <ButtonCancel
                    enable={enable}
                    className="button-cancel"
                    onClick={hideCreateHabit}
                  >
                    Cancelar
                  </ButtonCancel>
                ) : (
                  <ButtonCancel
                    enable={enable}
                    className="button-cancel"
                    onClick={hideCreateHabit}
                    disabled
                  >
                    Cancelar
                  </ButtonCancel>
                )}
                <Loading />
              </Buttons>
            </CreateHabits>
          ) : (
            ""
          )}

          {newHabits.map((habit) => {
            return <UserHabit name={habit.name} id={habit.id} />;
          })}
          {text ? (
            <Paragraph>
              Você não tem nenhum hábito <br /> cadastrado ainda. Adicione um
              hábito <br /> para começar a trackear!
            </Paragraph>
          ) : (
            ""
          )}
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
                  text="Hoje"
                  background
                  value={percentage2}
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

export default HabitsScreen;

const Container = styled.div`
  @media (max-width: 600px) {
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

const MyHabits = styled.div`
  @media (max-width: 600px) {
    margin-top: 100px;
    font-size: 20px;
    color: #126ba5;
    display: flex;
    width: 360px;
    padding: 0 20px;
    justify-content: space-between;
    align-items: center;
    div {
      dispĺay: flex;
      align-items: center;
      padding: 10px 20px;
      border-radius: 4px;
      background-color: #52b6ff;
      cursor: pointer;
    }
  }

  ion-icon {
    font-size: 20px;
    color: #fff;
  }
`;

const Main = styled.main`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: 0 0 150px 0;
`;

const Paragraph = styled.p`
  text-align: left;
  padding: 0 20px;
`;

const Days1 = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 22px;
`;

const CreateHabits = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 320px;
  height: 180px;
  background-color: #fff;
`;

const Input = styled.input`
  width: 280px;
  height: 45px;
  background-color: ${(props) => (props.enable ? "#D4D4D4" : "#FFFFFF")}
  border-radius: 5px;
  border: 1px solid #d5d5d5;
  margin-top: 10px;
  margin-left: 20px;
  ::placeholder {
    color: #dbdbdb;
    font-size: 20px;
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 22px;
  gap: 10px;
`;

const ButtonDays = styled.button`
  border: none;
  padding: 5px 6px;
  border-radius: 6px;
  color: ${(props) => props.color};
  background-color: ${(props) => props.backgroundColor};
`;

const ButtonDays2 = styled.button`
  border: none;
  padding: 5px 6px;
  border-radius: 6px;
`;

const ButtonSave = styled.button`
  padding: 10px 20px;
  background-color: #52b6ff;
  opacity: ${(props) => (props.enable ? 1 : 0.7)};
  color: #fff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
`;

const ButtonCancel = styled.button`
  opacity: ${(props) => (props.enable ? 1 : 0.7)};
  background-color: #fff;
  color: #52b6ff;
  border: none;
  cursor: pointer;
`;

const Habits = styled.div`
  position: relative;
  margin-top: 20px;
  width: 320px;
  background-color: #fff;
  padding: 10px;
  border-radius: 5px;
  ion-icon {
    position: absolute;
    top: 10px;
    right: 10px;
  }
  p {
    margin-left: 20px;
    margin-bottom: 4px;
    margin-top: -2px;
    color: #666666;
  }
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
