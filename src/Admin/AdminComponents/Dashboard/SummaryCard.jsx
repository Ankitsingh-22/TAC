import React from 'react';
import { Box, Text, Flex, Heading, useBreakpointValue } from '@chakra-ui/react';

const SummaryCard = ({ title, value }) => {
  const fontSize = useBreakpointValue({ base: 'md', md: 'lg' });

  return (
    <Box
      p={4}
      shadow="md"
      borderWidth="1px"
      borderRadius="md"
      bg="white"
      textAlign="center"
    >
      <Heading size="md" mb={2}>{title}</Heading>
      <Text fontSize={fontSize} color="gray.600">{value}</Text>
    </Box>
  );
};

export default SummaryCard;
