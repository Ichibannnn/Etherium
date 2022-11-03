import { Box, Flex, Text } from "@chakra-ui/react";
import React, { useContext, useState } from "react";
import Footer from "./Footer";
import Sidebar from "./Sidebar";
import Header from "./Header";
import Main from "./Main";
import NavBar from "./NavBar";


//

const MainContent = () => {
  const [navBarData, setNavbarData] = useState([]);

  return (
    <Flex h="100vh" bgColor="background">
      <Sidebar setNavbarData={setNavbarData} />
      <Flex flexDirection="column" width="full">
      
        <Header  navBarData={navBarData} />
        <Main />
        <Footer />

        {/* <Flex bgColor="green" width="100%">Nav</Box>
        <Flex bgColor="tomato" width="100%">Main</Box>
        <Flex bgColor="violet" width="100%">Footer</Box> */}
      </Flex>
    </Flex>
  );
};

export default MainContent;
