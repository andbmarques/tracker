import {
  Button,
  HStack,
  Heading,
  IconButton,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import api from "../../api";
import { AuthContext } from "../../Context/authContext";
import { Eye } from "phosphor-react";

const WalletDashboard = () => {
  const { userData } = useContext(AuthContext);
  const [wallets, setWallets] = useState();
  const [wallet, setWallet] = useState();
  const { isOpen, onClose, onOpen } = useDisclosure();

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get("/wallet/user", {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((result) => setWallets(result.data));
  }, [wallets]);

  const handleOpenWallet = async ({ e, id }) => {
    e.preventDefault();
    await api
      .get(`/wallet/${id}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((result) => setWallet(result.data));
    onOpen();
  };

  const handleDeleteWallet = async (e, id) => {
    e.preventDefault();
    setIsDeleteLoading(true);
    await api
      .delete(`/wallet/delete/${id}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((result) => {
        setIsDeleteLoading(false);
        return onClose();
      });
  };

  return (
    <>
      <Heading color="purple.500" size="sm">
        Carteiras
      </Heading>
      <VStack
        p="10"
        w="100%"
        h="100%"
        justifyContent="start"
        alignItems="start"
      >
        {wallets &&
          wallets.map((item) => (
            <HStack
              justifyContent="space-between"
              alignItems="center"
              py="5"
              px="7"
              w="100%"
              borderRadius="md"
              border="2px solid"
              borderColor="gray.200"
              bg="purple.700"
              color="white"
              key={item._id}
            >
              <VStack alignItems="start">
                <Heading size="md" color="purple.200">
                  {item.title}
                </Heading>
                <Text>R${item.balance}</Text>
              </VStack>
              <IconButton
                onClick={(e) => handleOpenWallet({ e: e, id: item._id })}
                icon={<Eye />}
                color="white"
                variant="ghost"
                _hover={{ bg: "purple.800" }}
              />
            </HStack>
          ))}
      </VStack>
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent p="5">
          <ModalHeader>
            <Heading size="lg" color="purple.600">
              {wallet && wallet.title}
            </Heading>
            <ModalCloseButton />
          </ModalHeader>
          <ModalBody>
            <VStack alignItems="start">
              <Heading size="md" color="purple.800">
                Informações
              </Heading>
              <VStack gap="-1" alignItems="start">
                <Text color="black" fontSize="sm">
                  Balanço: R${wallet && wallet.balance}
                </Text>
                <Text color="black" fontSize="sm">
                  Receita: R${wallet && wallet.totalIncome}
                </Text>
                <Text color="black" fontSize="sm">
                  Despesa: R${wallet && wallet.totalExpense}
                </Text>
                <Text color="black" fontSize="sm">
                  Transações: {wallet && wallet.transactions.length}
                </Text>
              </VStack>
            </VStack>
          </ModalBody>
          <ModalFooter>
            <HStack>
              <Button
                isLoading={isDeleteLoading}
                size="sm"
                colorScheme="red"
                onClick={(e) => handleDeleteWallet(e, wallet._id)}
              >
                Deletar
              </Button>
              <Button size="sm" colorScheme="purple" bg='purple.800' onClick={onClose}>
                Cancelar
              </Button>
            </HStack>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
};

export default WalletDashboard;
