import { Flex, Text } from "@chakra-ui/react";
import React from "react";
import { Outlet } from "react-router-dom";

const Main = () => {
  return (
    <Flex height="full" p={3} >
      <Outlet />
    </Flex>
  );
};

export default Main;
