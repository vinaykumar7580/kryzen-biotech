import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Text,
} from "@chakra-ui/react";
import { useState } from "react";
import { Link } from "react-router-dom";

function Register() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("form", formData);

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
          Register
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
          If you have account:{" "}
          <Link to={"/login"}>
            <span style={{ fontWeight: "bold" }}>Login</span>
          </Link>{" "}
        </Text>
      </Box>
    </Box>
  );
}

export default Register;
