import { Button, IconButton, VStack } from "@chakra-ui/react";
import { ArrowsLeftRight, Graph, House, Wallet } from "phosphor-react";
import React from "react";

const SideMenu = ({ setSelectedPage }) => {
  const handlePage = (dest, e) => {
    e.preventDefault();
    setSelectedPage(dest);
  };

  return (
    <VStack
      w="4%"
      h="calc(92vh)"
      bg={"purple.700"}
      alignItems="center"
      px="5"
      justifyContent="center"
    >
      <IconButton
        variant="ghost"
        color="white"
        _hover={{ bg: "purple.800" }}
        fontWeight="bold"
        icon={<House weight="fill" />}
        w="100%"
        justifyContent="center"
        onClick={(e) => handlePage("Home", e)}
      />
      <IconButton
        variant="ghost"
        color="white"
        _hover={{ bg: "purple.800" }}
        fontWeight="bold"
        icon={<ArrowsLeftRight weight="fill" />}
        w="100%"
        justifyContent="center"
        onClick={(e) => handlePage("Transactions", e)}
      />
      <IconButton
        variant="ghost"
        color="white"
        _hover={{ bg: "purple.800" }}
        fontWeight="bold"
        icon={<Wallet weight="fill" />}
        w="100%"
        justifyContent="center"
        onClick={(e) => handlePage("Wallets", e)}
      />
      <IconButton
        variant="ghost"
        color="white"
        _hover={{ bg: "purple.800" }}
        fontWeight="bold"
        icon={<Graph weight="fill" />}
        w="100%"
        justifyContent="center"
        onClick={(e) => handlePage("Graphs", e)}
      />
    </VStack>
  );
};

export default SideMenu;
