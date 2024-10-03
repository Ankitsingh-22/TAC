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
import {
  MdDownload,
  MdSearch,
  MdDelete,
  MdVisibility,
} from "react-icons/md";
import {
  FaFilePdf,
  FaFileWord,
  FaFileExcel,
  FaArrowLeft,
  FaArrowRight,
} from "react-icons/fa";
import { jsPDF } from "jspdf";
import autoTable from "jspdf-autotable";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import axios from "axios";
import moment from "moment";
import { useLocation } from 'react-router-dom';

const downloadPDF = (data) => {
  const doc = new jsPDF();

  autoTable(doc, {
    head: [
      [
        "S.No",
        "Job Id",
        "Job Title",
        "Name",
        "Email",
        "Phone",
        "Applied Date",
        "Resume",
      ],
    ],
    body: data.map((student, index) => [
      index + 1,
      student.jobId,
      student.jobTitle,
      student.name,
      student.email,
      student.phone,
      moment(student.appliedAt).format("DD-MM-YYYY"),
      {
        content: `${student.name}-Resume`,
        styles: { textColor: [0, 0, 255] },
        link: `http://3.7.169.233:5000/api/job-applications/downloadResume/${student._id}`,
      },
    ]),
    didDrawCell: (data) => {
      if (data.column.index === 7 && data.cell.section === "body") {
        data.cell.text = "";
        doc.setTextColor(0, 0, 255);
        doc.textWithLink(
          `${data.cell.raw.content}`,
          data.cell.x,
          data.cell.y + data.cell.height / 5 + doc.getFontSize() / 3,
          { url: data.cell.raw.link }
        );
      }
    },
    // Ensure the cell's default text rendering is disabled
    didParseCell: (data) => {
      if (data.column.index === 7 && data.cell.section === 'body') {
        data.cell.text = ''; // Ensure the default text is cleared
      }
    },
  });

  doc.save("studentsApplied.pdf");
};

const downloadExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Students");

  worksheet.columns = [
    { header: "S.No", key: "sno", width: 10 },
    { header: "Job Id", key: "jobId", width: 10 },
    { header: "Job Title", key: "jobTitle", width: 20 },
    { header: "Name", key: "name", width: 30 },
    { header: "Email", key: "email", width: 30 },
    { header: "Phone", key: "phone", width: 15 },
    { header: "Applied Date", key: "appliedAt", width: 15 },
    { header: "Resume", key: "resume", width: 30 },
  ];

  data.forEach((student, index) => {
    worksheet.addRow({
      sno: index + 1,
      jobId: student.jobId,
      jobTitle: student.jobTitle,
      name: student.name,
      email: student.email,
      phone: student.phone,
      appliedAt: moment(student.appliedAt).format("DD-MM-YYYY"),
      resume: `${student.name}-Resume`,
    });
  });

  data.forEach((student, index) => {
    const cell = worksheet.getCell(`H${index + 2}`);
    cell.value = {
      text: `${student.name}-Resume`,
      hyperlink: `http://3.7.169.233:5000/api/job-applications/downloadResume/${student._id}`,
    };
    cell.font = { color: { argb: "FF0000FF" }, underline: true };
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  saveAs(blob, "studentsApplied.xlsx");
};

const StudentApplied = () => {
  const [search, setSearch] = useState("");
  const [selectedStudents, setSelectedStudents] = useState({});
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [studentData, setStudentData] = useState([]);
  const [selectedResume, setSelectedResume] = useState(null);
  const [resumeType, setResumeType] = useState(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentPage, setCurrentPage] = useState(1);
  const studentsPerPage = 10;
  const {
    isOpen: isAlertOpen,
    onOpen: onAlertOpen,
    onClose: onAlertClose,
  } = useDisclosure();
  const cancelRef = useRef();
  const location = useLocation();  
  const [jobId, setJobId] = useState(null);

  useEffect(() => {
    // Extract jobId from query parameters
    const queryParams = new URLSearchParams(location.search);
    const jobIdFromQuery = queryParams.get('jobId');
    setJobId(jobIdFromQuery);

    if (jobIdFromQuery) {
      const fetchStudentData = async () => {
        try {
          const response = await axios.get(
            `http://3.7.169.233:5000/api/job-applications/applications/${jobIdFromQuery}`
          );
          setStudentData(response.data);
        } catch (error) {
          console.error("Error fetching student data:", error);
        }
      };

      fetchStudentData();
    }
  }, [location.search]);

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
    const selectedIds = Object.keys(selectedStudents).filter(
      (id) => selectedStudents[id]
    );
    if (selectedIds.length > 0) {
      try {
        await axios.post("http://3.7.169.233:5000/api/job-applications/delete", {
          ids: selectedIds,
        });
        setStudentData((prevData) =>
          prevData.filter((student) => !selectedIds.includes(student._id))
        );
        setSelectedStudents({});
        setSelectAllAcrossPages(false);
      } catch (error) {
        console.error("Error deleting student data:", error);
      }
    }
    onAlertClose();
  };

  const handleViewResume = (studentId) => {
    const res = studentData.find((student) => student._id === studentId);
    const fileType = res.resume.split(".").pop();

    setResumeType(fileType);
    setSelectedResume(`http://3.7.169.233:5000/api/job-applications/viewResume/${studentId}`);
    onOpen();
  };

  const handleDownloadResume = (studentId) => {
    window.open(
      `http://3.7.169.233:5000/api/job-applications/downloadResume/${studentId}`,
      "_blank"
    );
  };

  const indexOfLastStudent = currentPage * studentsPerPage;
  const indexOfFirstStudent = indexOfLastStudent - studentsPerPage;
  const currentStudents = filteredData.slice(
    indexOfFirstStudent,
    indexOfLastStudent
  );

  const totalPages = Math.ceil(filteredData.length / studentsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) =>
      prevPage < totalPages ? prevPage + 1 : prevPage
    );
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const selectedData = studentData.filter(
    (student) => selectedStudents[student._id]
  );

  return (
    <Box>
      <Container maxW="7xl" py={10} mt={20}>
        <Flex direction="column" align="center" justify="center" mb={10}>
          <Heading
            fontSize="3xl"
            fontFamily={"ClashDisplay"}
            color={"blue.400"}
          >
            Student Job Applications
          </Heading>
          <Flex
            direction={{ base: "column", md: "row" }}
            align="center"
            justify="space-between"
            w="full"
            mt={5}
            mb={8}
          >
            <Flex align="center" mb={{ base: 5, md: 0 }}>
              <Input
                placeholder="Search by name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                mr={2}
              />
              <IconButton
                icon={<MdSearch />}
                aria-label="Search"
                colorScheme="blue"
              />
            </Flex>
            <Flex align="center">
               <Button
                colorScheme="teal"
                mr={2}
                onClick={handleSelectAllAcrossPages}
                isDisabled={studentData.length === 0}
              >
                {selectAllAcrossPages ? "Unselect All" : "Select All Across Pages"}
              </Button>
              <Button
                colorScheme="blue"
                mr={2}
                leftIcon={<FaFilePdf />}
                onClick={() => downloadPDF(selectedData)}
                isDisabled={Object.values(selectedStudents).every((val) => !val)}

              >
                Download PDF
              </Button>
              <Button
                colorScheme="blue"
                mr={2}
                leftIcon={<FaFileExcel />}
                onClick={() => downloadExcel(selectedData)}
                isDisabled={Object.values(selectedStudents).every((val) => !val)}
              >
                Download Excel
              </Button>
              <Button
                colorScheme="red"
                leftIcon={<MdDelete />}
                onClick={onAlertOpen}
                isDisabled={Object.values(selectedStudents).every((val) => !val)}
              >
                Delete Selected
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
                <Th>Job Id</Th>
                <Th>Job Title</Th>
                <Th>Name</Th>
                <Th>Email</Th>
                <Th>Phone</Th>
                <Th>Applied Date</Th>
                <Th>Resume</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentStudents.map((student, index) => (
                <Tr key={student._id}>
                  <Td>
                    <Checkbox
                      isChecked={selectedStudents[student._id] || false}
                      onChange={() => handleSelectStudent(student._id)}
                      borderColor="black"
                    />
                  </Td>
                  <Td>{indexOfFirstStudent + index + 1}</Td>
                  <Td>{student.jobId}</Td>
                  <Td>{student.jobTitle}</Td>
                  <Td>{student.name}</Td>
                  <Td>{student.email}</Td>
                  <Td>{student.phone}</Td>
                  <Td>{moment(student.appliedAt).format("YYYY-MM-DD")}</Td>
                  <Td>
                      <Stack direction="row" spacing={2}>
                        {student.resume && student.resume.endsWith(".pdf") ? (
                          <FaFilePdf  color="red"/>
                        ) : student.resume && student.resume.endsWith(".docx") ? (
                          <FaFileWord color="blue" />
                        ) : null}
                        <IconButton
                          icon={<MdVisibility />}
                          aria-label="View"
                          size="sm"
                          onClick={() => handleViewResume(student._id)}
                          isDisabled={!student.resume}
                        />
                        <IconButton
                          icon={<MdDownload />}
                          aria-label="Download"
                          size="sm"
                          onClick={() => handleDownloadResume(student._id)}
                          isDisabled={!student.resume}
                        />
                      </Stack>
                    </Td>

                </Tr>
              ))}
            </Tbody>
          </Table>
          <Flex justify="space-between" align="center" mt={4}>
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
        </Flex>
      </Container>

      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
              Are you sure? You can't undo this action afterwards.
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

export default StudentApplied;
