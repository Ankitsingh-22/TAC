import React from 'react';
import { Flex, Heading, Image, Stack, Text, useBreakpointValue, useColorModeValue, Box } from "@chakra-ui/react";
import CountUp from 'react-countup';
import useInView from './useInView'; // Import the custom hook

export default function CollegeIntro() {
  const [ref, isInView] = useInView({
    threshold: 0.1, // Trigger when 10% of the element is in view
  });

  return (
    <Stack
      minH={"100vh"}
      direction={{ base: "column", md: "column", lg:"row" }}
      mt={10}
      spacing={{ base: 8, md: 0 }} // Add spacing between sections on smaller screens
    >
      {/* Container for Image and Background Dots */}
      <Flex flex={1} align={"center"} justify={"center"} position="relative">
        {/* Dots Background Box */}
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"  // Make this box larger
          height="100%"
          zIndex={-1}
          bgGradient={useColorModeValue(
                'radial(orange.600 1px, transparent 1px)',
                'radial(orange.300 1px, transparent 1px)',
              )}
          backgroundSize="20px 20px"
          backgroundRepeat="repeat"
          opacity="0.4"
        />
        {/* Image Box */}
        <Box
          position="relative"
          overflow="hidden"
          width={{ base: "90%", md: "90%",lg:"80%" }} // Responsive width
          maxHeight="60vh"
          borderRadius="lg"
        >
          <Box
            position="relative"
            overflow="hidden"
            transition="transform 0.5s ease"
            _hover={{ transform: "scale(1.1)" }}
          >
            <Image
              alt={"College Recruitment"}
              objectFit={"cover"}
              height="100%"
              src={
                "https://images.pexels.com/photos/3182762/pexels-photo-3182762.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2"
              }
            />
          </Box>
        </Box>
      </Flex>

      {/* Main Content Section */}
      <Flex p={8} flex={1} align={"center"} justify={"center"}>
        <Stack spacing={6} w={"full"} maxW={"lg"}>
          <Heading fontSize={{ base: "3xl", md: "4xl", lg: "5xl" }}>
            <Text
              as={"span"}
              position={"relative"}
              fontSize={"28px"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "15%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              Revolutionizing Campus Recruitment:
            </Text>
            <br />
            <Text color={"blue.400"} as={"span"}>
              Our Vision
            </Text>
          </Heading>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"black"}>
            Welcome to TalentConnect, where we specialize in transforming campus recruitment for colleges facing challenges like limited employer connections, resource constraints, skill gaps among graduates, and a lack of actionable feedback.
          </Text>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"black"}>
            Our solutions include a network connecting colleges with skilled employers, a recruitment platform with tools for targeted training programs to bridge skill gaps, and data-driven insights for refining career services and recruitment strategies.
          </Text>
          <Text fontSize={{ base: "md", lg: "lg" }} color={"black"}>
            Empower your institution with TalentConnect to prepare students effectively for successful careers.
          </Text>
          <hr />
          {/* Animated Counters Section */}
          <Stack spacing={4} mt={8} align={"center"} ref={ref}>
            <Stack direction={{ base: "column", md: "row" }} spacing={8} textAlign="center">
              <Box>
                <Text fontSize={"lg"} color={"black"}>Founded</Text>
                <Text fontSize={"2xl"} color={"black"} fontWeight={700}>
                  {isInView ? <CountUp end={2023} duration={2} /> : 2023}
                </Text>
              </Box>
              <Box>
                <Text fontSize={"lg"} color={"black"}>Institutions Served</Text>
                <Text fontSize={"2xl"} color={"black"} fontWeight={700}>
                  {isInView ? <CountUp end={120} duration={2} suffix="+" /> : "120+"}
                </Text>
              </Box>
              <Box>
                <Text fontSize={"lg"} color={"black"}>Employers Connected</Text>
                <Text fontSize={"2xl"} color={"black"} fontWeight={700}>
                  {isInView ? <CountUp end={500} duration={2} suffix="+" /> : "500+"}
                </Text>
              </Box>
              <Box>
                <Text fontSize={"lg"} color={"gray.500"}>Successful Placements</Text>
                <Text fontSize={"2xl"} color={"black"} fontWeight={700}>
                  {isInView ? <CountUp end={10000} duration={2} suffix="+" /> : "10000+"}
                </Text>
              </Box>
            </Stack>
          </Stack>
        </Stack>
      </Flex>
    </Stack>
  );
}
