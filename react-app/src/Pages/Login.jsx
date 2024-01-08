import {
    Box,
    Button,
    FormControl,
    FormLabel,
    Heading,
    Image,
    Input,
    Text,
    useToast,
  } from "@chakra-ui/react";
import axios from "axios";
  import { useState } from "react";
  import { Link, useNavigate } from "react-router-dom";
  
  function Login() {
    const [formData, setFormData] = useState({
      username: "",
      password: "",
    });

    const toast = useToast()
    const navigate=useNavigate()
  
    const handleChange = (e) => {
      const { name, value } = e.target;
      setFormData({ ...formData, [name]: value });
    };
  
    const handleSubmit = (e) => {
      e.preventDefault();
  
      //console.log("form", formData);
      axios.post("http://localhost:8080/user/login", formData)
      .then((res)=>{
        console.log(res.data.msg)
        localStorage.setItem("token", res.data.token)
        toast({
          title: `${res.data.msg}`,
          status: 'success',
          position:"top",
          duration: 3000,
          isClosable: true,
        })
        navigate("/")
  
      })
      .catch((err)=>{
        console.log(err)
        toast({
          title: `User Login Failed`,
          status: 'error',
          position:"top",
          duration: 3000,
          isClosable: true,
        })
  
      })
      
      
  
      setFormData({
        username: "",
        password: "",
      });
    };
  
    const { username, password } = formData;
  
    return (
      <Box
        h={"100vh"}
        pt={"150px"}
        background={
          "linear-gradient(223.23deg, rgb(133, 13, 99), rgb(92, 98, 214))"
        }
      >
        <Box
          w={"30%"}
          m={"auto"}
          p={"40px"}
          backgroundColor={"white"}
          borderRadius={"10px"}
        >
          <Heading fontSize={"3xl"} fontFamily={"serif"}>
            Login
          </Heading>
          <Box mt={"10px"}>
            <FormControl>
              <FormLabel>User Name</FormLabel>
              <Input
                type="text"
                placeholder={"Enter username"}
                name="username"
                value={username}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
  
            <FormControl mt={"10px"}>
              <FormLabel>Password</FormLabel>
              <Input
                type="password"
                placeholder={"Enter password"}
                name="password"
                value={password}
                onChange={handleChange}
                isRequired
              />
            </FormControl>
  
            <Button colorScheme="blue" mt={"20px"} onClick={handleSubmit}>
              Submit
            </Button>
          </Box>
          <Text mt={"30px"}>
            If you want to register:{" "}
            <Link to={"/register"}>
              <span style={{ fontWeight: "bold" }}>Register</span>
            </Link>{" "}
          </Text>
        </Box>
      </Box>
    );
  }
  
  export default Login;
  