import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import {
  HStack,
  Heading,
  Icon,
  IconButton,
  Image,
  Spinner,
  Text,
  VStack,
  useDisclosure,
} from "@chakra-ui/react";
import { Chart } from "react-google-charts";
import api from "../../api";
import {
  ArrowFatLineDown,
  ArrowFatLineUp,
  ArrowFatLinesDown,
  Eye,
  Plus,
  Scales,
} from "phosphor-react";
import NewTransaction from "./NewTransaction";
import Transaction from "../../Components/Transaction";
import dashboardHomeWalletImg from "../../Assets/dashboardHomeWallet.svg";

const HomeDashboard = () => {
  const { isOpen, onClose, onOpen } = useDisclosure();
  const {
    isOpen: isTransactionOpen,
    onClose: onTransactionClose,
    onOpen: onTransactionOpen,
  } = useDisclosure();
  const { userData, selectedWallet } = useContext(AuthContext);
  const [wallet, setWallet] = useState();
  const [transactions, setTransactions] = useState();
  const [selectedTransaction, setSelectedTransaction] = useState();

  useEffect(() => {
    api
      .get(`/wallet/${selectedWallet}`, {
        headers: { Authorization: `Bearer ${userData.token}` },
      })
      .then((result) => setWallet(result.data));
  }, [selectedWallet, isOpen, isTransactionOpen, userData]);

  useEffect(() => {
    if (wallet)
      api
        .get(`/transactions/wallet/${wallet && wallet._id}?limit=5&offset=0`, {
          headers: { Authorization: `Bearer ${userData.token}` },
        })
        .then((result) => setTransactions(result.data));
  }, [wallet, isOpen, isTransactionOpen, userData]);

  const handleTransactionOpen = (e, transactionId) => {
    e.preventDefault();
    setSelectedTransaction(transactionId);
    onTransactionOpen();
  };

  return !selectedWallet || !wallet ? (
    <VStack w="100%" alignItems="start" gap="10">
      <Heading color="purple.500" size="sm">
        Home &#62;
      </Heading>
      <VStack
        h="100%"
        p="10"
        justifyContent="center"
        gap="5"
        alignSelf="center"
      >
        <Image src={dashboardHomeWalletImg} boxSize="sm" />
        <Heading color="purple.600">
          Selecione uma carteira para prosseguir.
        </Heading>
      </VStack>
    </VStack>
  ) : (
    <VStack w="100%" alignItems="start" gap="10">
      <Heading color="purple.500" size="sm">
        Home &#62; {wallet && wallet.title}{" "}
      </Heading>
      <HStack alignItems="center" justifyContent="center" gap="5" w="100%">
        <HStack
          px="5"
          gap="5"
          w="20%"
          h="20"
          borderRadius="2xl"
          bg="purple.900"
        >
          <Icon
            bgGradient="linear(to-b, purple.500, purple.700)"
            color="white"
            fontSize={48}
            p="2"
            borderRadius="full"
            as={Scales}
          />
          <VStack gap="-5" alignItems="start">
            <Heading size="sm" color="purple.500">
              Balanço
            </Heading>
            <Text fontSize="xl" fontWeight="bold" color="white">
              R${wallet && wallet.balance}
            </Text>
          </VStack>
        </HStack>
        <HStack
          px="5"
          gap="5"
          w="20%"
          h="20"
          borderRadius="2xl"
          bg="purple.900"
        >
          <Icon
            bgGradient="linear(to-b, purple.500, purple.700)"
            color="white"
            fontSize={48}
            p="2"
            borderRadius="full"
            as={ArrowFatLineUp}
            weight="duotone"
          />
          <VStack gap="-5" alignItems="start">
            <Heading size="sm" color="purple.500">
              Receitas
            </Heading>
            <Text fontSize="xl" fontWeight="bold" color="white">
              R${wallet && wallet.totalIncome}
            </Text>
          </VStack>
        </HStack>
        <HStack
          px="5"
          gap="5"
          w="20%"
          h="20"
          borderRadius="2xl"
          bg="purple.900"
        >
          <Icon
            bgGradient="linear(to-b, purple.500, purple.700)"
            color="white"
            fontSize={48}
            p="2"
            borderRadius="full"
            as={ArrowFatLineDown}
            weight="duotone"
          />
          <VStack gap="-5" alignItems="start">
            <Heading size="sm" color="purple.500">
              Despesas
            </Heading>
            <Text fontSize="xl" fontWeight="bold" color="white">
              R${wallet && wallet.totalExpense}
            </Text>
          </VStack>
        </HStack>
        <HStack
          px="5"
          gap="5"
          w="20%"
          h="20"
          borderRadius="2xl"
          bg="purple.900"
          _hover={{ bg: "purple.800" }}
          cursor="pointer"
          onClick={onOpen}
        >
          <Icon
            bgGradient="linear(to-b, purple.500, purple.700)"
            color="white"
            fontSize={48}
            p="2"
            borderRadius="full"
            as={Plus}
            weight="duotone"
          />
          <VStack gap="-5" alignItems="start">
            <Heading size="sm" color="white">
              Criar nova transação
            </Heading>
          </VStack>
        </HStack>
      </HStack>
      <HStack px="10" py="0" w="100%" h="calc(60vh)">
        <VStack h="100%" alignItems="start" justifyContent="start" w="50%">
          <Heading size="md" color="purple.800">
            Ultimas transações
          </Heading>
          <VStack mt="2" alignItems="start" w="100%" h="100%">
            {transactions &&
              transactions.map((item, index) => {
                return (
                  <HStack
                    w="100%"
                    h="20%"
                    bg="gray.100"
                    borderRadius="md"
                    px="7"
                    justifyContent="space-between"
                    key={index}
                    borderLeft="8px solid"
                    borderLeftColor={
                      item.type === "Income" ? "green.600" : "red.600"
                    }
                  >
                    <VStack gap="-1">
                      <Text
                        fontWeight="bold"
                        color={item.type === "Income" ? "green.600" : "red.600"}
                      >
                        {item.title}
                      </Text>
                    </VStack>
                    <HStack gap="5">
                      <Text fontSize="lg" fontWeight="bold" color="purple.900">
                        R${item.value}
                      </Text>
                      <IconButton
                        borderRadius="full"
                        icon={<Eye />}
                        bg="gray.300"
                        color="white"
                        _hover={{ bg: "purple.500" }}
                        onClick={(e) => handleTransactionOpen(e, item._id)}
                      />
                    </HStack>
                  </HStack>
                );
              })}
          </VStack>
        </VStack>
        <VStack
          alignItems="center"
          gap="-1"
          py="10"
          justifyContent="center"
          w="50%"
          h="100%"
        >
          <VStack>
            <Heading size="md" color="purple.800">
              Receitas x Despesas
            </Heading>
            <Text fontSize="sm">
              Confira a comparação das suas receitas e despesas.
            </Text>
          </VStack>
          {
            wallet ? <Chart
            options={{
              width: "100%",
              legend: { position: "none" },
            }}
            chartType="ColumnChart"
            width="100%"
            height="100%"
            data={[
              ["Transações", "Valor total", { role: "style" }],
              ["Receitas", wallet && wallet.totalIncome, "#38A169"],
              ["Despesas", wallet && wallet.totalExpense, "#E53E3E"],
              ["Balanço", wallet && wallet.balance, "#553C9A"],
            ]}
          /> : <Spinner m='10' colorScheme='purple' color='purple.500' />
          }
        </VStack>
      </HStack>
      <NewTransaction
        isOpen={isOpen}
        onClose={onClose}
        walletId={wallet && wallet._id}
      />
      <Transaction
        id={selectedTransaction}
        isOpen={isTransactionOpen}
        onClose={onTransactionClose}
      />
    </VStack>
  );
};

export default HomeDashboard;
