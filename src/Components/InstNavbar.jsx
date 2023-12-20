import { Button, HStack } from "@chakra-ui/react";
import React from "react";
import Logo from "./Logo";
import { useNavigate } from "react-router-dom";

const InstNavbar = () => {
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    navigate("/auth");
  };

  return (
    <HStack
      justifyContent="space-between"
      px="10"
      w="100%"
      h="calc(8vh)"
      bg="purple.800"
    >
      <Logo />
      <HStack>
        <Button size='sm' colorScheme='pink' onClick={handleLogin}>Entrar</Button>
      </HStack>
    </HStack>
  );
};

export default InstNavbar;
