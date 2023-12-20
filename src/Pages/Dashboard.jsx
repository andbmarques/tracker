import { useContext, useEffect, useState } from "react";
import DashNavbar from "../Components/DashNavbar";
import { AuthContext } from "../Context/authContext";
import { Button, HStack, Heading, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import SideMenu from "../Components/SideMenu";
import HomeDashboard from "./Dashboard/Home";
import TransactionsDashboard from "./Dashboard/Transactions";
import WalletDashboard from "./Dashboard/Wallets";
import GraphsDashboard from "./Dashboard/Graphs";

const Dashboard = () => {
  const { userData } = useContext(AuthContext);
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("Home");

  const handleLoginButton = (e) => {
    e.preventDefault();
    navigate("/auth");
  };

  useEffect(() => {
    !userData.token ? navigate("/auth") : null
  }, []);

  return (
    <>
      <DashNavbar />
      <HStack w="100%" h="calc(92vh)" bg="white">
        <SideMenu setSelectedPage={setSelectedPage} />
        <VStack
          w="96%"
          h="calc(92vh)"
          alignItems="start"
          justifyContent="start"
          p="5"
        >
          {selectedPage && selectedPage === "Home" ? <HomeDashboard /> : <></>}
          {selectedPage && selectedPage === "Transactions" ? (
            <TransactionsDashboard />
          ) : (
            <></>
          )}
          {selectedPage && selectedPage === "Wallets" ? (
            <WalletDashboard />
          ) : (
            <></>
          )}
          {selectedPage && selectedPage === "Graphs" ? (
            <GraphsDashboard />
          ) : (
            <></>
          )}
        </VStack>
      </HStack>
    </>
  );
};

export default Dashboard;
