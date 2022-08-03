import styled from "styled-components";
import logo from "../Assets/logo.png";
import { ThreeDots } from "react-loader-spinner";
import { Link } from "react-router-dom";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const RegistrationScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [photo, setPhoto] = useState("");
  const [enable, setEnable] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    setEnable(false);
    e.preventDefault();
    const object = {
      email: email,
      name: name,
      image: photo,
      password: password,
    };
    const promise = axios.post(
      "https://mock-api.bootcamp.respondeai.com.br/api/v2/trackit/auth/sign-up",
      object
    );
    promise.then((response) => {
      navigate("/");
      console.log(object);
    });
    promise.catch((error) => {
      setEnable(true);
      alert("Requisição falhou. Preencha os campos corretamente.");
    });
  };

  const Loading = () => {
    if (enable) {
      return <Button enable={enable}>Cadastrar</Button>;
    } else {
      return (
        <Button enable={enable} disabled>
          <ThreeDots height="15px" width="60px" color="#FFFFFF" />
        </Button>
      );
    }
  };

  return (
    <>
      <Container>
        <Img src={logo} alt="logo" />
        <Form onSubmit={handleSubmit}>
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
          {enable ? (
            <Input
              enable={enable}
              type={name}
              placeholder="nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
            />
          ) : (
            <Input
              enable={enable}
              type={name}
              placeholder="nome"
              onChange={(e) => {
                setName(e.target.value);
              }}
              disabled
            />
          )}

          {enable ? (
            <Input
              enable={enable}
              type={photo}
              placeholder="foto"
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
            />
          ) : (
            <Input
              enable={enable}
              type={photo}
              placeholder="foto"
              onChange={(e) => {
                setPhoto(e.target.value);
              }}
              disabled
            />
          )}
          <Loading />
        </Form>
        <Link to="/">
          <Register>Já tem uma conta? Faça login!</Register>
        </Link>
      </Container>
    </>
  );
};

export default RegistrationScreen;

const Container = styled.div`
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

const Button = styled.button`
  display: flex;
  justify-content: center;
  border-radius: 5px;
  background-color: #52b6ff;
  opacity: ${(props) => (props.enable ? 1 : 0.7)};
  color: #fff;
  font-weight: 400;
  font-size: 20px;
  text-align: center;
  border: none;
  padding: 10px;
`;

const Register = styled.p`
  margin-top: 20px;
  color: #52b6ff;
  text-decoration-line: underline;
  font-size: 15px;
  font-weight: bold;
`;
