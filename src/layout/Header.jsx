import { Button, Flex, HStack, Text, Icon } from "@chakra-ui/react";
import { MdLogout } from "react-icons/md";
import { ImMenu } from "react-icons/im";
import React from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";




const Header = ({ navBarData }) => {
  var navigate = useNavigate();

  const logoutHandler = () => {
    Swal.fire({
      title: "Are you sure to logout?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Logout",
    }).then((result) => {
      if (result.isConfirmed) {
        sessionStorage.removeItem("userToken");
        navigate("/");
      }
    });
  };

  
  return (
    <Flex
      
      bgColor="primary"
      borderBottom="2px"
      borderColor="#353438"
      h="54px"
      justifyContent="center"
      alignItems="center"
    >
      
      <ImMenu color="teal" w="50%" size="20px" alignItems="center" />

      <Flex height="54px" w="93%" alignItems="center">
      {navBarData?.subCategory?.map((navbar) => (
        <Button mt={1} bgColor="primary" justifyContent="left" onClick={() => navigate(navbar.path)}>
          <Text color="#fff">{navbar.name}</Text>
        </Button>
      ))}
    </Flex>

    {/* <Text color="white" fontWeight="normal" fontSize="sm">
        Date: {moment().format("MMMM DD, YYYY")}
    </Text> */}
    
      <HStack>
        <Icon as={MdLogout} w={8} h={8} color="white" onClick={logoutHandler} />
      </HStack>
    </Flex>
  );
};

export default Header;
