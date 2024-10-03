import React from "react";
import {
  Flex,
  Text,
  VStack,
  Box,
  Heading,
  Container,
  Image,
  useBreakpointValue
} from "@chakra-ui/react";
import Section3 from "./Section3";
import Section4 from "./Section4";
import { motion } from "framer-motion";
import './globals.css';
import seminarImage from "../../../assets/images/Seminar/s.jpg";

// Create motion components for animation
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function OnCampus() {
  return (
    <>
      <Flex direction="column" bgColor="yellow.100">
        {/* Hero Section */}
        <Flex
          w="full"
          mt={{ base: "10", md: "10", lg: "20", xl: "16" }} // Responsive margin-top
          h={{ base: "95vh", md: "95vh", lg: "85vh", xl: "90vh", "2xl": "95vh", "3xl": "98vh" }}
          direction={{ base: "column", md: "row" }}
          align="center"
          justify="center"
          p={useBreakpointValue({ base: 4, md: 2, lg: 10, xl: 10, "2xl": 10,"3xl": 10 })} 
          position="relative"
          overflow="hidden"
          borderRadius="lg"
        >
          {/* Main Content */}
          <Flex
            direction={{ base: "column", md: "column", lg: "row" }}
            w="full"
            h="full"
            align="center"
            justify="center"
            gap={{ base: 4, md: 8 }}
            zIndex={1}
          >
            {/* Text Side */}
            <Flex
              flex={1}
              direction="column"
              align={useBreakpointValue({ base: "center", md: "center", lg: "flex-start",})}
              justify="center"
              color="black"
              maxW={{ base: "100%", md: "100%", lg: "60%", xl: "50%" }}
              textAlign={{ base: "center", md: "center", xl: "left" }}
              mt={{ base: "40px"}}
            >
              <VStack align="center" spacing={{ base: 4, md: 6 }}>
                <MotionHeading
                  fontFamily="ClashDisplay"
                  fontSize={useBreakpointValue({ base: "3xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "7xl", "3xl": "9xl" })}
                  fontWeight="bold"
                  mt={{lg: "10px"}}
                  color="#2A4365"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  Join Our
                </MotionHeading>
                <MotionHeading
                  fontFamily="ClashDisplay"
                  fontSize={useBreakpointValue({ base: "2xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "5xl", "3xl": "8xl" })}
                  fontWeight="bold"
                  color="#FC8E53"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Transformative Seminars
                </MotionHeading>
                <Text fontSize={useBreakpointValue({ base: "md", md: "md", lg: "lg", xl: "xl", "2xl": "2xl", "3xl": "5xl" })} maxW="xl" align="center">
                  Expand your expertise with our expert-led seminars, designed to provide practical insights and networking opportunities.
                   {/* Enhance your personal and professional growth in an engaging and interactive environment. */}
                </Text>
              </VStack>
            </Flex>

            {/* Image Side */}
            <Flex
              flex={1}
              justify="center"
              align="center"
              w="full"
              h={{ base: "100%", md: "100%" }}
              overflow="hidden"
            >
              <Image
                className="animated-image"
                src={seminarImage}
                alt="OnCampus"
                objectFit="cover"
                boxSize={{ base: "100%", md: "100%" }}
                filter="brightness(1)"
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Section 2 */}
        <Flex
          mt={{ base: 10}}
          w="full"
          h={useBreakpointValue({ base: "66vh", md: "60vh", lg: "80vh", xl:"80vh", "2xl": "60vh", "3xl": "55vh" })}
          backgroundImage="url(https://images.unsplash.com/photo-1606761568499-6d2451b23c66?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
          backgroundSize="cover"
          backgroundPosition="center center"
          backgroundAttachment="fixed"
          zIndex={1}
          position="relative"
        >
          <VStack
            w="full"
            h="full" // Matches the height of the image
            justify="center"
            alignItems="flex-start"
            px={useBreakpointValue({ base: 4, md: 0, lg: 0, xl: "0", "2xl": "0", "3xl": "0" })}
            bgGradient="linear(to-r, blackAlpha.600, transparent)"
          >
            <Box
              bg="#DED0C6"
              p={useBreakpointValue({base:2, xl: 6})}
              borderRadius="md"
              textAlign="left"
              color="black"
              w={useBreakpointValue({ base: "full", md: "70%", lg: "60%", xl: "35%", "2xl": "50%", "3xl": "40%"  })} // Width for the text box
              h="100%"
            >
              <Flex justifyContent="center" alignItems="center">
                <Heading
                  fontFamily="ClashDisplay"
                  fontSize={useBreakpointValue({ base: "2xl", md: "xl", lg: "4xl", xl: "4xl", "2xl": "5xl", "3xl": "6xl" })}
                  fontWeight="bold"
                  p="2"
                >
                  <Text as="span" color="black">
                    Why Should
                  </Text>
                  <Text as="span" color="blue.400">
                    {' '}You Join?
                  </Text>
                </Heading>
              </Flex>
              <Text
                mt={useBreakpointValue({base: 4, "3xl": 12})}
                fontSize={useBreakpointValue({ base: "xs", md: "xs", lg: "md", xl: "lg", "2xl": "2xl", "3xl": "4xl" })}
                fontWeight="400"
                color="black"
              >
                Our seminars offer a unique opportunity to gain expert knowledge from industry leaders and subject matter experts. By attending, you'll have the chance to network with like-minded professionals, expanding your professional connections. You'll acquire practical skills that can be immediately applied to your work, ensuring you stay updated with the latest trends and developments in your field. Our interactive sessions, including discussions, Q&A segments, and hands-on workshops, provide a dynamic and engaging learning experience.
              </Text>
            </Box>
          </VStack>
        </Flex>

        {/* Section 3 */}
        <Section3 />

        {/* Section 4 */}
        <Section4 />
      </Flex>
    </>
  );
}
