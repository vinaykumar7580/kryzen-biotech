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
  Table,
  Tbody,
  Td,
  Text,
  Textarea,
  Th,
  Thead,
  Tr,
  useToast,
} from "@chakra-ui/react";
import builder from "../Components/builder.png";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function Home() {
  const [userData, setUserData] = useState({});
  const [data, setData] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    photo: null,
  });

  const navigate = useNavigate();
  const toast = useToast();

  useEffect(() => {
    getUserDetails();
  }, []);

  const getUserDetails = () => {
    axios
      .get("http://localhost:8080/user/userdata", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        //console.log(res.data)
        setUserData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    handleGetData();
  }, [data]);

  const handleGetData = () => {
    axios
      .get("http://localhost:8080/get-data", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    //console.log("formData", formData);
    axios
      .post("http://localhost:8080/add-data", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          Authorization: `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        toast({
          title: `${res.data.msg}`,
          status: "success",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      })
      .catch((err) => {
        console.log(err);
        toast({
          title: `Data Added Failed`,
          status: "error",
          position: "top",
          duration: 3000,
          isClosable: true,
        });
      });

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
  console.log("data", data);

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
              {userData && userData?.username}
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
          <form onSubmit={handleSubmit} encType="multipart/form-data">
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

            <Button type="submit" colorScheme="blue" mt={"20px"}>
              Submit
            </Button>
          </form>
        </Box>
      </Box>

      <Box
        width={"70%"}
        m={"auto"}
        mt={"70px"}
        mb={"50px"}
        p={"20px"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      >
        <Heading fontSize={"3xl"} fontFamily={"serif"}>
          Data Tables
        </Heading>
        <Table w={"100%"} m={"auto"} variant="simple" mt={"20px"}>
          <Thead>
            <Tr>
              <Th>Sr. No.</Th>
              <Th>Image</Th>
              <Th>Name</Th>
              <Th>Age</Th>
              <Th>Address</Th>
              <Th>Preview</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data &&
              data?.map((el,index) => (
                <Tr key={el._id}>
                  <Td>{index+1}</Td>
                  <Td >
                    {" "}
                    <Image
                      width={"50px"}
                      src={`http://localhost:8080/uploads/${el.photo}`}
                      alt="person-image"
                    />
                  </Td>
                  <Td>{el.name}</Td>
                  <Td>{el.age}</Td>
                  <Td>{el.address}</Td>
                  <Td>
                    {el.name && <Button colorScheme={"orange"} onClick={()=>navigate(`/preview/${el._id}`)}>Preview</Button>}
                  </Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </Box>
    </Box>
  );
}
export default Home;
