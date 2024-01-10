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
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../Context/AuthContext";

function Home() {
  // userData store the user details who's login
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
  const { handleLogout } = useContext(AuthContext);

  useEffect(() => {
    getUserDetails();
  }, []);

  //getUserDetails function making the get request through axios for getting user data who's login
  const getUserDetails = () => {
    axios
      .get("https://poised-plum-gharial.cyclic.app/user/userdata", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
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

  //handleGetData function makes get request through axios for getting stored data which user added through data-form
  const handleGetData = () => {
    axios
      .get("https://poised-plum-gharial.cyclic.app/data/get-data", {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${localStorage.getItem("token")}`,
        },
      })
      .then((res) => {
        setData(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  //handleChange function update the value of formData
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  //handlePhotoChange function update the value of photo key in the formData
  const handlePhotoChange = (e) => {
    setFormData({ ...formData, photo: e.target.files[0] });
  };

  //handleSubmit function use for form submission and making post request
  const handleSubmit = (e) => {
    e.preventDefault();

    //make the post request for adding user form data to the database through axios
    
    console.log("formData",formData)
    
    axios
      .post("https://poised-plum-gharial.cyclic.app/data/add-data", formData, {
        headers: {
          
          "Authorization": `${localStorage.getItem("token")}`,
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

  // handleLogoutButton function handle logout functionality and remove token from localstorage and navigate user to login page.
  const handleLogoutButton = () => {
    // remove token from localstorage
    localStorage.removeItem("token");
    //handleLogout function coming from AuthContext.jsx file in the Context folder through context api and makes isAuth is false.
    handleLogout();
    // navigate user to login page
    navigate("/login");
  };

  const { name, age, address, photo } = formData;
  //console.log("data", data);

  return (
    <Box>
      {/*The below Box is showing navbar on Home page */}
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
        {/* The Box which shows logo image on the navbar */}
        <Box w={"170px"}>
          <Image w={"100%"} h={"100%"} src={builder} alt="logo" />
        </Box>

        {/* The Box which is placed in navbar right side and shows user name and image */}
        <Box
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
          gap={"10px"}
        >
          {/* The Box shows login user name on the navbar */}
          <Box>
            <Text fontWeight={"bold"} color={"white"}>
              {userData && userData?.username}
            </Text>
          </Box>

          {/* This Box shows profile image on the navbar rightside. when click on that image, popup will be opening and user can see the logout button */}
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
                {/* This Button is Logout Button which a user can see when click on the profile image on navbar */}
                <Button
                  w="100px"
                  m="auto"
                  colorScheme="orange"
                  onClick={handleLogoutButton}
                >
                  Logout
                </Button>
                <br />
              </PopoverContent>
            </Popover>
          </Box>
        </Box>
      </Box>

      {/*Box shows a data form. In which form user can enter name, age, address and photo   */}
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
        
          <form onSubmit={handleSubmit}>
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

      {/* This Box shows Table on the UI. Table shows information and preview button. */}
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
              data?.map((el, index) => (
                <Tr key={el._id}>
                  <Td>{index + 1}</Td>
                  <Td>
                    {" "}
                    {/* Image src find the image filename on the backend uploads folder and render on the UI. */}
                    <Image
                      width={"50px"}
                      src={`https://poised-plum-gharial.cyclic.app/uploads/${el.photo}`}
                      alt="person-image"
                    />
                  </Td>
                  <Td>{el.name}</Td>
                  <Td>{el.age}</Td>
                  <Td>{el.address}</Td>
                  {/* Preview button navigate user to preview page */}
                  <Td>
                    {el.name && (
                      <Button
                        colorScheme={"orange"}
                        onClick={() => navigate(`/preview/${el._id}`)}
                      >
                        Preview
                      </Button>
                    )}
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
