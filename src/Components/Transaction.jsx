import {
  Button,
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
} from "@chakra-ui/react";
import React, { useContext, useEffect, useState } from "react";
import api from "../api";
import { AuthContext } from "../Context/authContext";

const Transaction = ({ id, isOpen, onClose }) => {
  const { userData } = useContext(AuthContext);
  const [transaction, setTransaction] = useState();

  const [isDeleteLoading, setIsDeleteLoading] = useState(false);

  useEffect(() => {
    api
      .get(`/transactions/${id}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((result) => {
        setTransaction(result.data);
      });
  }, [id]);

  const handleDelete = async (e) => {
    e.preventDefault();
    setIsDeleteLoading(true);
    await api.delete(`/transactions/${transaction.wallet}/${transaction._id}`, {
      headers: { Authorization: `Bearer ${userData.token}` },
    }).then(result => result && setIsDeleteLoading(false))
    onClose();
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent p="5">
        <ModalHeader>
          <Heading size="lg" color="purple.600">
            Transação
          </Heading>
          <ModalCloseButton />
        </ModalHeader>
        <ModalBody py="3">
          <VStack alignItems="start">
            <Text fontSize="sm" color="purple.900">
              De um título a sua transação.
            </Text>
            <Input
              colorScheme="purple"
              focusBorderColor="purple.500"
              type="text"
              value={transaction && transaction.title}
              isDisabled
            />
            <Text fontSize="sm" color="purple.900">
              Qual o valor dela?
            </Text>
            <Input
              colorScheme="purple"
              focusBorderColor="purple.500"
              type="text"
              isDisabled
              value={transaction && transaction.value}
            />
            <Text fontSize="sm" color="purple.900">
              Selecione o tipo dela.
            </Text>
            <Select
              colorScheme="purple"
              focusBorderColor="purple.500"
              type="text"
              isDisabled
              value={transaction && transaction.type}
              placeholder="Tipo"
            >
              <option value="Income">Receita</option>
              <option value="Expense">Despesa</option>
            </Select>
          </VStack>
        </ModalBody>
        <ModalFooter gap="2">
          <Button size="sm" isDisabled>
            Salvar
          </Button>
          <Button size="sm" colorScheme="purple">
            Atualizar
          </Button>
          <Button size="sm" isLoading={isDeleteLoading} onClick={handleDelete} colorScheme="red">
            Apagar
          </Button>
          <Button size="sm" onClick={onClose} colorScheme="purple" bg='purple.800'>
            Cancelar
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default Transaction;
