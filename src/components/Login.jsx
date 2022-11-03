import React, { useState } from 'react';
import {
  Flex,
  Heading,
  Input,
  Button,
  FormControl,
  FormLabel,
  Switch,
  useColorMode,
  useColorModeValue,
} from '@chakra-ui/react';
import request from "../services/request";
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';


const Login = () => {

    var [userName, setUserName] = useState("");
    var [password, setPassword] = useState("");
    var [message, setMessage] = useState("");
    var navigate = useNavigate()

    const handleSubmit  = async(event) => {
        
        event.preventDefault();

        var login = { userName, password, message };
    
        var response = await request
          .post("Login/authenticate", login)
          .then((response) => {
            sessionStorage.setItem("userToken", response.data.token)

            
            
            console.log(response)
            navigate("/maincontent");
            Swal.fire("Successfully logged in!", "", "success");
          })
          .catch((err) => {
            Swal.fire({
              icon: "error",
              title: "Oops...",
              text: err.response.data.message,
            });
          });

    }


    const { toggleColorMode } = useColorMode();
    const formBackground = useColorModeValue('gray.100', 'gray.700');
  
    return (
      <Flex h="100vh" alignItems="center" justifyContent="center">
        <Flex
          flexDirection="column"
          bg= {formBackground}
          p={12}
          borderRadius={8}
          boxShadow="lg"
        >
          <Heading className='login-text'mb={6} >Login</Heading>
          <form onSubmit={handleSubmit}>
          <Input
            placeholder="Username"
            type="text"
            variant="flushed"
            mb={3}
         //   onChange={handleChange}
         onChange = {(event) => { 
            setUserName(event.target.value);
         }}

          />
          <Input
            placeholder="Password"
            type="password"
            variant="flushed"
            mb={6}
            
            onChange = {(event) => { 
                setPassword(event.target.value);
             }}
          />
          <Button className="btn-login" colorScheme="teal" mb={8} type='submit' w="full" >
            Log In
          </Button>
          <FormControl display="flex" alignItems="center">
            <FormLabel htmlFor="dark_mode" mb="0">
              Enable Dark Mode?
            </FormLabel>
            <Switch
              id="dark_mode"
              colorScheme="white"
              size="lg"
             onChange={toggleColorMode}
            />
          </FormControl>
          </form>
        </Flex>
      </Flex>
    );
}

export default Login