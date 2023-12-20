import {
  Button,
  HStack,
  Heading,
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
  useToast,
} from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import api from "../../api";

const NewTransaction = ({ isOpen, onClose }) => {
  const { userData, selectedWallet } = useContext(AuthContext);
  const toast = useToast();

  const [newTransactionText, setNewTransactionText] = useState();
  const [newTransactionValue, setNewTransactionValue] = useState();
  const [newTransactionType, setNewTransactionType] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const handleNewTransactionText = (e) => {
    setNewTransactionText(e.target.value);
  };
  const handleNewTransactionValue = (e) => {
    setNewTransactionValue(e.target.value);
  };
  const handleNewTransactionType = (e) => {
    setNewTransactionType(e.target.value);
  };

  const handleCreateTransaction = (e) => {
    e.preventDefault();
    setIsLoading(true);
    api
      .post(
        `/transactions/create/${selectedWallet}`,
        {
          title: newTransactionText,
          value: newTransactionValue.replace(/,/g, "."),
          type: newTransactionType,
        },
        { headers: { Authorization: `Bearer ${userData.token}` } }
      )
      .then((result) => {
        setIsLoading(false);
        onClose()
        toast({
          title: "Sucesso!",
          description: 'Carteira criada com sucesso!',
          status: "success",
          duration: 5000,
          isClosable: true,
        })
      })
      .catch((error) =>{
        setIsLoading(false)
        toast({
          title: "Erro!",
          description: error.response.data.msg,
          status: "error",
          duration: 5000,
          isClosable: true,
        })
      });
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="5">
        <ModalHeader>
          <HStack alignItems="center" justifyContent="space-between">
            <Heading size="lg" color="purple.800">
              Criar nova transação
            </Heading>
            <ModalCloseButton />
          </HStack>
        </ModalHeader>
        <ModalBody>
          <VStack alignItems="start">
            <Text fontSize="sm" color="purple.900">
              De um título a sua transação.
            </Text>
            <Input
              colorScheme="purple"
              focusBorderColor="purple.500"
              type="text"
              onChange={handleNewTransactionText}
            />
            <Text fontSize="sm" color="purple.900">
              Qual o valor dela?
            </Text>
            <Input
              colorScheme="purple"
              focusBorderColor="purple.500"
              type="text"
              onChange={handleNewTransactionValue}
            />
            <Text fontSize="sm" color="purple.900">
              Selecione o tipo dela.
            </Text>
            <Select
              colorScheme="purple"
              focusBorderColor="purple.500"
              type="text"
              onChange={handleNewTransactionType}
              placeholder="Tipo"
            >
              <option value="Income">Receita</option>
              <option value="Expense">Despesa</option>
            </Select>
          </VStack>
        </ModalBody>
        <ModalFooter>
          <HStack>
            <Button
              isLoading={isLoading}
              onClick={handleCreateTransaction}
              size="sm"
              colorScheme="purple"
            >
              Criar
            </Button>
            <Button
              onClick={onClose}
              size="sm"
              colorScheme="purple"
              bg="purple.800"
            >
              Cancelar
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default NewTransaction;
