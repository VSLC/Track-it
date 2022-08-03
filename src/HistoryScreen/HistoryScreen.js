import Trackitlogo from "../Assets/trackitlogo.png";
import personalPhoto from "../Assets/personalimage.png";
import { Link } from "react-router-dom";
import styled from "styled-components";

const HistoryScreen = () => {
  return (
    <>
      <Container>
        <Header>
          <img src={Trackitlogo}  />
          <img src={personalPhoto} />
        </Header>
        <Main>
          <h2>Histórico</h2>
          <p>Em breve você poderá ver o histórico dos seus hábitos aqui!</p>
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
