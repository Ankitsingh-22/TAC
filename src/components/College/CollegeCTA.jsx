import React from 'react';
import { Box, Flex, Heading, Text, Button } from '@chakra-ui/react';
import { Link } from 'react-router-dom';

const CollegeCTA = () => {
  return (
    <Flex
      direction={{ base: "column", lg: "row" }}
      align="center"
      justify="space-between"
      p={8}
      bg="blue.50"
    >
      <Box
        flex={1}
        textAlign="center"
        mb={{ base: 6, lg: 0 }}
      >
        <Heading
          fontFamily="ClashDisplay"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} // Adjusted font size for responsiveness
          fontWeight="bold"
          mb={4}
        >
          <Text as="span" color="black">
            Empower Your
          </Text>
          <Text as="span" color="blue.400">
            {' '}Company Today
          </Text>
        </Heading>
        <Text fontSize={{ base: "md", lg: "lg" }} color="gray.600">
          Join TalentConnect and Revolutionize your Hiring Process.
        </Text>
      </Box>

      <Flex
        direction={{ base: 'column', lg: 'row' }}
        align="center"
        justify="center"
      >
        <Link to="/college-form">
          <Button
            colorScheme="teal"
            size="lg"
            mb={{ base: 4, lg: 0 }}
            mr={{ base: 0, lg: 4 }}  // Margin on large screens
            onClick={() => console.log('Get Started clicked')}
            _hover={{
              bgGradient: 'linear(to-r, #0ea5e9, #2563eb)',
              transform: 'scale(1.05)',
              textDecoration: 'none',
              color: "white"
            }}
          >
            Get Started
          </Button>
        </Link>

        <Link to="/contact">
          <Button
            variant="outline"
            colorScheme="blue"
            size="lg"
            ml={{ base: 0, lg: 4 }}  // Margin-left on large screens
            onClick={() => console.log('Contact Us clicked')}
            _hover={{
              bgGradient: 'linear(to-r, #0ea5e9, #2563eb)',
              transform: 'scale(1.05)',
              textDecoration: 'none',
              color: "white"
            }}
          >
            Contact Us
          </Button>
        </Link>
      </Flex>
    </Flex>
  );
};

export default CollegeCTA;
