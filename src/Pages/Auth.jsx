import {
  Button,
  HStack,
  Heading,
  Input,
  Text,
  VStack,
  Link as ChakraLink,
  InputGroup,
  Checkbox,
  useToast,
} from "@chakra-ui/react";
import { Link as ReactRouterLink, useNavigate } from "react-router-dom";
import React, { useContext, useEffect, useState } from "react";
import Logo from "../Components/Logo";
import { AuthContext } from "../Context/authContext";
import api from "../api";

const AuthPage = () => {
  let navigate = useNavigate();
  const [name, setName] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const authContext = useContext(AuthContext);
  const toast = useToast();

  const handleName = (e) => {
    setName(e.target.value);
  };

  const handleEmail = (e) => {
    setEmail(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .post("/auth/login", { email: email, password: password })
      .then((response) => {
        authContext.setUserData({
          token: response.data.token,
          user: response.data.user,
        });
        setIsLoading(false);
        toast({
          title: 'Logado com sucesso!',
          status: 'success',
          duration: 5000,
          isClosable: true
        })
        navigate("/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);

        toast({
          title: "Erro ao logar!",
          description: error.response.data.msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };
  const handleSignup = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .post("/user/", { name: name, email: email, password: password })
      .then((response) => {
        setIsLoading(false);
        authContext.setUserData({
          token: response.data.token,
          user: response.data.user,
        });
        navigate("/dashboard");
      })
      .catch((error) => {
        setIsLoading(false);

        toast({
          title: "Erro ao cadastrar!",
          description: error.response.data.msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      });
  };

  useEffect(() => {
    authContext.userData.token ? navigate("/dashboard") : null;
  });

  return (
    <>
      <VStack
        gap="5"
        alignItems="center"
        justifyContent="center"
        bg="purple.800"
        w="100%"
        h="calc(100vh)"
      >
        <Logo />
        <VStack
          justifyContent="center"
          gap="5"
          px="10"
          w="30%"
          h={isSignup ? "calc(70vh)" : "calc(60vh)"}
          bg="white"
          borderRadius="lg"
        >
          <VStack alignItems="start" w="100%">
            <Heading size="lg" color="purple.600">
              {isSignup ? "Cadastro" : "Login"}
            </Heading>
            <Text color="purple.900">
              Insira seu{isSignup ? "s Dados" : " Email e Senha"} para
              prosseguir.
            </Text>
          </VStack>
          <VStack mb="5" alignItems="start" w="100%">
            {isSignup ? (
              <>
                <Text color="purple.500" fontWeight="bold">
                  Nome
                </Text>
                <Input
                  onChange={handleName}
                  colorScheme="purple"
                  placeholder="Nome"
                  type="email"
                  focusBorderColor="purple.500"
                />{" "}
              </>
            ) : (
              <></>
            )}
            <Text color="purple.500" fontWeight="bold">
              Email
            </Text>
            <Input
              onChange={handleEmail}
              colorScheme="purple"
              placeholder="Email"
              type="email"
              focusBorderColor="purple.500"
            />
            <Text color="purple.500" fontWeight="bold">
              Senha
            </Text>
            <Input
              onChange={handlePassword}
              colorScheme="purple"
              placeholder="Senha"
              type="password"
              focusBorderColor="purple.500"
            />
          </VStack>
          <VStack>
            <HStack>
              <Button
                onClick={isSignup ? handleSignup : handleLogin}
                colorScheme="purple"
                bg="purple.700"
                isLoading={isLoading}
                _hover={{ bg: "purple.800" }}
              >
                {isSignup ? "Cadastrar" : "Login"}
              </Button>
              <Button
                onClick={() => setIsSignup(!isSignup)}
                variant="outline"
                colorScheme="purple"
              >
                {!isSignup ? "Cadastro" : "Login"}
              </Button>
            </HStack>
            <ChakraLink color="purple.900" as={ReactRouterLink} to="/dashboard">
              Esqueceu a senha?
            </ChakraLink>
          </VStack>
        </VStack>
        <Text justifySelf="end" color="whiteAlpha.500">
          Desenvolvido e mantido com ❤️ por: github.com/andbmarques
        </Text>
      </VStack>
    </>
  );
};

export default AuthPage;
