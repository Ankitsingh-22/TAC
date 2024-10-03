import React from "react";
import {
  Flex,
  Heading,
  Image,
  Stack,
  Text,
  Box,
  Button,
} from "@chakra-ui/react";
import { Link } from 'react-router-dom';

const CTCSection4 = () => {
  return (
    <Stack minH={"100vh"} direction={{ base: "column", md: 'column', lg: "row" }} mt={0} id="connectus" paddingY={20} bg="yellow.100">
      {/* Image Section */}
      <Flex flex={1} align={"center"} justify={"center"}>
        <Box
          width="80%"  // Adjusted width to reduce image size
          maxWidth="600px"  // Maximum width for larger screens
          position="relative"
          borderRadius="md" // Rounded corners
          boxShadow="lg"  // Shadow effect for a 3D look
          border="2px solid rgba(0, 0, 0, 0.2)"  // Border to enhance the 3D effect
          transition="transform 0.5s ease, box-shadow 0.5s ease"  // Smooth transition for image
          _hover={{
            boxShadow: "0 8px 16px rgba(0, 0, 0, 0.4)",  // Enhanced shadow on hover
            transform: "scale(1.05)",  // Zoom effect on hover
          }}
        >
          <Box
            position="absolute"
            top={0}
            left={0}
            right={0}
            bottom={0}
            zIndex={1}
            background="rgba(0, 0, 0, 0.3)"  // Dark overlay to increase contrast
            opacity={0}
            transition="opacity 0.5s ease"  // Smooth transition for overlay
            _hover={{ opacity: 1 }}  // Show overlay on hover
          />
          <Image
            src="https://media.istockphoto.com/id/1367843837/photo/contemporary-art-collage-group-of-employees-business-people-celebrating-successful-deal.jpg?s=612x612&w=0&k=20&c=W3IxXPuFBlNoVhxdVNcBy0xyFL9wxWT_bzEgRJ8B8JM="
            alt="Section 4 Image"
            objectFit="cover"
            width="100%"
            height={{ base: "50vh", md: "60vh" }}  // Responsive height adjustment
            zIndex={2}
            position="relative"
            transition="transform 0.5s ease"  // Smooth transition for image zoom
          />
        </Box>
      </Flex>

      {/* Text Section */}
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text fontFamily={"ClashDisplay"} color={"blue.400"}>
              Looking to Bridge the Gap Between Campus and Career? <br />Let's Connect!
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"gray.500"}>
            Transform Your Hiring and Engagement Strategies with TalentConnect – Bridging Colleges and Companies for a Seamless Transition!
          </Text>
          <Stack direction={{ base: "column", md: "row" }} spacing={4} mt={4}>
            <Link to="/college-form">
              <Button
                rounded={"full"}
                bg={"gray.500"}
                color={"white"}
                width={100}
                _hover={{ transform: "scale(1.05)", boxShadow: "lg", bgColor:"blue.300" }}
              >
                College
              </Button>
            </Link>
            <Link to="/company-form">
              <Button
                rounded={"full"}
                bg={"gray.500"}
                color={"white"}
                _hover={{ transform: "scale(1.05)", boxShadow: "lg", bgColor:"teal.300" }}
              >
                Company
              </Button>
            </Link>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
};

export default CTCSection4;
