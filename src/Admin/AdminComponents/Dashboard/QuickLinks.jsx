import React from 'react';
import { Box, Button, SimpleGrid, Heading } from '@chakra-ui/react';

const QuickLinks = () => {
  return (
    <Box>
      <Heading size="md" mb={4}>Quick Links</Heading>
      <SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} spacing={4}>
        <Button colorScheme="teal" variant="solid" w="100%">
          Student Management
        </Button>
        <Button colorScheme="blue" variant="solid" w="100%">
          College Forms
        </Button>
        <Button colorScheme="purple" variant="solid" w="100%">
          Company Profiles
        </Button>
        <Button colorScheme="orange" variant="solid" w="100%">
          Post a Job
        </Button>
        <Button colorScheme="red" variant="solid" w="100%">
          Contact Support
        </Button>
      </SimpleGrid>
    </Box>
  );
};

export default QuickLinks;
