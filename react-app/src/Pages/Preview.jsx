import { Box, Button, Heading, Image } from "@chakra-ui/react";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import html2pdf from "html2pdf.js";

function Preview() {
  const [data, setData] = useState({});

  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    handleDataDetails();
  }, []);

  //handleDataDetails function fetch only single data which is data-form data stored in database with the help of id.
  const handleDataDetails = () => {
    axios
      .get(`http://localhost:8080/data/get-data-details/${params.id}`, {
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

  //convertToBase64 function convert image which is coming from backend upload folder to Base64 by caching image filename.
  const convertToBase64 = async (image) => {
    const response = await fetch(`http://localhost:8080/uploads/${image}`);
    const blob = await response.blob();

    return new Promise((resolve) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result);
      reader.readAsDataURL(blob);
    });
  };

  //handleDownload function generate pdf with the help of html2pdf library and allows download the pdf to user.
  const handleDownload = async () => {
    const content = document.getElementById("downloadBox");

    // Convert image to base64
    const imageSrc = await convertToBase64(data?.photo);

    // Update the image source before creating the PDF
    const imgElement = content.querySelector("img");
    imgElement.src = imageSrc;

    // Generate PDF
    html2pdf(content);
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
        {/* This Box contain the navbar on the preview page */}
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
          <Button colorScheme="green" onClick={handleDownload}>
            Download
          </Button>
        </Box>
      </Box>

      {/* This Box shows the image, name, age, address on the preview page and this box content convert html2pdf library to pdf. */}
      <Box
        id="downloadBox"
        width={"450px"}
        m={"auto"}
        mt={"50px"}
        mb={"30px"}
        p={"20px"}
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
