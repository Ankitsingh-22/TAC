import React from 'react';
import { ChakraProvider, Box, Container } from '@chakra-ui/react';
import DashboardOverview from '../AdminComponents/Dashboard/DashboardOverview';

const Dashboard = () => (
  <ChakraProvider>
    <Container maxW="container.xl" p={4}>
      <DashboardOverview />
    </Container>
  </ChakraProvider>
);

export default Dashboard;
