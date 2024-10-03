import React from "react";
import {
  Flex,
  Text,
  VStack,
  Box,
  Heading,
  Image,
  useBreakpointValue
} from "@chakra-ui/react";
import Section3 from "./Section3";
import Section4 from "./Section4";
import { motion } from "framer-motion";
import './globals.css';
import oncampusImage from "../../../assets/images/OnCampus/oc.png";

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function OnCampus() {
  return (
    <Flex
      direction="column"
      bgColor="#FCEEE3" // Set background color here
    >
      <Flex
        w="full"
        mt={{ base: "10" }}
        h={{ base: "92vh", md: "100vh" }}
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        p={useBreakpointValue({ base: 4, md: 2, lg: 10, "3xl": 20 })} // Added padding for smaller screens
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
          gap={{ base: 4, md: 4, lg: 8 }}
          zIndex={1}
        >
          {/* Text Side */}
          <Flex
            flex={1}
            direction="column"
            align={useBreakpointValue({ base: "center", md: "center", lg: "flex-start",})}
            justify="center"
            color="black"
            maxW={{ base: "100%", md: "100%", lg: "50%" }}
            textAlign={{ base: "center", md: "center", xl: "left" }}
            mt={{ base: "40px"}}
          >
            <VStack align="center" spacing={{ base: 4, md: 6 }}>
              <MotionHeading
                fontFamily="ClashDisplay"
                fontSize={useBreakpointValue({ base: "3xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "7xl", "3xl": "9xl" })}
                fontWeight="bold"
                color="#1E3A8A"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
              >
                OnCampus Connect:
              </MotionHeading>
              <MotionHeading
                fontFamily="ClashDisplay"
                fontSize={useBreakpointValue({ base: "2xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "5xl", "3xl": "8xl" })}
                fontWeight="bold"
                color="#FFA500"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
              >
                Hire Smarter
              </MotionHeading>
              <Text fontSize={useBreakpointValue({ base: "md", md: "md", lg: "lg", xl: "xl", "2xl": "2xl", "3xl": "5xl" })} maxW="xl" align="center">
                Our OnCampus service brings career opportunities directly to students, connecting them with top employers through campus recruitment drives and job events.
              </Text>
            </VStack>
          </Flex>

          {/* Image Side */}
          <Flex
            flex={1}
            justify="center"
            align="center"
            w="full"
            h="100%"
            overflow="hidden"
          >
            <Image
              className="animated-image"
              src={oncampusImage}
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
        w="full"
        h={useBreakpointValue({ base: "66vh", md: "74vh", lg: "80vh", xl:"80vh", "2xl": "65vh", "3xl": "55vh" })}
        backgroundImage={
          'url(https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
        }
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
            w={useBreakpointValue({ base: "full", md: "60%", lg: "60%", xl: "35%", "2xl": "50%", "3xl": "40%"  })} // Width for the text box
            h="100%" // Ensures the height matches the image
          >
            <Flex justifyContent="center" alignItems="center">
              <Heading
                fontFamily="ClashDisplay"
                fontSize={useBreakpointValue({ base: "2xl", md: "xl", lg: "4xl", xl: "4xl", "2xl": "5xl", "3xl": "6xl" })}
                fontWeight="bold"
                color="black"
                p={0}
              >
                Why Should You
              </Heading>
              <Heading
                fontFamily="ClashDisplay"
                fontSize={useBreakpointValue({ base: "2xl", md: "xl", lg: "4xl", xl: "4xl", "2xl": "5xl", "3xl": "6xl" })}
                fontWeight="bold"
                color="blue.400"
              >
                 Hire Us?
              </Heading>
            </Flex>
            <Text
              mt={useBreakpointValue({base: 4, "3xl": 12})}
              fontSize={useBreakpointValue({ base: "xs", md: "xs", lg: "md", xl: "lg", "2xl": "2xl", "3xl": "4xl" })}
              fontWeight="400"
              color="black"
            >
              Hire TalentConnect for top-notch on-campus recruitment solutions and seamless collaboration with universities. Our OnCampus service brings career opportunities directly to students, ensuring a strong brand presence on campus and access to a talent pipeline of pre-screened candidates. With our proven track record of successful campus branding campaigns, we are a trusted partner for companies looking to attract the best young talent. Let us help you take the next step in building your future workforce with our comprehensive on-campus hiring solutions. Choose TalentConnect for a hassle-free recruitment process and access to talented students ready to kickstart their professional journeys.
            </Text>
          </Box>
        </VStack>
      </Flex>

      {/* Section 3 */}
      <Section3 />

      {/* Section 4 */}
      <Section4 />
    </Flex>
  );
}
