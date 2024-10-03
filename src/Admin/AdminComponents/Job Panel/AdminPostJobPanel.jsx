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
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  FormControl,
  FormLabel,
  Textarea,
} from "@chakra-ui/react";
import { MdSearch, MdDelete } from "react-icons/md";
import { FaFileExcel, FaFilePdf,FaArrowLeft, FaArrowRight, FaEdit, FaEye, FaUsers } from "react-icons/fa";
import axios from "axios";
import moment from "moment";
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";
import { useNavigate } from "react-router-dom";

{/*
const handleExportPDF = (data) => {
    const doc = new jsPDF();
  const tableColumn = [
      "S.No",
      "Job Id",
      "Title",
      "Location",
      "Salary",
      "Experience",
      "Job Description",
      "Job Role", 
      "Department",  
      "Role Category",
      "Employment Type",
      "Education",
      "English Level",
      "Gender",
      "Students Applied",
      "Posted On"
    ];

    const tableRows = [];

    data.forEach((job, index) => {
      const jobData = [
        index + 1,
        job.jobId,
        job.title,
        job.location,
        job.salary,
        job.experience,
        job.jobDescription,
        job.jobRole,
        job.department,
        job.roleCategory,
        job.employmentType,
        job.education,
        job.englishLevel,
        job.gender,
        job.studentsApplied,
        moment(job.createdAt).format("DD-MM-YYYY"),
      ];

      tableRows.push(jobData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 123, 255] },
  });

  doc.save("jobs_data.pdf");
};
*/}

const handleExportExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Jobs_post");

  worksheet.columns = [
    { header: "S.No", key: "sno", width: 10 },
    { header: "Job Id", key: "jobId", width: 30 },    
    { header: "Job Title", key: "title", width: 30 },
    { header: "Location", key: "location", width: 30 },
    { header: "Salary", key: "salary", width: 20 },
    { header: "Experience", key: "experience", width: 30 },
    { header: "Job Description", key: "jobDescription", width: 20 },
    { header: "Role Category", key: "roleCategory", width: 20 },
    { header: "Employment Type", key: "employmentType", width: 20 },
    { header: "Education", key: "education", width: 20 },   
    { header: "English Level", key: "englishLevel", width: 20 }, 
    { header: "Gender", key: "gender", width: 20 }, 
    { header: "Students Applied", key: "studentsApplied", width: 20 },
    { header: "Job Posted on", key: "createdAt", width: 15 },
  ];

  data.forEach((job, index) => {
    worksheet.addRow({
      sno: index + 1,
      jobId:  job.jobId,
      title: job.title,
      location: job.location,
      salary: job.salary,
      experience: job.experience,
      jobDescription: job.jobDescription,
      jobRole: job.jobRole,
      department: job.department,
      roleCategory: job.roleCategory,
      employmentType: job.employmentType,
      education: job.education,
      englishLevel: job.englishLevel,
      gender: job.gender,
      studentsApplied: job.studentsApplied,
      createdAt: moment(job.createdAt).format("DD-MM-YYYY"),

    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "Jobs_post.xlsx");
};


const AdminPostJobPanel = () => {
  const [search, setSearch] = useState("");
  const [selectedJobs, setSelectedJobs] = useState({}); 
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [jobData, setJobData] = useState([]);  
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 10;
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const { isOpen: isPostModalOpen, onOpen: onPostModalOpen, onClose: onPostModalClose } = useDisclosure();
  const { isOpen: isEditModalOpen, onOpen: onEditModalOpen, onClose: onEditModalClose } = useDisclosure();
  const { isOpen: isViewModalOpen, onOpen: onViewModalOpen, onClose: onViewModalClose } = useDisclosure();
  const cancelRef = useRef();
  const [formData, setFormData] = useState({ title: "", location: "", salary: "", experience: "", jobDescription: "", jobRole: "",department: "", roleCategory: "", employmentType: "", education: "", englishLevel: "", gender: "" });
  const [editData, setEditData] = useState(null);
  const [viewData, setViewData] = useState(null);
  
  useEffect(() => {
  const fetchJobData = async () => {
    try {
      // Fetch job data
      //const response = await axios.get("http://3.7.169.233:5000/api/cards/cards");

      const response = await axios.get("http://3.7.169.233:5000/api/cards/cards");
      const jobData = response.data;

      // Fetch number of students applied for each job
      const updatedJobs = await Promise.all(
        jobData.map(async (job) => {
          try {
            //const { data } = await axios.get(`http://3.7.169.233:5000/api/job-applications/applications/count/${job.jobId}`);

            const { data } = await axios.get(`http://3.7.169.233:5000/api/job-applications/applications/count/${job.jobId}`);
            return { ...job, studentsApplied: data.count };
          } catch (err) {
            console.error(`Error fetching student count for job ${job.jobId}:`, err);
            return { ...job, studentsApplied: 0 }; // Handle errors gracefully
          }
        })
      );

      setJobData(updatedJobs);
    } catch (error) {
      console.error("Error fetching job data:", error);
    }
  };

  fetchJobData();
}, []);



  const filteredData = jobData.filter((job) =>
      job.title.toLowerCase().includes(search.toLowerCase()) ||
      job.jobId.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAllOnPage = (e) => {
      const isChecked = e.target.checked;
      const newSelectedJobs = { ...selectedJobs };

      currentJobs.forEach((job) => {
        newSelectedJobs[job.jobId] = isChecked;
      });
      setSelectedJobs(newSelectedJobs);
  };

const handleSelectJob = (jobId) => {
  setSelectedJobs((prevSelected) => ({
    ...prevSelected,
    [jobId]: !prevSelected[jobId],
  }));
};

const handleSelectAllAcrossPages = () => {
  setSelectAllAcrossPages((prev) => {
    const newSelected = !prev;
    if (newSelected) {
      const newSelectedJobs = {};
      filteredData.forEach((job) => {
        newSelectedJobs[job.jobId] = true;
      });
      setSelectedJobs(newSelectedJobs);
    } else {
      setSelectedJobs({});
    }
    return newSelected;
  });
};

const handleDeleteSelected = async () => {
  const selectedIds = Object.keys(selectedJobs).filter((jobId) => selectedJobs[jobId]);
    if (selectedIds.length > 0) {
      try {
        //await axios.delete("http://3.7.169.233:5000/api/cards/cards", {

          await axios.delete("http://3.7.169.233:5000/api/cards/cards", {
          data: { jobId: selectedIds },
        });
        setJobData((prevData) => prevData.filter((job) => !selectedIds.includes(job.jobId)));
        setSelectedJobs({});
        setSelectAllAcrossPages(false);
      } catch (error) {
        console.error("Error deleting Job Post:", error);
      }
    }
    onAlertClose();
};


  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredData.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredData.length / jobsPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const handlePostJob = async () => {
    try {
      //await axios.post("http://3.7.169.233:5000/api/cards/cards", formData);

      await axios.post("http://3.7.169.233:5000/api/cards/cards", formData);
      setFormData({ title: "", location: "", salary: "", experience: "", jobDescription: "",jobRole: "", department: "", roleCategory: "", employmentType: "", education: "", englishLevel: "", gender: ""  });
      onPostModalClose();
      // Refresh job data
     // const response = await axios.get("http://3.7.169.233:5000/api/cards/cards");

      const response = await axios.get("http://3.7.169.233:5000/api/cards/cards");
      setJobData(response.data);
    } catch (error) {
      console.error("Error posting job:", error);
    }
  };

  const handleEditJob = async () => {
    try {
      //await axios.put(`http://3.7.169.233:5000/api/cards/cards/${editData.jobId}`, editData);

      await axios.put(`http://3.7.169.233:5000/api/cards/cards/${editData.jobId}`, editData);
      onEditModalClose();
      // Refresh job data
      //const response = await axios.get("http://3.7.169.233:5000/api/cards/cards");


      const response = await axios.get("http://3.7.169.233:5000/api/cards/cards");
      setJobData(response.data);
    } catch (error) {
      console.error("Error editing job:", error);
    }
  };

  const handleViewJob = async (jobId) => {
    try {
      //const response = await axios.get(`http://3.7.169.233:5000/api/cards/cards/${jobId}`);


      const response = await axios.get(`http://3.7.169.233:5000/api/cards/cards/${jobId}`);
      setViewData(response.data);
      onViewModalOpen();
    } catch (error) {
      console.error("Error fetching job details:", error);
    }
  };

  const navigate = useNavigate();

  const handleViewStudentsApplied = (jobId) => {
    // Navigate to the new page with the job ID as a query parameter or route parameter if needed
    navigate(`/admin/studentapplied?jobId=${jobId}`);
  };

  const selectedData = jobData.filter((job) => selectedJobs[job.jobId]);

  return (
    <Box>
      <Container maxW="9xl" py={10} mt={20}>
        <Flex direction="column" align="center" justify="center"  mb={10}>
            <Heading fontSize="3xl" fontFamily={"ClashDisplay"} color={"blue.400"}>
              JOB POSTS
            </Heading>
        </Flex>
        
        <Stack spacing={2}>
          <Flex align="center" justify="space-between">
           
            <Flex>
              <Input
                placeholder="Search by job title or ID"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                w={{ base: "full", sm: "300px" }}
              />
              <IconButton icon={<MdSearch />} aria-label="Search" ml={2} />
              <Button
                colorScheme="teal"
                ml={4}
                onClick={onPostModalOpen}
              >
                Post a Job
              </Button>
              <Button
                colorScheme="blue"
                leftIcon={<FaFileExcel />}
                onClick={() => handleExportExcel(selectedData)}
                ml={4}
                isDisabled={selectedData.length === 0}
              >
                Export to Excel
              </Button>
             {/* <Button
                colorScheme="blue"
                leftIcon={<FaFilePdf />}
                onClick={() => handleExportPDF(selectedData)}
                ml={4}
                isDisabled={selectedData.length === 0}
              >
                Export to PDF
              </Button> */}
              <Button
                colorScheme="red"
                leftIcon={<MdDelete />}
                onClick={onAlertOpen}
                ml={2}
                isDisabled={Object.keys(selectedJobs).every((JobId) => !selectedJobs[JobId])}
              >
                Delete Selected
              </Button>
              <Button
                colorScheme="teal"
                ml={4}
                onClick={handleSelectAllAcrossPages}
                isDisabled={jobData.length === 0}
                >
                {selectAllAcrossPages ? "Unselect All" : "Select All Across Pages"}
                </Button>   
            </Flex>
          </Flex>

          <Table variant="striped" colorScheme="teal" mt={8}>
  <Thead>
    <Tr>
      <Th width="50px">
        <Checkbox
          isChecked={currentJobs.every((job) => selectedJobs[job.jobId])}
          onChange={handleSelectAllOnPage}
          borderColor="black"
        />
      </Th>
      <Th width="50px">S.No</Th>
      <Th width="100px">Job ID</Th>
      <Th>Job Title</Th>
      <Th>Job Location</Th>
      <Th>Created On</Th>
      <Th width="150px">Students Applied</Th>
      <Th width="200px">Action</Th>
    </Tr>
  </Thead>
  <Tbody>
    {currentJobs.map((job, index) => (
      <Tr key={job._id}>
        <Td>
          <Checkbox
            isChecked={!!selectedJobs[job.jobId] || false}
            onChange={() => handleSelectJob(job.jobId)}
            borderColor="black"
          />
              </Td>
              <Td>{indexOfFirstJob + index + 1}</Td>
              <Td>{job.jobId}</Td>
              <Td>{job.title}</Td>
              <Td>{job.location}</Td>
              <Td>{moment(job.createdAt).format("DD-MM-YYYY")}</Td>
              <Td>{job.studentsApplied}</Td>
              <Td padding="0" textAlign="center">
                <IconButton
                  icon={<FaEdit />}
                  aria-label="Edit"
                  mr={2}
                  onClick={() => {
                      setEditData(job);
                      onEditModalOpen();
                    }}
                />
                <IconButton
                  icon={<FaEye />}
                  aria-label="View"
                  mr={2}
                  onClick={() => handleViewJob(job.jobId)}
                />
                <IconButton
                  icon={<FaUsers />}
                  aria-label="Students Applied"
                  onClick={() => handleViewStudentsApplied(job.jobId)}
                />
              </Td>
            </Tr>
          ))}
        </Tbody>
      </Table>


          <Flex align="center" justify="center" mt={4}>
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
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Job Post(s)
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can't undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onAlertClose}>
                Cancel
              </Button>
              <Button colorScheme="red" onClick={handleDeleteSelected}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>

      {/* Modal for Post Job */}
        <Modal isOpen={isPostModalOpen} onClose={onPostModalClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Post a Job</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <FormControl>
                <FormLabel>Job Title</FormLabel>
                <Input
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Location</FormLabel>
                <Input
                  value={formData.location}
                  onChange={(e) =>
                    setFormData({ ...formData, location: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Salary</FormLabel>
                <Input
                  value={formData.salary}
                  onChange={(e) =>
                    setFormData({ ...formData, salary: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Experience</FormLabel>
                <Input
                  value={formData.experience}
                  onChange={(e) =>
                    setFormData({ ...formData, experience: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
                <FormLabel>Job Description</FormLabel>
                <Textarea
                  value={formData.jobDescription}
                  onChange={(e) =>
                    setFormData({ ...formData, jobDescription: e.target.value })
                  }
                />
              </FormControl>
              <FormControl mt={4}>
              <FormLabel>Job Role</FormLabel>
              <Input
                value={formData.jobRole}
                onChange={(e) =>
                  setFormData({ ...formData, jobRole: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Department</FormLabel>
              <Input
                value={formData.department}
                onChange={(e) =>
                  setFormData({ ...formData, department: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Role Category</FormLabel>
              <Input
                value={formData.roleCategory}
                onChange={(e) =>
                  setFormData({ ...formData, roleCategory: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Employment Type</FormLabel>
              <Input
                value={formData.employmentType}
                onChange={(e) =>
                  setFormData({ ...formData, employmentType: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Education</FormLabel>
              <Input
                value={formData.education}
                onChange={(e) =>
                  setFormData({ ...formData, education: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>English Level</FormLabel>
              <Input
                value={formData.englishLevel}
                onChange={(e) =>
                  setFormData({ ...formData, englishLevel: e.target.value })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Gender</FormLabel>
              <Input
                value={formData.gender}
                onChange={(e) =>
                  setFormData({ ...formData, gender: e.target.value })
                }
              />
            </FormControl>

            </ModalBody>
            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={handlePostJob}>
                Post Job
              </Button>
              <Button onClick={onPostModalClose}>Cancel</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>

        {/* Modal for Edit Job */}
        {editData && (
          <Modal isOpen={isEditModalOpen} onClose={onEditModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>Edit Job</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <FormControl>
                  <FormLabel>Job Title</FormLabel>
                  <Input
                    value={editData.title}
                    onChange={(e) =>
                      setEditData({ ...editData, title: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Location</FormLabel>
                  <Input
                    value={editData.location}
                    onChange={(e) =>
                      setEditData({ ...editData, location: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Salary</FormLabel>
                  <Input
                    value={editData.salary}
                    onChange={(e) =>
                      setEditData({ ...editData, salary: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Experience</FormLabel>
                  <Input
                    value={editData.experience}
                    onChange={(e) =>
                      setEditData({ ...editData, experience: e.target.value })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                  <FormLabel>Job Description</FormLabel>
                  <Textarea
                    value={editData.jobDescription}
                    onChange={(e) =>
                      setEditData({
                        ...editData,
                        jobDescription: e.target.value,
                      })
                    }
                  />
                </FormControl>
                <FormControl mt={4}>
                <FormLabel>Job Role</FormLabel>
                <Input
                  value={editData.jobRole}
                  onChange={(e) =>
                    setEditData({ ...editData, jobRole: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Department</FormLabel>
                <Input
                  value={editData.department}
                  onChange={(e) =>
                    setEditData({ ...editData, department: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Role Category</FormLabel>
                <Input
                  value={editData.roleCategory}
                  onChange={(e) =>
                    setEditData({ ...editData, roleCategory: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Employment Type</FormLabel>
                <Input
                  value={editData.employmentType}
                  onChange={(e) =>
                    setEditData({ ...editData, employmentType: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Education</FormLabel>
                <Input
                  value={editData.education}
                  onChange={(e) =>
                    setEditData({ ...editData, education: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>English Level</FormLabel>
                <Input
                  value={editData.englishLevel}
                  onChange={(e) =>
                    setEditData({ ...editData, englishLevel: e.target.value })
                  }
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Gender</FormLabel>
                <Input
                  value={editData.gender}
                  onChange={(e) =>
                    setEditData({ ...editData, gender: e.target.value })
                  }
                />
              </FormControl>

              </ModalBody>
              <ModalFooter>
                <Button colorScheme="blue" mr={3} onClick={handleEditJob}>
                  Save Changes
                </Button>
                <Button onClick={onEditModalClose}>Cancel</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}

        {/* Modal for View Job */}
        {viewData && (
          <Modal isOpen={isViewModalOpen} onClose={onViewModalClose}>
            <ModalOverlay />
            <ModalContent>
              <ModalHeader>View Job</ModalHeader>
              <ModalCloseButton />
              <ModalBody>
                <Text mb={2}>
                  <strong>Job Id:</strong> {viewData.jobId}
                </Text>
                <Text mb={2}>
                  <strong>Job Title:</strong> {viewData.title}
                </Text>
                <Text mb={2}>
                  <strong>Location:</strong> {viewData.location}
                </Text>
                <Text mb={2}>
                  <strong>Salary:</strong> {viewData.salary}
                </Text>
                <Text mb={2}>
                  <strong>Experience:</strong> {viewData.experience}
                </Text>
                <Text mb={2}>
                  <strong>Job Description:</strong> {viewData.jobDescription}
                </Text>
                <Text mb={2}>
                  <strong>Job Role:</strong> {viewData.jobRole}
                </Text>
                <Text mb={2}>
                  <strong>Department:</strong> {viewData.department}
                </Text>
                <Text mb={2}>
                  <strong>Role Category:</strong> {viewData.roleCategory}
                </Text>
                <Text mb={2}>
                  <strong>Employment Type:</strong> {viewData.employmentType}
                </Text>
                <Text mb={2}>
                  <strong>Eduction:</strong> {viewData.education}
                </Text>
                <Text mb={2}>
                  <strong>English Level:</strong> {viewData.englishLevel}
                </Text>
                <Text mb={2}>
                  <strong>Gender:</strong> {viewData.gender}
                </Text>
                <Text mb={2}>
                 <strong>Posted On:</strong> {moment(viewData.createdAt).format("DD-MM-YYYY")}
                </Text>
              </ModalBody>
              <ModalFooter>
                <Button onClick={onViewModalClose}>Close</Button>
              </ModalFooter>
            </ModalContent>
          </Modal>
        )}
    </Box>
  );
};

export default AdminPostJobPanel;
