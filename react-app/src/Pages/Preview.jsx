import { Box, Button, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Preview() {
  const [data, setData] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleDataDetails();
  }, []);

  const handleDataDetails = () => {
    axios
      .get(`http://localhost:8080/get-data-details/${params.id}`, {
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

  return (
    <Box>
      <Box
        display={"flex"}
        justifyContent={"space-between"}
        alignItems={"center"}
        p={"10px 200px"}
        boxShadow={"base"}
        background={
          "linear-gradient(223.23deg, rgb(133, 13, 99), rgb(92, 98, 214))"
        }
      >
        <Box>
          <Heading fontSize={"3xl"} fontFamily={"serif"} color={"white"}>
            Data Preview
          </Heading>
        </Box>
        <Box
          display={"flex"}
          justifyContent={"space-between"}
          alignItems={"center"}
          gap={"20px"}
        >
          <Button colorScheme="red" onClick={() => navigate("/")}>
            Home
          </Button>
          <Button colorScheme="green">Download</Button>
        </Box>
      </Box>

      <Box
        width={"30%"}
        m={"auto"}
        mt={"50px"}
        mb={"30px"}
        p={"20px"}
        // display={"flex"}
        // justifyContent={"left"}
        // alignItems={"flex-start"}
        backgroundColor={"white"}
        borderRadius={"10px"}
        boxShadow="rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px"
      >
        <Box h={"450px"}>
          <Image
            w={"100%"}
            h={"100%"}
            src={`http://localhost:8080/uploads/${data && data?.photo}`}
            alt="person-image"
          />
        </Box>
        <Box textAlign={"left"} pt={"10px"}>
          <Heading fontSize={"2xl"} fontFamily={"serif"}>
            Name: {data && data?.name}
          </Heading>
          <Heading fontSize={"2xl"} fontFamily={"serif"}>
            Age: {data && data?.age} yrs
          </Heading>
          <Heading fontSize={"2xl"} fontFamily={"serif"}>
            Address: {data && data?.address}
          </Heading>
        </Box>
      </Box>
    </Box>
  );
}
export default Preview;
