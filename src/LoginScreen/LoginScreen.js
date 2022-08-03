import styled from "styled-components";
import logo from "../Assets/logo.png";
import { ThreeDots } from "react-loader-spinner";
import { Link, Navigate } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const LoginScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [enable, setEnable] = useState(true);
  const navigate = useNavigate();
  console.log(email, password, enable);

  const handleLogin = (e) => {
    e.preventDefault();
    setEnable(false);
    const loginObject = {
      email: email,
      password: password,
    };

    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/login",
      loginObject
    );

    promise.then((response) => {
      console.log(response.data);
      navigate("/habitos");
    });
    promise.catch((error) => {
      setEnable(true);
      console.log(error);
      alert("Email ou senha errados.");
    });
  };

  const Loading = () => {
    if (enable) {
      return <Button enable={enable} onClick={handleLogin}>Entrar</Button>;
    } else {
      return (
      <Button enable={enable} disabled><ThreeDots height="15px" width="60px" color="#FFFFFF" /></Button>
      )
  }}

  return (
    <>
      <Container>
        <Img src={logo} alt="logo" />
        <Form>
          {enable ? (
            <Input
              enable={enable}
              type={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
            />
          ) : (
            <Input
              enable={enable}
              type={email}
              placeholder="email"
              onChange={(e) => {
                setEmail(e.target.value);
              }}
              disabled
            />
          )}
          {enable ? (
            <Input
              enable={enable}
              type="password"
              placeholder="senha"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
            />
          ) : (
            <Input
              enable={enable}
              type="password"
              placeholder="senha"
              onChange={(e) => {
                setPassword(e.target.value);
              }}
              disabled
            />
          )}
          <Loading />
        </Form>
        <Link to="/cadastro">
          <Register>Não tem uma conta? Cadastre-se!</Register>
        </Link>
      </Container>
    </>
  );
};

export default LoginScreen;

const Container = styled.div`
  * {
    box-sizing: border-box;
  }
  @media (max-width: 600px) {
    display: flex;
    flex-direction: column;
    align-items: center;
    background: #e5e5e5;
    background-color: #fff;
  }
`;

const Img = styled.img`
  @media (max-width: 600px) {
    margin-top: 70px;
    margin-bottom: 40px;
  }
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

const Input = styled.input`
  width: 300px;
  height: 45px;
  margin-bottom: 10px;
  border-radius: 5px;
  background: ${(props) => (props.enable ? "#fff" : "#f2f2f2")};
  border: 1px solid #d5d5d5;
`;

const Button = styled.a`

  display: flex;
  justify-content:center;
  border-radius: 5px;
  background-color: #52b6ff;
  opacity: ${(props) => props.enable ? 1:0.7};
  color: #fff;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  border: none;
  padding: 10px;
  width: 300px;
`;

const Register = styled.p`
  margin-top: 20px;
  color: #52b6ff;
  text-decoration-line: underline;
  font-size: 15px;
  font-weight: bold;
`;
