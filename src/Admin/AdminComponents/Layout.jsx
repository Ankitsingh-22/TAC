import React, { useState } from "react";
import { Box, Flex } from "@chakra-ui/react";
import AdminHeader from "./AdminHeader";
import Sidebar from "./Sidebar";

const Layout = ({ children }) => {
  const [isSidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!isSidebarOpen);
  };

  return (
    <Flex direction="column" h="100vh">
      {/* Header */}
      <AdminHeader onOpenSidebar={toggleSidebar} />

      <Flex flex="1">
        {/* Sidebar */}
        <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebar} />

        {/* Main Content */}
        <Box flex="1" ml={{ base: 0, md: "250px" }} p={6} bg="gray.100">
          {children}
        </Box>
      </Flex>
    </Flex>
  );
};

export default Layout;
