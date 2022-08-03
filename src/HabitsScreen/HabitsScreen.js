import styled from "styled-components";
import Trackitlogo from "../Assets/trackitlogo.png";
import personalPhoto from "../Assets/personalimage.png";
import { Link } from "react-router-dom";
import { useState } from "react";

const HabitsScreen = () => {
  const [createHabit, setCreateHabit] = useState(false);
  const showCreateHabit = () => {
    setCreateHabit(true);
  };
  const hideCreateHabit = () => {
    setCreateHabit(false);
  };
  return (
    <>
      <Container>
        <Header>
          <img src={Trackitlogo} alt="trackit logo" />
          <img src={personalPhoto} alt="personal image" />
        </Header>
        <Main>
          <MyHabits>
            <p> Meus Hábitos</p>
            <div>
              <ion-icon name="add-outline" onClick={showCreateHabit}></ion-icon>
            </div>
          </MyHabits>
          {createHabit ? (
            <CreateHabits>
              <input type="text" placeholder=" nome do hábito" />
              <Days>
                <div>S</div>
                <div>T</div>
                <div>Q</div>
                <div>Q</div>
                <div>S</div>
                <div>S</div>
                <div>D</div>
              </Days>
              <Buttons>
                <button className="button-cancel" onClick={hideCreateHabit}>
                  Cancelar
                </button>
                <button className="button-save">Salvar</button>
              </Buttons>
            </CreateHabits>
          ) : (
            ""
          )}
          <Habits>
            <p>Ler 1 capítulo de livro</p>
            <Days>
              <div>S</div>
              <div>T</div>
              <div>Q</div>
              <div>Q</div>
              <div>S</div>
              <div>S</div>
              <div>D</div>
            </Days>
            <ion-icon name="trash-outline"></ion-icon>
          </Habits>
          <Habits>
            <p>Ler 1 capítulo de livro</p>
            <Days>
              <div>S</div>
              <div>T</div>
              <div>Q</div>
              <div>Q</div>
              <div>S</div>
              <div>S</div>
              <div>D</div>
            </Days>
            <ion-icon name="trash-outline"></ion-icon>
          </Habits>
          <Habits>
            <p>Ler 1 capítulo de livro</p>
            <Days>
              <div>S</div>
              <div>T</div>
              <div>Q</div>
              <div>Q</div>
              <div>S</div>
              <div>S</div>
              <div>D</div>
            </Days>
            <ion-icon name="trash-outline"></ion-icon>
          </Habits>

          <Paragraph>
            Você não tem nenhum hábito <br /> cadastrado ainda. Adicione um
            hábito <br /> para começar a trackear!
          </Paragraph>
        </Main>
        <Footer>
          <Link to="/habitos">
            <Paragraph2>Hábitos</Paragraph2>
          </Link>
          <Link to="/hoje">
            <ProgressBar>
              <p>Hoje</p>
            </ProgressBar>
          </Link>
          <Link to="/historico">
            <Paragraph2>Histórico</Paragraph2>
          </Link>
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
  display: none;
  text-align: left;
  padding: 0 20px;
`;

const Days = styled.div`
  display: flex;
  gap: 10px;
  justify-content: flex-start;
  margin-top: 10px;
  margin-left: 22px;
  div {
    border: 1px solid #d4d4d4;
    padding: 4px 6px;
    border-radius: 6px;
    color: #d4d4d4;
  }
`;

const CreateHabits = styled.div`
  margin: 10px 0;
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 320px;
  height: 180px;
  background-color: #fff;
  input {
    width: 280px;
    height: 45px;
    border-radius: 5px;
    border: 1px solid #d5d5d5;
    margin-top: 10px;
    margin-left: 20px;
    ::placeholder {
      color: #dbdbdb;
      font-size: 20px;
    }
  }
`;

const Buttons = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-top: 20px;
  margin-right: 22px;
  gap: 10px;

  .button-save {
    padding: 10px 20px;
    background-color: #52b6ff;
    color: #fff;
    border: none;
    border-radius: 4px;
    cursor: pointer;
  }

  .button-cancel {
    background-color: #fff;
    color: #52b6ff;
    border: none;
    cursor: pointer;
  }
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

const Footer = styled.footer`
  @media (max-width: 600px) {
    display: flex;
    justify-content: space-around;
    align-items: center;
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 70px;
    background-color: #fff;
    color: #52b6ff;
  }
`;

const Paragraph2 = styled.a`
  display: inline-block;
  color: #52b6ff;
`;

const ProgressBar = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  bottom: 25px;
  left: 150px;
  padding: 20px;
  border-radius: 50%;
  background-color: #52b6ff;
  color: #fff;
`;
