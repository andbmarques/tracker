import { HStack, Heading, Icon } from "@chakra-ui/react";
import { Coins } from "phosphor-react";
import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { useNavigate } from "react-router-dom";

const Logo = ({ variant }) => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();

  return (
    <HStack
      cursor="pointer"
      onClick={() => navigate("/")}
      alignItems='center'
      justifyContent='center'
    >
      <Icon as={Coins} color={ variant === 'pink' ? 'pink.500' : "white"} fontSize='24' />
      {variant !== "iconOnly" ? (
        <Heading color={ variant === 'pink' ? 'pink.500' : "white"} size={variant === "sm" ? "sm" : "lg"}>
          Tracker
        </Heading>
      ) : (
        <></>
      )}
    </HStack>
  );
};

export default Logo;
