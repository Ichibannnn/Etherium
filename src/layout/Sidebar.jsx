import { Box, Button, Flex, Image, Text, VStack } from "@chakra-ui/react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { sidebarData } from "../sidebarData";


const Header = () => {
  return (
    <Flex alignItems="center" py={4} flexDirection="column">
      <Image
        boxSize="100px"
        objectFit="cover"
        src="/images/etherium.png"
        alt="etheriumlogo"
      />
      <Text className="logo-text" mt={2}>
        ETHERIUM
      </Text>
    </Flex>
  );
};

const SidebarFooter = () => {
  return (
    <Flex color="white" h="40px" fontSize="13px" textAlign="center">
      © 2022, Etherium by Process Automation (MIS)
    </Flex>
  );
};

const SidebarList = ({setNavbarData}) => {

  // const {setNavbarData} = useContext(Context)

  const navigate = useNavigate();

  const handler = (sidebar) =>{
    setNavbarData(sidebar)
    // navigate(sidebar.path)
  }

  return (
    <Flex color="white" h="750px" flexDirection="column" gap={1}  >
      {sidebarData.map((sidebar, o)=> 
      <Button mt={1} bgColor="primary" w="full" justifyContent="left" onClick={() => handler(sidebar)}>
        <Text ml={2}>{sidebar.name}</Text>
      </Button>
      )}
    </Flex>
  );
};

const Sidebar = ({setNavbarData}) => {
  return (
    <Flex minWidth="250px" borderRight="2px" borderColor="#353438" bg="primary">
      <Flex flexDirection="column" width="full">
        <Header />
        <SidebarList setNavbarData={setNavbarData} />
        <SidebarFooter />
      </Flex>
    </Flex>
  );
};

export default Sidebar;
