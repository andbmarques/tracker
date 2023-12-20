import {
  Avatar,
  Button,
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  Heading,
  Text,
  VStack,
} from "@chakra-ui/react";
import React, { useContext } from "react";
import { AuthContext } from "../Context/authContext";
import { ArrowArcLeft, Gear, User } from "phosphor-react";
import { useNavigate } from "react-router-dom";

const AccountMenu = ({ isAccountMenuOpen, onAccountMenuClose }) => {
  const { userData, setUserData, setSelectedWallet } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async (e) => {
    e.preventDefault();
    await setUserData({});
    await setSelectedWallet({});
    navigate("/auth");
  };

  return (
    <Drawer isOpen={isAccountMenuOpen} onClose={onAccountMenuClose}>
      <DrawerOverlay />
      <DrawerContent justifyContent="center" alignItems="center" py="10">
        <DrawerHeader>
          <DrawerCloseButton />
        </DrawerHeader>
        <DrawerBody justifyContent="center" alignItems="center">
          <VStack gap="10">
            <VStack px="10" textAlign="center" gap="5">
              <Avatar
                size="xl"
                name={userData.user.name}
                bgGradient="linear(to-b, purple.500, purple.800)"
                color="white"
              />
              <VStack>
                <Heading size="md">{userData.user.name}</Heading>
                <Text color='purple.800'>{userData.user.email}</Text>
              </VStack>
            </VStack>
            <VStack gap="3">
              <Button variant="ghost" px="10" leftIcon={<User />}>
                Perfil
              </Button>
              <Button variant="ghost" px="10" leftIcon={<Gear />}>
                Configurações
              </Button>
            </VStack>
          </VStack>
        </DrawerBody>
        <DrawerFooter>
          <Button
            onClick={handleLogout}
            colorScheme="red"
            px="10"
            leftIcon={<ArrowArcLeft />}
          >
            Sair
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default AccountMenu;
