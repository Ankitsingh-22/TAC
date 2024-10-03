import React from "react";
import { Box, Flex, Text, Button, Image, VStack, HStack } from "@chakra-ui/react";


function ResponsiveHeroSection() {
  return (
    <Box bg="white" px={{ base: 4, md: 8 }} py={{ base: 8, md: 16 }} mt={100}>
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="space-between"
        align="center"
      >
        {/* Left Text Section */}
        <VStack align="flex-start" spacing={6} maxW="lg">
          <Text fontSize={{ base: "2xl", md: "5xl" }} fontWeight="bold">
            <Text as="span" color="blue.400">
              Navigate Your Future:
            </Text>
            Expert Career Counselling
          </Text>
          <Text color="gray.500" fontSize={{ base: "md", md: "lg" }}>
            Unlock your potential with personalized career guidance. Our expert counselors provide tailored advice, resources, and strategies to help you achieve your professional goals and build a fulfilling career.
          </Text>
          <Button colorScheme="blue" size="lg" borderRadius="20px">
            Get Started
          </Button>
        </VStack>

        {/* Right Image Section */}
        <Box
          mt={{ base: 8, md: 0 }}
          position="relative"
          display="flex"
          justifyContent="center"
          alignItems="center"
        >
          {/* Background Rounded Shapes */}
          <Box
            position="absolute"
            top="-10%"
            left="-5%"
            width="70px"
            height="70px"
            bg="blue.200"
            borderRadius="lg"
          />
          <Box
            position="absolute"
            bottom="-20%"
            right="-0%"
            width="80px"
            height="80px"
            bg="blue.300"
            borderRadius="xl"
            zIndex={2}
          />

          {/* Image Grid */}
          <VStack spacing={6} marginRight={100}>
            <Box
              borderRadius="lg"
              overflow="hidden"
              boxShadow="lg"
              w="150px"
              h="150px"
            >
              <Image
                src="https://images.unsplash.com/photo-1495995424756-6a5a3f9e7543?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1yZWxhdGVkfDE1fHx8ZW58MHx8fHx8"
                alt="Worker 1"
                objectFit="cover"
                w="100%"
                h="100%"
              />
            </Box>
            <HStack spacing={6}>
              <Box
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                w="140px"
                h="140px"
              >
                <Image
                  src="https://images.unsplash.com/photo-1698047681432-006d2449c631?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Worker 2"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
              <Box
                borderRadius="lg"
                overflow="hidden"
                boxShadow="lg"
                w="140px"
                h="140px"
              >
                <Image
                  src="https://images.unsplash.com/photo-1581092918484-8313ada2183a?q=80&w=1374&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                  alt="Worker 3"
                  objectFit="cover"
                  w="100%"
                  h="100%"
                />
              </Box>
            </HStack>
          </VStack>
        </Box>
      </Flex>
    </Box>
  );
}

export default ResponsiveHeroSection;
