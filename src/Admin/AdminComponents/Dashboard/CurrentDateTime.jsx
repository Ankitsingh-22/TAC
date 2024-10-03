import React, { useEffect, useState } from 'react';
import { Box, Text } from '@chakra-ui/react';
import { format } from 'date-fns';

const CurrentDateTime = () => {
  const [dateTime, setDateTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => {
      setDateTime(new Date());
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  return (
    <Box textAlign="right" mb={6}>
      <Text fontSize="lg" fontWeight="bold">
        {format(dateTime, 'PPPP')}
      </Text>
      <Text fontSize="md" color="gray.500">
        {format(dateTime, 'p')}
      </Text>
    </Box>
  );
};

export default CurrentDateTime;
