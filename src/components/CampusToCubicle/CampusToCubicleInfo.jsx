import React from "react";
import {
  Button,
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Heading,
  Container,
} from "@chakra-ui/react";

import { Link } from 'react-router-dom';
import CTCSection3 from "./CTCsection3";
import CTCSection4 from "./CTCsection4";
import Hero from "./Hero"
import College from "./College"
import Company from "./Company"



export default function CampusToCubicleInfo() {

  return (
    <>
      {/* Section 1 */}
      {/* <Flex
        w={"full"}
        h={"100vh"}
        backgroundImage={
          'url(https://images.unsplash.com/photo-1577412647305-991150c7d163?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        backgroundAttachment={"fixed"}
        zIndex={1}
        position="relative"
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, blackAlpha.600, transparent)"}
        >
          <Stack maxW={"2xl"} spacing={6} position="absolute" right="8" bottom="20" top="20">
            <Box
              bg="rgba(245, 245, 245, 0.8)"
              p={10}
              borderRadius="md"
              textAlign="left"
              color="black"
              maxW="lg"
            >
              <Heading fontFamily={"ClashDisplay"} fontSize={{ base: "2xl", md: "5xl" }} fontWeight="bold" color="blue.400">
                CampusToCubicle: Partnering for Future Success
              </Heading>
              <Text mt={4} fontSize={{ base: "md", md: "lg" }} color="gray.800">
                  TalentConnect revolutionizes the campus-to-cubicle journey for colleges and companies. Our tech platform integrates company needs with college engagement, ensuring efficient recruitment and personalized campaigns. We handle the entire hiring process and provide on-demand training for new hires, bridging the gap between campus and career.
              </Text>
            </Box>
          </Stack>
        </VStack>
      </Flex> */}

      {/* CTCSection 2 - for college*/}
      {/* <Flex
        mt={185}
        w={"full"}
        h={"80vh"}
        backgroundImage={
          'url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg)'
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        backgroundAttachment={"fixed"} // This makes the background image stay in place
        zIndex={1}
        position="relative"
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, transparent, blackAlpha.600)"}
        >
          <Stack maxW={"2xl"} spacing={6} position="absolute" left="8" >
            <Box
              bg="gray.100"
              p={10}
              borderRadius="md"
              textAlign="left"
              color="black"
              maxW="lg"
              minH="700px" // Increase the height of the box
            >
              <Heading fontFamily={"ClashDisplay"} fontSize={{ base: "2xl", md: "5xl" }} fontWeight="bold" color="blue.400">
                For Colleges : Why Collaborate with TalentConnect?
              </Heading>
              <Text mt={4} fontSize={{ base: "1x1", md: "2x1" }} color="gray.800">
                In Talentconnect, we redefine the journey from academia to professional excellence. Our
                innovative approach connects bright young talents from colleges and universities with
                companies, creating synergies that shape future careers. We believe in fostering collaboration
                among talent, educational institutions, and organizations to cultivate a thriving workforce. At
                TalentConnect, we not only train candidates with cutting-edge skills but also take full
                responsibility for their recruitment journey. Our tailored on-demand training programs ensure
                that freshly hired individuals seamlessly transition from campus life to corporate success,
                helping them discover and thrive in their dream jobs. At TalentConnect, candidates will embark
                on a transformative career journey where your potential meets limitless opportunities.
              </Text>
              <Flex mt={8} justify="center"  position="absolute" bottom={8} left="50%" transform="translateX(-50%)">
               <Link to="/college-form">
                  <Button
                    rounded={"full"}
                    bg={"blue.400"}
                    color={"white"}
                    _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                  >
                    Empower Your Students
                  </Button>
                </Link>
            </Flex>
            </Box>
          </Stack>
        </VStack>
      </Flex> */}

      {/* CTCSection 2 - for company */}
      {/* <Flex
        mt={185}
        w={"full"}
        h={"80vh"}
        backgroundImage={
          'url(https://images.pexels.com/photos/3183183/pexels-photo-3183183.jpeg)'
        }
        backgroundSize={"cover"}
        backgroundPosition={"center center"}
        backgroundAttachment={"fixed"} // This makes the background image stay in place
        zIndex={1}
        position="relative"
      >
        <VStack
          w={"full"}
          justify={"center"}
          px={useBreakpointValue({ base: 4, md: 8 })}
          bgGradient={"linear(to-r, transparent, blackAlpha.600)"}
        >
          <Stack maxW={"2xl"} spacing={6} position="absolute" right="8" >
            <Box
              bg="gray.100"
              p={10}
              borderRadius="md"
              textAlign="left"
              color="black"
              maxW="lg"
              minH="700px" // Increase the height of the box
            >
              <Heading fontFamily={"ClashDisplay"} fontSize={{ base: "2xl", md: "5xl" }} fontWeight="bold" color="blue.400">
                For Companies: Why Partner with TalentConnect?
              </Heading>
              <Text mt={4} fontSize={{ base: "1x1", md: "2x1" }} color="gray.800">
                At TalentConnect, we're revolutionizing the way companies discover fresh talent. We have
                partnerships with various colleges and universities. Our platform is a gateway to a vibrant
                community of skilled graduates from there, each equipped with passion and proficiency in their
                desired fields. Whether you seek innovative thinkers, analytical minds, or creative visionaries,
                TalentConnect offers a diverse pool of candidates poised to make an impact. We understand
                the evolving needs of businesses and streamline the recruitment process, ensuring a seamless
                match between exceptional talent and forward-thinking organizations. Join us at TalentConnect
                and unlock the potential of tomorrow's workforce today.
              </Text>
              <Flex mt={8} justify="center"  position="absolute" bottom={8} left="50%" transform="translateX(-50%)">
                <Link to="/company-form">
                <Button
                //as={RouterLink}
                //to="/jobs/post-resume"
                rounded={"full"}
                bg={"blue.400"}
                color={"white"}              
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
              >
                Enhance Your Talent Pipeline
              </Button>
            </Link>
            </Flex>
            </Box>
          </Stack>
        </VStack>
      </Flex> */}
        <Hero />
        <College />
        <Company />

        {/* Section 3 */}
        <CTCSection3 />

        {/* Section 4 */}
        <div>
          <CTCSection4 />
        </div>
    </>
  );
}