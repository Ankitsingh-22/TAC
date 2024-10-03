import React, { useState, useEffect, useRef } from 'react';
import {
  Box, Table, Thead, Tbody, Th, Td, Tr, Heading, IconButton,
  Flex, AlertDialog, AlertDialogOverlay, AlertDialogContent,
  AlertDialogHeader, AlertDialogBody, AlertDialogFooter, Button,
  Input, Select, Stack, Checkbox, Spinner, Text, useDisclosure
} from '@chakra-ui/react';
import axios from 'axios';
import { FaArrowLeft, FaArrowRight } from 'react-icons/fa';


const NotificationPanel = () => {
  const [notifications, setNotifications] = useState([]);
  const [selectedNotifications, setSelectedNotifications] = useState({});
  const [searchTerm, setSearchTerm] = useState('');
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [filterType, setFilterType] = useState('');
  const [filterStatus, setFilterStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const notificationsPerPage = 10; // Adjust as needed
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();

  // Fetch notifications
  useEffect(() => {
    const fetchNotifications = async () => {
      setLoading(true);
      try {
        const response = await axios.get('http://3.7.169.233:5000/api/notifications', {
          params: {
            searchTerm: searchTerm || undefined,
            filterType: filterType || undefined,
            filterStatus: filterStatus || undefined,
          },
        });
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications', error);
      }
      setLoading(false);
    };

    fetchNotifications();
  }, [searchTerm, filterType, filterStatus]);

  // Handle multiple notifications deletion
  const handleDeleteSelected = async () => {
    try {
      await axios.delete('http://3.7.169.233:5000/api/notifications/delete', {
        data: { ids: Object.keys(selectedNotifications) },
      });
      setNotifications(notifications.filter(notification => !Object.keys(selectedNotifications).includes(notification._id)));
      setSelectedNotifications({});
      onAlertClose();
    } catch (error) {
      console.error('Error deleting notifications', error);
    }
  };

  // Handle marking notifications as read
  const handleMarkAsRead = async () => {
    try {
      await axios.put('http://3.7.169.233:5000/api/notifications/mark-as-read', {
        ids: Object.keys(selectedNotifications),
      });
      setNotifications(notifications.map(notification =>
        selectedNotifications[notification._id]
          ? { ...notification, read: true }
          : notification
      ));
      setSelectedNotifications({});
    } catch (error) {
      console.error('Error marking notifications as read', error);
    }
  };

  // Handle checkbox selection
  const handleSelectNotification = (id) => {
    setSelectedNotifications(prevSelected => ({
      ...prevSelected,
      [id]: !prevSelected[id]
    }));
  };

  // Handle select all checkboxes in one page
  const handleSelectAllOnPage = (e) => {
    const isChecked = e.target.checked;
    const newSelectedNotifications = { ...selectedNotifications };

    currentNotifications.forEach((notification) => {
      newSelectedNotifications[notification._id] = isChecked;
    });

    setSelectedNotifications(newSelectedNotifications);
  };

  // Handle select all checkboxes across all pages
  const handleSelectAllAcrossPages = () => {
    setSelectAllAcrossPages(prev => {
      const newSelected = !prev;
      if (newSelected) {
        const newSelectedNotifications = {};
        notifications.forEach(notification => {
          newSelectedNotifications[notification._id] = true;
        });
        setSelectedNotifications(newSelectedNotifications);
      } else {
        setSelectedNotifications({});
      }
      return newSelected;
    });
  };

  // Pagination
  const indexOfLastNotification = currentPage * notificationsPerPage;
  const indexOfFirstNotification = indexOfLastNotification - notificationsPerPage;
  const currentNotifications = notifications.slice(indexOfFirstNotification, indexOfLastNotification);
  const totalPages = Math.ceil(notifications.length / notificationsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  return (
    <Box p={4} mt={40}>
      <Flex direction="column" align="center" justify="center" mb={10}>
        <Heading fontSize="3xl" fontFamily={"ClashDisplay"} color={"blue.400"}>
          NOTIFICATION
        </Heading>
      </Flex>
      <Stack spacing={4}>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={4}>
          <Input
            placeholder="Search notifications"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            w={{ base: "full", sm: "300px" }}
          />
          <Stack spacing={4} direction={{ base: 'column', sm: 'row' }}>
            <Button
              colorScheme="teal"
              onClick={handleSelectAllAcrossPages}
              isDisabled={notifications.length === 0}
            >
              {selectAllAcrossPages ? "Unselect All Across Pages" : "Select All Across Pages"}
            </Button>
            <Button
              colorScheme="teal"
              onClick={onAlertOpen}
              isDisabled={Object.keys(selectedNotifications).length === 0}
            >
              Delete Selected
            </Button>
            <Button
              colorScheme="teal"
              onClick={handleMarkAsRead}
              isDisabled={Object.keys(selectedNotifications).length === 0}
            >
              Mark as Read
            </Button>
          </Stack>
        </Stack>
        <Stack direction={{ base: 'column', sm: 'row' }} spacing={4} mb={4}>
          <Select placeholder="Filter by type" value={filterType} onChange={(e) => setFilterType(e.target.value)}>
            <option value="company">Company</option>
            <option value="college">College</option>
            <option value="resume">Student</option>
            <option value="contact">Contact</option>
          </Select>
          <Select placeholder="Filter by status" value={filterStatus} onChange={(e) => setFilterStatus(e.target.value)}>
            <option value="read">Read</option>
            <option value="unread">Unread</option>
          </Select>
        </Stack>
        {loading ? (
          <Flex justify="center">
            <Spinner />
          </Flex>
        ) : (
          <Table variant="striped" colorScheme="teal" mt={8}>
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={currentNotifications.every(notification => selectedNotifications[notification._id])}
                    onChange={handleSelectAllOnPage}
                    borderColor="black"
                  />
                </Th>
                <Th>S.No</Th>
                <Th>Type</Th>
                <Th>Message</Th>
                <Th>Date</Th>
                <Th>Status</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentNotifications.map((notification, index) => (
                <Tr key={notification._id}>
                  <Td>
                    <Checkbox
                      isChecked={selectedNotifications[notification._id] || false}
                      onChange={() => handleSelectNotification(notification._id)}
                      borderColor="black"
                    />
                  </Td>
                  <Td>{indexOfFirstNotification + index + 1}</Td>
                  <Td>{notification.type}</Td>
                  <Td>{notification.message}</Td>
                  <Td>{new Date(notification.createdAt).toLocaleDateString()}</Td>
                  <Td>{notification.read ? 'Read' : 'Unread'}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
        <Flex justify="center" mt={4}>
          <IconButton
            icon={<FaArrowLeft />}
            aria-label="Previous Page"
            onClick={handlePrevPage}
            isDisabled={currentPage === 1}
            _hover={{ bg: "gray.200" }}
          />
          <Text mx={4} fontSize="lg" align="center">
            Page {currentPage} of {totalPages}
          </Text>
          <IconButton
            icon={<FaArrowRight />}
            aria-label="Next Page"
            onClick={handleNextPage}
            isDisabled={currentPage === totalPages}
            _hover={{ bg: "gray.200" }}
          />
        </Flex>
      </Stack>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Notifications
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete the selected notifications? This action cannot be undone.
            </AlertDialogBody>
            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteSelected} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Box>
  );
};

export default NotificationPanel;
