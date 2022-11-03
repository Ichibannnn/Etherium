import React from "react";
import { Routes, Route } from "react-router-dom";
import { ChakraProvider, extendTheme, theme as base } from "@chakra-ui/react";

import Login from "./components/Login";
import MainContent from "./layout/MainContent";

//COMPONENTS FOR SETUP
import Customers from "./components/Customers";
import LotManagement from "./pages/setup/LotManagement";

//COMPONENTS FOR IMPORT
import ImportPO from "./pages/import/ImportPO";




const theme = extendTheme({
  colors: {
    primary: "#232329",
    secondary: "#D790F0",
    accent: "#7d87f9",
    background: "#353438",
  },
  fonts: {
    heading: `Poppins, ${base.fonts?.heading}`,
    body: `Poppins Regular 400, ${base.fonts?.body}`
  }
});

const App = () => {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
        <Route path="/" element={<Login />} />
        
        <Route path="maincontent" element={<MainContent />} > 
          <Route path="setup/uom-management" element={<Customers />} />
          <Route path="setup/lot-management" element={<LotManagement />} />

          <Route path="import/import-po" element={<ImportPO />} />
        </Route>
      </Routes>
    </ChakraProvider>
  );
};

export default App;
