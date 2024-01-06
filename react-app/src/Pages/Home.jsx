import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Heading,
  Image,
  Input,
  Popover,
  PopoverArrow,
  PopoverContent,
  PopoverTrigger,
  Text,
  Textarea,
} from "@chakra-ui/react";
import builder from "../Components/builder.png";
import { useNavigate } from "react-router-dom";
import { useState } from "react";

function Home() {
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    photo: null,
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("formData", formData);

    setFormData({
      name: "",
      age: "",
      address: "",
      photo: null,
    });
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const { name, age, address, photo } = formData;
  return (
    <Box>
      {/* navbar box */}
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"10px 50px"}
        boxShadow={"base"}
        background={
          "linear-gradient(223.23deg, rgb(133, 13, 99), rgb(92, 98, 214))"
        }
      >
        <Box w={"170px"}>
          <Image w={"100%"} h={"100%"} src={builder} alt="logo" />
        </Box>
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
        >
          <Box>
            <Text fontWeight={"bold"} color={"white"}>
              Vinay Hatwar
            </Text>
          </Box>
          <Box cursor={"pointer"}>
            <Popover>
              <PopoverTrigger>
                <Image
                  borderRadius="full"
                  boxSize="30px"
                  src="https://bit.ly/dan-abramov"
                  alt="Dan Abramov"
                />
              </PopoverTrigger>
              <PopoverContent>
                <PopoverArrow />
                <br />
                <Button
                  w="100px"
                  m="auto"
                  colorScheme="orange"
                  onClick={handleLogout}
                >
                  Logout
                </Button>
                <br />
              </PopoverContent>
            </Popover>
          </Box>
        </Box>
      </Box>
      {/* data form */}
      <Box
        w={"30%"}
        m={"auto"}
        p={"40px"}
        mt={"50px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      >
        <Heading fontSize={"3xl"} fontFamily={"serif"}>
          Data Form
        </Heading>
        <Box mt={"10px"}>
          <FormControl>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              placeholder={"Enter name"}
              name="name"
              value={name}
              onChange={handleChange}
              isRequired
            />
          </FormControl>

          <FormControl mt={"10px"}>
            <FormLabel>Age</FormLabel>
            <Input
              type="text"
              placeholder={"Enter age"}
              name="age"
              value={age}
              onChange={handleChange}
              isRequired
            />
          </FormControl>

          <FormControl mt={"10px"}>
            <FormLabel>Address</FormLabel>
            <Textarea
              placeholder="Enter address"
              name="address"
              value={address}
              onChange={handleChange}
              isRequired
            />
          </FormControl>

          <FormControl mt={"10px"}>
            <FormLabel>Photo</FormLabel>
            <Input
              border={"none"}
              outline={"none"}
              type="file"
              name="photo"
              onChange={handlePhotoChange}
            />
          </FormControl>

          <Button colorScheme="blue" mt={"20px"} onClick={handleSubmit}>
            Submit
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
export default Home;
