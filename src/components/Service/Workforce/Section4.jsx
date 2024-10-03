import React from "react";
import {
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  useBreakpointValue,
  Box,
  Button,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import section4Image from "../../../assets/images/OnCampus/s4.png"; // Adjust the path as needed

const Section4 = () => {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: "column", lg: "row" }}  mt={{ base: 10, md: 10, lg: 0 }} mb={10}>
      <Flex flex={1} align={"center"} justify={"center"}>
        <Box   
          width="90%"
          maxHeight="50vh"
        >
          <Box
            position="relative"
            overflow="hidden"
            transition="transform 0.5s ease"
            _hover={{ transform: "scale(1.1)" }}
          >
            <Image
              alt={"Section 4 Image"}
              objectFit={"cover"}
              height="100%"
              src={section4Image}
            />
            
          </Box>
        </Box>
      </Flex>
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Flex justifyContent="center" alignItems="center">
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text  fontFamily={"ClashDisplay"} color={"black"}>
             Questions?
             Collaborations?
            </Text>  
            <Text  fontFamily={"ClashDisplay"} color={"blue.400"}>
             Let's Talk.
            </Text> 
                      
          </Heading>
          </Flex>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Empower Your Campus Recruitment with TalentConnect - Your Gateway to Top Talent!
          </Text>
          
          <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={4}>
            <Button
              as={RouterLink}
              to="/contact"
              rounded={"full"}
              bg={"gray.500"}
              color={"white"}
              _hover={{ transform: "scale(1.05)", boxShadow: "lg" , bg: "blue.300", color:"white"}}
            >
              Connect With Us
            </Button>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default Section4;
