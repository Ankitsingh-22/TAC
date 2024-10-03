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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  Link,  
  Text,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogBody,
  AlertDialogFooter,
} from "@chakra-ui/react";
import { MdDownload, MdSearch, MdDelete, MdVisibility } from "react-icons/md";
import { FaFilePdf, FaFileWord, FaFileExcel, FaArrowLeft, FaArrowRight } from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';
import axios from "axios";
import moment from "moment";

const downloadPDF = (data) => {
  const doc = new jsPDF();
  
  autoTable(doc, {
    head: [['S.No', 'Name', 'Email', 'Phone', 'Upload Date', 'Resume']],
    body: data.map((student, index) => [
      index + 1, // S.No
      student.name,
      student.email,
      student.phone,
      moment(student.createdAt).format("YYYY-MM-DD"),
      { 
        content: `${student.name}-Resume`, 
        styles: { textColor: [0, 0, 255] }, // Set the text color to blue
        link: `http://3.7.169.233:5000/api/students/downloadResume/${student._id}`
      },
    ]),
    didDrawCell: (data) => {
      if (data.column.index === 5 && data.cell.section === 'body') {
        // Clear default text rendering
        data.cell.text = '';

        // Draw the text with link
        doc.setTextColor(0, 0, 255); // Set the link color to blue
        doc.textWithLink(
          `${data.cell.raw.content}`, // Use the content for the link
          data.cell.x ,
          data.cell.y + data.cell.height / 5 + doc.getFontSize() / 3, 
          { url: data.cell.raw.link }
        );
      }
    },
    // Ensure the cell's default text rendering is disabled
    didParseCell: (data) => {
      if (data.column.index === 5 && data.cell.section === 'body') {
        data.cell.text = ''; // Ensure the default text is cleared
      }
    },
  });

  doc.save("students.pdf");
};

const downloadExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Students');

  // Define columns
  worksheet.columns = [
    { header: 'S.No', key: 'sno', width: 10 },
    { header: 'Name', key: 'name', width: 30 },
    { header: 'Email', key: 'email', width: 30 },
    { header: 'Phone', key: 'phone', width: 15 },
    { header: 'Upload Date', key: 'uploadDate', width: 15 },
    { header: 'Resume', key: 'resume', width: 30 }
  ];

  // Add rows
  data.forEach((student, index) => {
    worksheet.addRow({
      sno: index + 1,
      name: student.name,
      email: student.email,
      phone: student.phone,
      uploadDate: moment(student.createdAt).format("YYYY-MM-DD"),
      resume: `${student.name}-Resume`
    });
  });

  // Apply hyperlink formatting
  data.forEach((student, index) => {
    const cell = worksheet.getCell(`F${index + 2}`);
    cell.value = {
      text: `${student.name}-Resume`,
      hyperlink: `http://3.7.169.233:5000/api/students/downloadResume/${student._id}`
    };
    cell.font = { color: { argb: 'FF0000FF' }, underline: true }; // Blue color and underline
  });

  // Write the file
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
  saveAs(blob, 'students.xlsx');
};


const StudentPanel = () => {
  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState({});
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeType, setResumeType] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const fetchStudentData = async () => {
      try {
        const response = await axios.get("http://3.7.169.233:5000/api/resumes/getResumes");
        setStudentData(response.data);
      } catch (error) {
        console.error("Error fetching student data:", error);
      }
    };
    fetchStudentData();
  }, []);

  const filteredData = studentData.filter((student) =>
    student.name.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAllOnPage = (e) => {
    const isChecked = e.target.checked;
    const newSelectedStudents = { ...selectedStudents };
    currentStudents.forEach((student) => {
      newSelectedStudents[student._id] = isChecked;
    });
    setSelectedStudents(newSelectedStudents);
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents((prevSelected) => ({
      ...prevSelected,
      [studentId]: !prevSelected[studentId],
    }));
  };

  const handleSelectAllAcrossPages = () => {
    setSelectAllAcrossPages((prev) => {
      const newSelected = !prev;
      if (newSelected) {
        const newSelectedStudents = {};
        filteredData.forEach((student) => {
          newSelectedStudents[student._id] = true;
        });
        setSelectedStudents(newSelectedStudents);
      } else {
        setSelectedStudents({});
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedStudents).filter(id => selectedStudents[id]);
    if (selectedIds.length > 0) {
      try {
        await axios.post("http://3.7.169.233:5000/api/students/delete", { ids: selectedIds });
        setStudentData(prevData => prevData.filter(student => !selectedIds.includes(student._id)));
        setSelectedStudents({});
        setSelectAllAcrossPages(false);
      } catch (error) {
        console.error("Error deleting student data:", error);
      }
    }
    onAlertClose();
  };

  const handleViewResume = (studentId) => {
    const resume = studentData.find(student => student._id === studentId);
    const fileType = resume.resumePath.split('.').pop();
    
    setResumeType(fileType);
    setSelectedResume(`http://3.7.169.233:5000/api/students/viewResume/${studentId}`);
    onOpen();
  };

  const handleDownloadResume = (studentId) => {
    window.open(`http://3.7.169.233:5000/api/students/downloadResume/${studentId}`, "_blank");
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredData.slice(indexOfFirstStudent, indexOfLastStudent);

  const totalPages = Math.ceil(filteredData.length / studentsPerPage);

  const handleNextPage = () => {
    setCurrentPage(prevPage => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage(prevPage => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const selectedData = studentData.filter(student => selectedStudents[student._id]);

  return (
    <Box>
      <Container maxW="7xl" py={10} mt={20}>
        <Flex direction="column" align="center" justify="center"  mb={10}>
            <Heading fontSize="3xl" fontFamily={"ClashDisplay"} color={"blue.400"}>
              STUDENT DETAILS
            </Heading>
        </Flex>
        <Stack spacing={2}>
          <Flex align="center" justify="space-between">
            
            <Flex>
              <Input
                placeholder="Search by name"
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
              isDisabled={studentData.length === 0}
            >
              {selectAllAcrossPages ? "Unselect All" : "Select All Across Pages"}
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<MdDelete />}
              onClick={onAlertOpen}
              mr={2}
              isDisabled={Object.keys(selectedStudents).every(id => !selectedStudents[id])}
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
                    isChecked={currentStudents.every(student => selectedStudents[student._id])}
                    onChange={handleSelectAllOnPage}
                    borderColor="black"
                  />
                </Th>
                <Th>S.No</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Upload Date</Th>
                <Th>Resume</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentStudents.map((student, index) => (
                <Tr key={student._id}>
                  <Td>
                    <Checkbox
                      isChecked={!!selectedStudents[student._id]}
                      onChange={() => handleSelectStudent(student._id)}
                      borderColor="black"
                    />
                  </Td>
                  <Td>{indexOfFirstStudent + index + 1}</Td>
                  <Td>{student.name}</Td>
                  <Td>{student.email}</Td>
                  <Td>{student.phone}</Td>
                  <Td>{moment(student.createdAt).format("YYYY-MM-DD")}</Td>
                  <Td>
                    
                      {student.resumePath.endsWith(".pdf") ? <FaFilePdf color="red" /> : <FaFileWord color="blue" />}
                      <IconButton
                        icon={<MdVisibility />}
                        aria-label="View Resume"
                        onClick={() => handleViewResume(student._id)}
                        ml={2}
                      />
                      <IconButton
                        icon={<MdDownload />}
                        aria-label="Download Resume"
                        onClick={() => handleDownloadResume(student._id)}
                        ml={2}
                      />
                   
                  </Td>
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

      <Modal isOpen={isOpen} onClose={onClose} size="4xl">
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Resume Preview</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            {selectedResume && resumeType === "pdf" ? (
              <embed src={selectedResume} width="100%" height="500px" type="application/pdf" />
            ) : (
              <Text>
                Viewing .docx files in the browser is not supported.{" "}
                <Link href={selectedResume} target="_blank" rel="noopener noreferrer" color="blue.400">
                  Click here to download and view the resume.
                </Link>
              </Text>
            )}
          </ModalBody>
        </ModalContent>
      </Modal>

      <AlertDialog
        isOpen={isAlertOpen}
        leastDestructiveRef={cancelRef}
        onClose={onAlertClose}
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Selected Students
            </AlertDialogHeader>
            <AlertDialogBody>
              Are you sure you want to delete the selected students? This action cannot be undone.
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

export default StudentPanel;
