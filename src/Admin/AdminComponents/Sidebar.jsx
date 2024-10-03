import React from "react";
import { Box, VStack, Text, Icon } from "@chakra-ui/react";
import { NavLink } from 'react-router-dom';
import { FaTachometerAlt, FaUser, FaSchool, FaBuilding, FaBriefcase, FaPhone } from 'react-icons/fa'; // Import icons from react-icons
import { MdNotificationsActive } from "react-icons/md";
const Sidebar = ({ isOpen, onClose }) => {
  // Close sidebar when an item is clicked
  const handleClick = () => {
    onClose(); // Close sidebar
  };

  return (
    <Box
      as="nav"
      pos="fixed"
      left="0"
      top="0"
      w={{ base: "full", md: "250px" }}
      h="full"
      bg="gray.200"
      color="black"
      transform={{ base: isOpen ? "translateX(0)" : "translateX(-100%)", md: "translateX(0)" }}
      transition="transform 0.3s ease-in-out"
      zIndex="1000"
    >
      <VStack align="start" spacing={4} mt={6} px={4}>
        <NavLink 
          to="/admin/dashboard" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent', // Change to the desired color
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaTachometerAlt} mr={3} />
          <Text>Dashboard</Text>
        </NavLink>
        <NavLink 
          to="/admin/notification" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent', // Change to the desired color
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={MdNotificationsActive} mr={3} />
          <Text>Notification</Text>
        </NavLink>
        <NavLink 
          to="/admin/student" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaUser} mr={3} />
          <Text>Student</Text>
        </NavLink>
        <NavLink 
          to="/admin/college" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaSchool} mr={3} />
          <Text>College</Text>
        </NavLink>
        <NavLink 
          to="/admin/company" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaBuilding} mr={3} />
          <Text>Company</Text>
        </NavLink>
        <NavLink 
          to="/admin/post-job" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaBriefcase} mr={3} />
          <Text>Post a Job</Text>
        </NavLink>
        <NavLink 
          to="/admin/contact-support" 
          style={({ isActive }) => ({
            display: 'flex',
            alignItems: 'center',
            width: '100%',
            padding: '1rem',
            borderRadius: '0.375rem',
            backgroundColor: isActive ? '#3182ce' : 'transparent',
            color: isActive ? 'white' : 'black',
            textDecoration: 'none',
            transition: 'all 0.3s ease',
            transform: isActive ? 'scale(1.05)' : 'scale(1)'
          })}
          onClick={handleClick}
        >
          <Icon as={FaPhone} mr={3} />
          <Text>Contact Support</Text>
        </NavLink>
      </VStack>
    </Box>
  );
};

export default Sidebar;
