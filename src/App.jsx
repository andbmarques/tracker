import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Dashboard from "./Pages/Dashboard";
import { AuthContext } from "./Context/authContext";
import { useState } from "react";
import AuthPage from "./Pages/Auth";
import HomeInst from "./Pages/Institucional/Home";
import usePersistedState from "./Hooks/usePersistedState";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomeInst />,
  },
  {
    path: "/dashboard",
    element: <Dashboard />,
  },
  {
    path: "/auth",
    element: <AuthPage />,
  },
]);

function App() {
  const [userData, setUserData] = usePersistedState('userData', { token: '', user: {} });
  const [selectedWallet, setSelectedWallet] = usePersistedState('selectedWallet', ['']);

  return (
    <>
      <AuthContext.Provider
        value={{ userData, setUserData, selectedWallet, setSelectedWallet }}
      >
        <RouterProvider router={router} />
      </AuthContext.Provider>
    </>
  );
}

export default App;
