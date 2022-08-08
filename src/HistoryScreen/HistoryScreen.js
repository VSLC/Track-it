import Trackitlogo from "../Assets/trackitlogo.png";
import { Link } from "react-router-dom";
import styled from "styled-components";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import UserContex from "../contexts/UserContext"
import { useState,useContext } from "react";
import "react-circular-progressbar/dist/styles.css";

const HistoryScreen = () => {
  const {token2,percentage2,setPercentage2}
  const [image, setImage] = useState(localStorage.getItem("image"));
  /*const [percentage, setPercentage] = useState(
    localStorage.getItem("percentage")
  ); Progresso do usuário feito com local storage*/
  console.log(image);
  return (
    <>
      <Container>
        <Header>
          <img src={Trackitlogo} />
          <img className="personalImage" src={image} />
        </Header>
        <Main>
          <h2>Histórico</h2>
          <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
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
                  value={percentage2}
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

export default HistoryScreen;

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

const Main = styled.div`
  margin-top: 100px;
  padding: 0 20px;
  h2 {
    color: #126ba5;
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
