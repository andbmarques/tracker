import {
  Avatar,
  Button,
  Drawer,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  HStack,
  Heading,
  IconButton,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Select,
  Text,
  VStack,
  useDisclosure,
  useToast,
} from "@chakra-ui/react";
import Logo from "./Logo";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../Context/authContext";
import api from "../api";
import { Plus } from "phosphor-react";
import AccountMenu from "./AccountMenu";

const DashNavbar = () => {
  const { userData, setSelectedWallet, selectedWallet } =
    useContext(AuthContext);
  const [wallets, setWallets] = useState();
  const [newWallet, setNewWallet] = useState();
  const {
    isOpen: isAccountMenuOpen,
    onClose: onAccountMenuClose,
    onOpen: onAccountMenuOpen,
  } = useDisclosure();
  const {
    isOpen: isCreateWalletOpen,
    onClose: onCreateWalletClose,
    onOpen: onCreateWalletOpen,
  } = useDisclosure();
  const toast = useToast();

  useEffect(() => {
    api
      .get("/wallet/user", {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((result) => setWallets(result.data))
      .catch((error) =>
        toast({
          title: "Erro!",
          description: error.response.data.msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
  }, [wallets, userData]);

  const handleNewWalletText = (e) => {
    setNewWallet(e.target.value);
  };

  const handleNewWallet = async (e) => {
    e.preventDefault();
    await api
      .post(
        "/wallet/create",
        {
          title: newWallet,
        },
        { headers: { Authorization: `Bearer ${userData.token}` } }
      )
      .then((result) => setSelectedWallet(result.data._id))
      .catch((error) =>
        toast({
          title: "Erro!",
          description: error.response.data.msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      );
    onCreateWalletClose();
  };

  const handleSelectWallet = (e) => {
    setSelectedWallet(e.target.value);
  };

  return (
    <>
      <HStack
        alignItems="center"
        justifyContent="space-between"
        px="10"
        w="100%"
        h="calc(8vh)"
        bg="purple.900"
      >
        <Logo variant="iconOnly" />
        <HStack gap="5">
          <HStack>
            <IconButton
              icon={<Plus color="white" weight="bold" />}
              variant="ghost"
              onClick={onCreateWalletOpen}
              _hover={{ bg: "purple.800" }}
            />
            <Select
              _hover={{ bg: "purple.700" }}
              variant="filled"
              color="white"
              bg="purple.800"
              w="100%"
              onChange={handleSelectWallet}
              value={selectedWallet}
              focusBorderColor="pink.500"
              placeholder="Carteiras"
            >
              {/* <option value="placeholder" disabled>
                {wallets
                  ? `Carteiras (${wallets.length})`
                  : "Crie uma carteira"}
              </option> */}
              {wallets &&
                wallets.map((item) => {
                  return (
                    <option
                      style={{ background: "#553C9A" }}
                      key={item._id}
                      value={item._id}
                    >
                      {item.title}
                    </option>
                  );
                })}
            </Select>
          </HStack>
          <Avatar
            name={userData.user.name}
            bg="pink.500"
            color="white"
            cursor="pointer"
            size="sm"
            onClick={onAccountMenuOpen}
          />
        </HStack>
      </HStack>
      <AccountMenu
        isAccountMenuOpen={isAccountMenuOpen}
        onAccountMenuClose={onAccountMenuClose}
      />
      <Modal isOpen={isCreateWalletOpen} onClose={onCreateWalletClose}>
        <ModalOverlay />
        <ModalContent p="5">
          <ModalHeader>
            <HStack alignItems="center" justifyContent="space-between">
              <Heading size="lg" color="purple.800">
                Criar nova carteira
              </Heading>
              <ModalCloseButton />
            </HStack>
          </ModalHeader>
          <ModalBody>
            <VStack alignItems="start">
              <Text fontSize="sm" color="purple.900">
                De um título a sua carteira.
              </Text>
              <Input
                colorScheme="purple"
                focusBorderColor="purple.500"
                type="text"
                onChange={handleNewWalletText}
              />
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button onClick={handleNewWallet} size="md" colorScheme="purple">
                Criar
              </Button>
              <Button
                onClick={onCreateWalletClose}
                size="md"
                variant="outline"
                colorScheme="purple"
              >
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default DashNavbar;
