import React, { useState, useContext, useEffect, useRef } from "react";
import {
  Flex,
  Box,
  IconButton,
  Image,
  Button,
  Badge,
  VStack,
  Text,
  Tooltip,
  Collapse,
  Link,
  useDisclosure,
} from "@chakra-ui/react";
import { BellIcon, HamburgerIcon } from "@chakra-ui/icons";
import { AuthContext } from "../../contexts/AuthContext";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const AdminHeader = ({ onOpenSidebar }) => {
  const { logout } = useContext(AuthContext);
  const [notifications, setNotifications] = useState([]);
  const [unreadCount, setUnreadCount] = useState(0);
  const { isOpen, onToggle, onClose } = useDisclosure();
  const notificationRef = useRef();
  const navigate = useNavigate(); // Replace useHistory with useNavigate

  useEffect(() => {
    // Fetch notifications from your API
    const fetchNotifications = async () => {
      try {
        const response = await axios.get('http://3.7.169.233:5000/api/notifications'); // Update with your API endpoint
        setNotifications(response.data);
        setUnreadCount(response.data.filter(notification => !notification.read).length);
      } catch (error) {
        console.error("Error fetching notifications", error);
      }
    };

    fetchNotifications();

    // Polling to refresh notifications every 30 seconds
    const interval = setInterval(fetchNotifications, 30000);

    return () => clearInterval(interval);
  }, []);

  // Handle clicks outside the notification dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target)) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [onClose]);

  const handleViewAll = () => {
    onClose();
    navigate('/admin/notification'); // Navigate to the notifications page
  };

  return (
    <Flex 
      as="header" 
      position="fixed" 
      top="0" 
      left="0" 
      w="full" 
      bg="white" 
      color="black" 
      p={4} 
      alignItems="center" 
      justifyContent="space-between"
      zIndex="1000"  // Ensure the header is above other content
      boxShadow="md"  // Adds a subtle shadow for better visibility
    >
      {/* Hamburger Menu for Mobile */}
      <Box display={{ base: "block", md: "none" }}>
        <IconButton 
          icon={<HamburgerIcon />} 
          onClick={onOpenSidebar} 
          variant="outline" 
          aria-label="Open Sidebar" 
        />
      </Box>

      {/* Logo centered */}
      <Image src="/src/assets/images/Logo/logo.png" alt="Company Logo" h="60px" mx="auto" />

      {/* Notification and Logout on the right */}
      <Flex alignItems="center">
        <Tooltip label="Notifications" aria-label="Notifications Tooltip">
          <Box position="relative">
            <IconButton 
              icon={<BellIcon />} 
              variant="outline" 
              borderColor="black"
              _hover={{ bg: "blue.300" }}
              aria-label="Notifications" 
              onClick={onToggle}
            />
            {unreadCount > 0 && (
              <Badge 
                colorScheme="red" 
                position="absolute" 
                top="-1" 
                right="-1"
                borderRadius="full"
              >
                {unreadCount}
              </Badge>
            )}
          </Box>
        </Tooltip>

        <Button 
          variant="outline" 
          color="black"  // Text color
          borderColor="black"  // Border color
          _hover={{ bg: "blue.300" }}  // Hover effect
          aria-label="Logout"
          onClick={logout}
          ml={4}
        >
          Logout
        </Button>
      </Flex>

      {/* Notifications Dropdown */}
      <Collapse in={isOpen}>
        <Box 
          ref={notificationRef} 
          position="absolute" 
          right="0" 
          top="60px" 
          bg="white" 
          shadow="md" 
          p={4} 
          borderRadius="md" 
          width="300px" 
          maxH="400px" 
          overflowY="auto"
          css={{
            // Custom styling for thin scrollbar
            '&::-webkit-scrollbar': {
              width: '8px',
            },
            '&::-webkit-scrollbar-thumb': {
              background: 'gray',
              borderRadius: '4px',
            },
            '&::-webkit-scrollbar-track': {
              background: '#f1f1f1',
            },
          }}
        >
          <VStack spacing={3} align="start">
            {notifications.length ? (
              notifications.map(notification => (
                <Box 
                  key={notification._id} 
                  p={3} 
                  borderRadius="md" 
                  bg={notification.read ? "gray.100" : "blue.50"}
                  w="full"
                >
                  <Text fontWeight="bold">{notification.message}</Text>
                  <Text fontSize="sm" color="gray.500">{new Date(notification.createdAt).toLocaleDateString()}</Text>
                </Box>
              ))
            ) : (
              <Text>No notifications</Text>
            )}
            <Link onClick={handleViewAll} color="blue.500" fontWeight="bold" textAlign="center" cursor="pointer">
              View All
            </Link>
          </VStack>
        </Box>
      </Collapse>
    </Flex>
  );
};

export default AdminHeader;
