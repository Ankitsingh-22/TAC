import React from "react";
import {
  Stack,
  Flex,
  Text,
  VStack,
  Box,
  Heading,
  Image,
  useBreakpointValue
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Section3 from "./Section3";
import Section4 from "./Section4";
import workforceImage from "../../../assets/images/Workforce/wf.jpg";
import './globals.css';

// Create motion components for animation
const MotionBox = motion(Box);
const MotionHeading = motion(Heading);

export default function OnCampus() {
  return (
    <>
      {/* Main Container */}
      <Flex direction="column" bgColor="#D7F3FE">
        
        {/* Hero Section */}
        <Flex
          w="full"
          mt={{ base: "10", md: "10", lg: "20", xl: "16" }} // Responsive margin-top
          h={{ base: "95vh", md: "95vh", lg: "85vh", xl: "90vh", "2xl": "95vh", "3xl": "98vh" }}
          direction={{ base: "column", md: "column", lg: "row" }}
          align="center"
          justify="center"
          p={useBreakpointValue({ base: 4, md: 2, lg: 10, xl: 10, "2xl": 10,"3xl": 10 })} 
          bgColor="#D7F3FE"
          position="relative"
          overflow="hidden"
          borderRadius="lg"
          gap={10}
        >
          {/* Content Side */}
          <Flex
            flex={1}
            direction="column"
            align={{ base: "center", md: "flex-start" }}
            justify="center"
            maxW={{ base: "100%", md: "50%" }}
            textAlign={{ base: "center", md: "left" }}
          >
            <VStack align="center" spacing={{ base: 4, md: 6, lg: 2 }}>
              <MotionHeading
                fontFamily="ClashDisplay"
                fontSize={useBreakpointValue({ base: "3xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "7xl", "3xl": "9xl" })}
                fontWeight="bold"
                color="#003B5C"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1 }}
                align="center"
                mt={{ lg: "20px"}}
              >
                Elevate Your Talent Acquisition:
              </MotionHeading>
              <MotionHeading
                fontFamily="ClashDisplay"
                fontSize={useBreakpointValue({ base: "2xl", md: "4xl", lg: "4xl", xl: "5xl", "2xl": "5xl", "3xl": "8xl" })}
                fontWeight="bold"
                color="#F4A460"
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.3 }}
                align="center"
              >
                Premier Workforce Solutions
              </MotionHeading>
              <Text
                fontSize={useBreakpointValue({ base: "md", md: "md", lg: "lg", xl: "xl", "2xl": "2xl", "3xl": "5xl" })}
                maxW="xl"
                align="center"
              >
                Discover top-tier workforce solutions designed to streamline your hiring process and connect you with exceptional talent.
                {/* Our services offer customized recruitment strategies, candidate screening, and talent management to help you build a skilled and dynamic team that drives your organization’s success. */}
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
            mt={{ base: "20px"}}
          >
            <Image
              className="animated-image"
              src={workforceImage}
              alt="OnCampus"
              objectFit="cover"
              boxSize={{ base: "100%", md: "100%" }}
              filter="brightness(1)"
            />
          </Flex>
        </Flex>

        {/* Section 2 */}
        <Flex
           mt={{ base: 5, md: 10 }} // Responsive margin-top
          w="full"
          h={useBreakpointValue({ base: "66vh", md: "60vh", lg: "80vh", xl:"80vh", "2xl": "60vh", "3xl": "55vh" })}
          backgroundImage="url(https://images.unsplash.com/photo-1686771416282-3888ddaf249b?q=80&w=1471&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)"
          backgroundSize="cover"
          backgroundPosition="center center"
          backgroundAttachment="fixed"
          zIndex={1}
          position="relative"
        >
          <VStack
            w="full"
            h="full"
            justify="center"
            alignItems="flex-start"
            px={useBreakpointValue({ base: 4, md: 0, lg: 0, xl: "0", "2xl": "0", "3xl": "0" })}
            bgGradient="linear(to-r, transparent)"
          >
            <Box
              bg="blue.50"
              p={useBreakpointValue({base:2, xl: 6})}
              borderRadius="md"
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
                    Why Should You
                  </Text>
                  <Text as="span" color="blue.400">
                    {' '}Choose Us?
                  </Text>
                </Heading>
              </Flex>
              <Text
                mt={useBreakpointValue({base: 4, "3xl": 12})}
                fontSize={useBreakpointValue({ base: "xs", md: "xs", lg: "md", xl: "lg", "2xl": "2xl", "3xl": "4xl" })}
                fontWeight="400"
                color="black"
              >
                When you partner with us for your workforce needs, you benefit from our commitment to delivering tailored recruitment strategies that align with your organization’s unique requirements. We customize our approach to ensure we connect you with the talent that fits seamlessly into your company’s culture and job specifications. Choosing us means opting for a partner dedicated to not only meeting your immediate hiring needs but also contributing to your long-term success and growth.
              </Text>
            </Box>
          </VStack>
        </Flex>

        {/* Additional Sections */}
        <Section3 />
        <Section4 />
      </Flex>
    </>
  );
}
