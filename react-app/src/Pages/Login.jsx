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
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../Context/AuthContext";

function Login() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const toast = useToast();
  const navigate = useNavigate();
  const { handleLogin } = useContext(AuthContext);

  //handleChange function update the value of formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handleSubmit function use for form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    //make the post request for user login through axios and passing formData
    axios
      .post("http://localhost:8080/user/login", formData)
      .then((res) => {
        console.log(res.data.msg);
        //handleLogin function coming from AuthContext.jsx file in the Context folder through context api and make isAuth is true.
        handleLogin();
        // stored the token in localStorage with key token
        localStorage.setItem("token", res.data.token);
        // toast is use for showing alert on UI
        toast({
          title: `${res.data.msg}`,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
        // over successfull login , it will navigate user to home page
        if(res.data.token){
          navigate("/");
        }
      })
      .catch((err) => {
        //this err is print, when error occur in the post request
        console.log(err);
        toast({
          title: `User Login Failed`,
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      });

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
      {/* the Box contain login name heading and login form */}
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

        {/* The Box shows the login form on the UI with username and password input and submit button */}
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

        {/* The Text element showing the link of register page  */}
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
