import React, { useEffect, useState, useRef } from "react";
import {
  Box,
  Container,
  Input,
  Button,
  Flex,
  Stack,
  Heading,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  IconButton,
  Checkbox,
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
  Text,
} from "@chakra-ui/react";
import { MdSearch, MdDelete } from "react-icons/md";
import { FaFileExcel, FaFilePdf, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import jsPDF from 'jspdf';
import 'jspdf-autotable';

const downloadPDF = (data) => {
  const doc = new jsPDF();

  const tableColumn = [
    "S.No",
    "User Type",
    "Name",
    "Email",
    "Message",
    "Date",
  ];

  const tableRows = [];

  data.forEach((contact, index) => {
    const contactData = [
      index + 1,
      contact.userType,
      contact.name,
      contact.email,
      contact.message,
      moment(contact.createdAt).format("DD-MM-YYYY"),
    ];

    tableRows.push(contactData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 123, 255] },
  });

  doc.save('contacts.pdf');
};

const downloadExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Contacts');

  worksheet.columns = [
    { header: 'S.No', key: 'sno', width: 10 },
    { header: 'User Type', key: 'userType', width: 20 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Message', key: 'message', width: 50 },
    { header: 'Date', key: 'date', width: 15 },
  ];

  data.forEach((contact, index) => {
    worksheet.addRow({
      sno: index + 1,
      userType: contact.userType,
      name: contact.name,
      email: contact.email,
      message: contact.message,
      date: moment(contact.createdAt).format("DD-MM-YYYY"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'contacts.xlsx');
};

const ContactPanel = () => {
  const [search, setSearch] = useState("");
  const [selectedContacts, setSelectedContacts] = useState({});
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [contactData, setContactData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const contactsPerPage = 10;
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const fetchContactData = async () => {
      try {
        const response = await axios.get("http://3.7.169.233:5000/api/contact/contacts");
        setContactData(response.data);
      } catch (error) {
        console.error("Error fetching contact data:", error);
      }
    };
    fetchContactData();
  }, []);

  const filteredData = contactData.filter((contact) =>
    contact.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAllOnPage = (e) => {
    const isChecked = e.target.checked;
    const newSelectedContacts = { ...selectedContacts };
    currentContacts.forEach((contact) => {
      newSelectedContacts[contact._id] = isChecked;
    });
    setSelectedContacts(newSelectedContacts);
  };

  const handleSelectContact = (contactId) => {
    setSelectedContacts((prevSelected) => ({
      ...prevSelected,
      [contactId]: !prevSelected[contactId],
    }));
  };

  const handleSelectAllAcrossPages = () => {
    setSelectAllAcrossPages((prev) => {
      const newSelected = !prev;
      if (newSelected) {
        const newSelectedContacts = {};
        filteredData.forEach((contact) => {
          newSelectedContacts[contact._id] = true;
        });
        setSelectedContacts(newSelectedContacts);
      } else {
        setSelectedContacts({});
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedContacts).filter(id => selectedContacts[id]);
    if (selectedIds.length > 0) {
      try {
        await axios.delete("http://3.7.169.233:5000/api/contact/contacts", {
          data: { ids: selectedIds },
        });
        setContactData(prevData => prevData.filter(contact => !selectedIds.includes(contact._id)));
        setSelectedContacts({});
        setSelectAllAcrossPages(false);
      } catch (error) {
        console.error("Error deleting contact data:", error);
      }
    }
    onAlertClose();
  };

  const indexOfLastContact = currentPage * contactsPerPage;
  const indexOfFirstContact = indexOfLastContact - contactsPerPage;
  const currentContacts = filteredData.slice(indexOfFirstContact, indexOfLastContact);

  const totalPages = Math.ceil(filteredData.length / contactsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const selectedData = contactData.filter(contact => selectedContacts[contact._id]);

  return (
    <Box>
      <Container maxW="9xl" py={10} mt={20}>
         <Flex direction="column" align="center" justify="center"  mb={10}>
            <Heading fontSize="3xl" fontFamily={"ClashDisplay"} color={"blue.400"}>
              CONTACT DETAILS
            </Heading>
        </Flex>
        <Stack spacing={2}>
          <Flex align="center" justify="space-between">
              <Input
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                w={{ base: "full", sm: "300px" }}
                mr={2}
              />
            
            

          
            <Button
              colorScheme="teal"
              mr={2}
              onClick={handleSelectAllAcrossPages}
              isDisabled={contactData.length === 0}
            >
              {selectAllAcrossPages ? "Unselect All" : "Select All Across Pages"}
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<MdDelete />}
              onClick={onAlertOpen}
              mr={2}
              isDisabled={Object.keys(selectedContacts).every(id => !selectedContacts[id])}
            >
              Delete Selected
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<FaFileExcel />}
              onClick={() => downloadExcel(selectedData)}
              mr={2}
              isDisabled={selectedData.length === 0}
            >
              Download Excel
            </Button>
            <Button
              colorScheme="blue"
              leftIcon={<FaFilePdf />}
              onClick={() => downloadPDF(selectedData)}
              mr={2}
              isDisabled={selectedData.length === 0}
            >
              Download PDF
            </Button>
          </Flex>

          <Table variant="striped" colorScheme="teal" mt={8}>
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={currentContacts.every(contact => selectedContacts[contact._id])}
                    onChange={handleSelectAllOnPage}
                    borderColor="black"
                  />
                </Th>
                <Th>S.No</Th>
                <Th>User Type</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Message</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentContacts.map((contact, index) => (
                <Tr key={contact._id}>
                  <Td>
                    <Checkbox
                      isChecked={!!selectedContacts[contact._id]}
                      onChange={() => handleSelectContact(contact._id)}
                      borderColor="black"
                    />
                  </Td>
                  <Td>{indexOfFirstContact + index + 1}</Td>
                  <Td>{contact.userType}</Td>
                  <Td>{contact.name}</Td>
                  <Td>{contact.email}</Td>
                  <Td>{contact.message}</Td>
                  <Td>{moment(contact.createdAt).format("DD-MM-YYYY")}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>

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
      </Container>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Contacts
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete the selected contacts? This action cannot be undone.
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

export default ContactPanel;
