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
    "College Name",
    "Location",
    "Students Strength UG",
    "Students Strength PG",
    "College Email",
    "Mobile Number",
    "Placement Season",
    "Upcoming Events",
    "Partnership Interests",
    "Date",
  ];

  const tableRows = [];

  data.forEach((college, index) => {
    const collegeData = [
      index + 1,
      college.collegeName,
      college.location,
      college.studentsStrengthUG,
      college.studentsStrengthPG,
      college.collegeEmail,
      college.mobileNumber,
      college.placementSeason,
      college.upcomingEvents,
      college.partnershipInterests.join(', '),
      moment(college.createdAt).format("DD-MM-YYYY"),
    ];

    tableRows.push(collegeData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20 ,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 123, 255] }, // Customize header color
  });

  doc.save('colleges.pdf');
};

const downloadExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Colleges');

  worksheet.columns = [
    { header: 'S.No', key: 'sno', width: 10 },
    { header: 'College Name', key: 'collegeName', width: 30 },
    { header: 'Location', key: 'location', width: 30 },
    { header: 'Students Strength UG', key: 'studentsStrengthUG', width: 20 },
    { header: 'Students Strength PG', key: 'studentsStrengthPG', width: 20 },
    { header: 'College Email', key: 'collegeEmail', width: 30 },
    { header: 'Mobile Number', key: 'mobileNumber', width: 20 },
    { header: 'Placement Season', key: 'placementSeason', width: 20 },
    { header: 'Upcoming Events', key: 'upcomingEvents', width: 30 },
    { header: 'Partnership Interests', key: 'partnershipInterests', width: 30 },
    { header: 'Date', key: 'Date', width: 15 },
  ];

  data.forEach((college, index) => {
    worksheet.addRow({
      sno: index + 1,
      collegeName: college.collegeName,
      location: college.location,
      studentsStrengthUG: college.studentsStrengthUG,
      studentsStrengthPG: college.studentsStrengthPG,
      collegeEmail: college.collegeEmail,
      mobileNumber: college.mobileNumber,
      placementSeason: college.placementSeason,
      upcomingEvents: college.upcomingEvents,
      partnershipInterests: college.partnershipInterests.join(', '),
      Date: moment(college.createdAt).format("DD-MM-YYYY"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'colleges.xlsx');
};

const CollegePanel = () => {
  const [search, setSearch] = useState("");
  const [selectedColleges, setSelectedColleges] = useState({});
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [collegeData, setCollegeData] = useState([]); 
  const [currentPage, setCurrentPage] = useState(1);
  const collegesPerPage = 10;
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const fetchCollegeData = async () => {
      try {
        const response = await axios.get("http://3.7.169.233:5000/api/college/college-forms");
        setCollegeData(response.data);
      } catch (error) {
        console.error("Error fetching college data:", error);
      }
    };
    fetchCollegeData();
  }, []);

  const filteredData = collegeData.filter((college) =>
    college.collegeName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAllOnPage = (e) => {
    const isChecked = e.target.checked;
    const newSelectedColleges = { ...selectedColleges };
    currentColleges.forEach((college) => {
      newSelectedColleges[college._id] = isChecked;
    });
    setSelectedColleges(newSelectedColleges);
  };

  const handleSelectCollege = (collegeId) => {
    setSelectedColleges((prevSelected) => ({
      ...prevSelected,
      [collegeId]: !prevSelected[collegeId],
    }));
  };

  const handleSelectAllAcrossPages = () => {
    setSelectAllAcrossPages((prev) => {
      const newSelected = !prev;
      if (newSelected) {
        const newSelectedColleges = {};
        filteredData.forEach((college) => {
          newSelectedColleges[college._id] = true;
        });
        setSelectedColleges(newSelectedColleges);
      } else {
        setSelectedColleges({});
      }
      return newSelected;
    });
  };

 const handleDeleteSelected = async () => {
  const selectedIds = Object.keys(selectedColleges).filter(id => selectedColleges[id]);
  if (selectedIds.length > 0) {
    try {
      await axios.delete("http://3.7.169.233:5000/api/college/delete", {
        data: { ids: selectedIds }, // Use `data` to send the payload in DELETE requests
      });
      setCollegeData(prevData => prevData.filter(college => !selectedIds.includes(college._id)));
      setSelectedColleges({});
      setSelectAllAcrossPages(false);
    } catch (error) {
      console.error("Error deleting college data:", error);
    }
  }
  onAlertClose();
};


  const indexOfLastCollege = currentPage * collegesPerPage;
  const indexOfFirstCollege = indexOfLastCollege - collegesPerPage;
  const currentColleges = filteredData.slice(indexOfFirstCollege, indexOfLastCollege);

  const totalPages = Math.ceil(filteredData.length / collegesPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const selectedData = collegeData.filter(college => selectedColleges[college._id]);

  return (
    <Box>
      <Container maxW="9xl" py={10} mt={20}>
        <Flex direction="column" align="center" justify="center"  mb={10}>
            <Heading fontSize="3xl" fontFamily={"ClashDisplay"} color={"blue.400"}>
              COLLEGE DETAILS
            </Heading>
        </Flex>
        <Stack spacing={2}>
          <Flex align="center" justify="space-between">
           
            <Flex>
              <Input
                placeholder="Search by college name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                w={{ base: "full", sm: "300px" }}
              />
              <IconButton
                icon={<MdSearch />}
                aria-label="Search"
                ml={2}
              />            

            <Button
              colorScheme="teal"
              mr={2}
              onClick={handleSelectAllAcrossPages}
              isDisabled={collegeData.length === 0}
            >
              {selectAllAcrossPages ? "Unselect All" : "Select All Across Pages"}
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<MdDelete />}
              onClick={onAlertOpen}
              mr={2}
              isDisabled={Object.keys(selectedColleges).every(id => !selectedColleges[id])}
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
          </Flex>

          <Table variant="striped" colorScheme="teal" mt={8}>
            <Thead>
              <Tr>
                <Th>
                  <Checkbox
                    isChecked={currentColleges.every(college => selectedColleges[college._id])}
                    onChange={handleSelectAllOnPage}
                    borderColor="black"
                  />
                </Th>
                <Th>S.No</Th>
                <Th>College Name</Th>
                <Th>Location</Th>
                <Th>Students Strength UG</Th>
                <Th>Students Strength PG</Th>
                <Th>College Email</Th>
                <Th>Mobile Number</Th>
                <Th>Placement Season</Th>
                <Th>Upcoming Events</Th>
                <Th>Partnership Interests</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentColleges.map((college, index) => (
                <Tr key={college._id}>
                  <Td>
                    <Checkbox
                      isChecked={!!selectedColleges[college._id]}
                      onChange={() => handleSelectCollege(college._id)}
                      borderColor="black"
                    />
                  </Td>
                  <Td>{indexOfFirstCollege + index + 1}</Td>
                  <Td>{college.collegeName}</Td>
                  <Td>{college.location}</Td>
                  <Td>{college.studentsStrengthUG}</Td>
                  <Td>{college.studentsStrengthPG}</Td>
                  <Td>{college.collegeEmail}</Td>
                  <Td>{college.mobileNumber}</Td>
                  <Td>{college.placementSeason}</Td>
                  <Td>{college.upcomingEvents}</Td>
                  <Td>{college.partnershipInterests.join(', ')}</Td>
                   <Td>{moment(college.createdAt).format("DD-MM-YYYY")}</Td>
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

      {/* Alert Dialog for Deleting Selected */}
      <AlertDialog
        isOpen={isAlertOpen}
        onClose={onAlertClose}
        leastDestructiveRef={cancelRef}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Colleges
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete the selected colleges? This action cannot be undone.
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

export default CollegePanel;
