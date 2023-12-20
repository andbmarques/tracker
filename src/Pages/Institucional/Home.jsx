import React from "react";
import InstNavbar from "../../Components/InstNavbar";
import { Button, Heading, Text, VStack } from "@chakra-ui/react";
import HomeInstBgImg from "../../Assets/HomeInstBgImg.svg";
import HomeInstImg from "../../Assets/HomeInstImg.svg";
import { useNavigate } from "react-router-dom";

const HomeInst = () => {
  const navigate = useNavigate();

  return (
    <>
      <InstNavbar />
      <VStack
        justifyContent="center"
        alignItems="center"
        bgImage={HomeInstBgImg}
        bgRepeat="no-repeat"
        bgPos="center"
        bgSize="cover"
        h="calc(92vh)"
        w="100%"
        gap="8"
      >
        <Text
          border="2px solid"
          borderColor="purple.100"
          py="1"
          px="2"
          borderRadius="full"
          color="purple.100"
        >
          Simples, prático e grátis.
        </Text>
        <Heading color="white">
          Você no controle da sua vida financeira!!!
        </Heading>

        <Text w="40%" textAlign="center" color="purple.200">
          Transforme suas finanças pessoais com o Tracker - o seu parceiro
          confiável para uma vida financeira saudável! Tome o controle dos seus
          gastos, defina metas inteligentes e alcance a liberdade financeira.
          Junte-se a nós hoje e comece a trilhar o caminho para uma gestão
          financeira mais eficiente. Seu futuro financeiro começa aqui com o
          Tracker. Vamos começar a construir juntos!
        </Text>
        <Button
          onClick={() => navigate("/auth")}
          colorScheme="pink"
          bg="pink.500"
          size='lg'
        >
          Quero conhecer!
        </Button>
      </VStack>
    </>
  );
};

export default HomeInst;
