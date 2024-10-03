import React from "react";
import {
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Heading,
  Container,
  Image
} from "@chakra-ui/react";
import OCSection3 from "./OCSection3";
import OCSection4 from "./OCSection4";
import { motion } from "framer-motion";
import './globals.css';
import offcampusImage from "../../../assets/images/OffCampus/oc.png";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function OffCampus() {
  return (
    <>
      <Flex
        direction="column"
        bgColor="#B7CFF9" // Set background color here
      >
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
              <VStack align="center" spacing={{ base: 4, md: 6, lg: 4 }}>
                <MotionHeading
                  fontFamily="ClashDisplay"
                  fontSize={useBreakpointValue({ base: "3xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "7xl", "3xl": "9xl" })}
                  fontWeight="bold"
                  mt={{lg: "10px"}}
                  color="purple.600"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1 }}
                >
                  OffCampus Gateway:
                </MotionHeading>
                <MotionHeading
                  fontFamily="ClashDisplay"
                  fontSize={useBreakpointValue({ base: "2xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "5xl", "3xl": "8xl" })}
                  fontWeight="bold"
                  color="#FFFFFF"
                  initial={{ opacity: 0, y: -20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 1, delay: 0.3 }}
                >
                  Your Path to Success
                </MotionHeading>
                <Text fontSize={useBreakpointValue({ base: "md", md: "md", lg: "lg", xl: "xl", "2xl": "2xl", "3xl": "5xl" })} maxW="xl" align="center">
                  TalentConnect's OffCampus service offers a platform for recent graduates and job seekers to explore diverse career opportunities. 
                </Text>
              </VStack>
            </Flex>

            {/* Image Side */}
            <Flex
              flex={1}
              justify="center"
              align="center"
              w="full"
              h="full"
              overflow="hidden"
            >
              <Image
                className="animated-image"
                src={offcampusImage}
                alt="OffCampus"
                objectFit="cover"
                boxSize={{ base: "100%", md: "100%" }}
                filter="brightness(1)"
              />
            </Flex>
          </Flex>
        </Flex>

        {/* Section 2 */}
        <Flex
          w="full"
          h={useBreakpointValue({ base: "66vh", md: "60vh", lg: "80vh", xl:"80vh", "2xl": "60vh", "3xl": "55vh" })}
          backgroundImage={
            'url(https://images.pexels.com/photos/3184424/pexels-photo-3184424.jpeg)'
          }
          backgroundSize="cover"
          backgroundPosition="center center"
          backgroundAttachment="fixed" // Keeps the background image in place
          zIndex={1}
          position="relative"
        >
          <VStack
            w="full"
            h="full" // Matches the height of the image
            justify="center"
            alignItems="flex-start" // Aligns content to the left
            px={useBreakpointValue({ base: 4, md: 0, lg: 0, xl: "0", "2xl": "0", "3xl": "0" })}
            bgGradient="linear(to-r, blackAlpha.600, transparent)" // Gradient from left to transparent
          >
            <Box
              bg="#D7D7F9"
              p={useBreakpointValue({base:2, xl: 6})}
              borderRadius="md"
              textAlign="left"
              color="black"
              w={useBreakpointValue({ base: "full", md: "70%", lg: "60%", xl: "35%", "2xl": "50%", "3xl": "40%"  })} // Width for the text box
              h="100%" // Ensures the height matches the image
            >
              <Flex justifyContent="center" alignItems="center">
                <Heading
                  fontFamily="ClashDisplay"
                  fontSize={useBreakpointValue({ base: "2xl", md: "xl", lg: "4xl", xl: "4xl", "2xl": "5xl", "3xl": "6xl" })}
                  fontWeight="bold"
                  p="2"
                >
                  <Text as="span" color="black">
                    TalentConnect:
                  </Text>
                  <Text as="span" color="blue.400">
                    {' '}Your Partner in OffCampus Success
                  </Text>
                </Heading>
              </Flex>

              <Text
                mt={useBreakpointValue({base: 4, "3xl": 12})}
                fontSize={useBreakpointValue({ base: "xs", md: "xs", lg: "md", xl: "lg", "2xl": "2xl", "3xl": "4xl" })}
                fontWeight="400"
                color="black"
              >
                Unlock a world of career opportunities with TalentConnect's OffCampus service. Designed for recent graduates and job seekers, we facilitate job fairs, networking events, and exclusive job listings to connect you with top employers. Our dedicated team ensures you have access to the best opportunities that match your skills and ambitions. Trust TalentConnect to guide you through a successful career transition and help you achieve your professional dreams.
              </Text>
            </Box>
          </VStack>
        </Flex>

        {/* Section 3 */}
        <OCSection3 />

        {/* Section 4 */}
        <OCSection4 />
      </Flex>
    </>
  );
}
