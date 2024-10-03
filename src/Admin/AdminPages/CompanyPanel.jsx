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
import ExcelJS from "exceljs";
import { saveAs } from "file-saver";
import jsPDF from "jspdf";
import "jspdf-autotable";

const downloadPDF = (data) => {
  const doc = new jsPDF();

  const tableColumn = [
    "S.No",
    "Company Name",
    "Industry",
    "Location",
    "Company Size",
    "Contact Person",
    "Contact Email", 
    "Contact Phone",  
    "Partnership Interests",
    "Adititonal Information",
    "Date",
  ];

  const tableRows = [];

  data.forEach((company, index) => {
    const companyData = [
      index + 1,
      company.companyName,
      company.industry,
      company.location,
      company.companySize,
      company.contactPerson,
      company.contactEmail,
      company.contactPhone,
      company.partnershipInterests.join(", "),
      company.additionalInfo,
      moment(company.createdAt).format("DD-MM-YYYY"),
    ];

    tableRows.push(companyData);
  });

  doc.autoTable({
    head: [tableColumn],
    body: tableRows,
    startY: 20,
    styles: { fontSize: 8 },
    headStyles: { fillColor: [0, 123, 255] },
  });

  doc.save("companies.pdf");
};

const downloadExcel = async (data) => {
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Companies");

  worksheet.columns = [
    { header: "S.No", key: "sno", width: 10 },
    { header: "Company Name", key: "companyName", width: 30 },    
    { header: "Industry", key: "industry", width: 30 },
    { header: "Location", key: "location", width: 30 },
    { header: "Company Size", key: "companySize", width: 20 },
    { header: "Contact Person", key: "contactPerson", width: 30 },
    { header: "Contact Email", key: "contactEmail", width: 20 },
    { header: "Contact Phone", key: "contactPhone", width: 20 },
    { header: "Partnership Interests", key: "partnershipInterests", width: 30 },
    { header: "Additional Information", key: "additionalInfo", width: 30 },    
    { header: "Date", key: "Date", width: 15 },
  ];

  data.forEach((company, index) => {
    worksheet.addRow({
      sno: index + 1,
      companyName: company.companyName,
      industry: company.industry,
      location: company.location,
      companySize: company.companySize,
      contactPerson: company.contactPerson,
      contactEmail: company.contactEmail,
      contactPhone: company.contactPhone,
      partnershipInterests: company.partnershipInterests.join(", "),
      additionalInfo: company.additionalInfo,
      Date: moment(company.createdAt).format("DD-MM-YYYY"),
    });
  });

  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" });
  saveAs(blob, "companies.xlsx");
};

const CompanyPanel = () => {
  const [search, setSearch] = useState("");
  const [selectedCompanies, setSelectedCompanies] = useState({});
  const [selectAllAcrossPages, setSelectAllAcrossPages] = useState(false);
  const [companyData, setCompanyData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const companiesPerPage = 10;
  const { isOpen: isAlertOpen, onOpen: onAlertOpen, onClose: onAlertClose } = useDisclosure();
  const cancelRef = useRef();

  useEffect(() => {
    const fetchCompanyData = async () => {
      try {
        const response = await axios.get("http://3.7.169.233:5000/api/company/company-forms");
        setCompanyData(response.data);
      } catch (error) {
        console.error("Error fetching company data:", error);
      }
    };
    fetchCompanyData();
  }, []);

  const filteredData = companyData.filter((company) =>
    company.companyName.toLowerCase().includes(search.toLowerCase())
  );

  const handleSelectAllOnPage = (e) => {
    const isChecked = e.target.checked;
    const newSelectedCompanies = { ...selectedCompanies };
    currentCompanies.forEach((company) => {
      newSelectedCompanies[company._id] = isChecked;
    });
    setSelectedCompanies(newSelectedCompanies);
  };

  const handleSelectCompany = (companyId) => {
    setSelectedCompanies((prevSelected) => ({
      ...prevSelected,
      [companyId]: !prevSelected[companyId],
    }));
  };

  const handleSelectAllAcrossPages = () => {
    setSelectAllAcrossPages((prev) => {
      const newSelected = !prev;
      if (newSelected) {
        const newSelectedCompanies = {};
        filteredData.forEach((company) => {
          newSelectedCompanies[company._id] = true;
        });
        setSelectedCompanies(newSelectedCompanies);
      } else {
        setSelectedCompanies({});
      }
      return newSelected;
    });
  };

  const handleDeleteSelected = async () => {
    const selectedIds = Object.keys(selectedCompanies).filter((id) => selectedCompanies[id]);
    if (selectedIds.length > 0) {
      try {
        await axios.delete("http://3.7.169.233:5000/api/company/delete", {
          data: { ids: selectedIds },
        });
        setCompanyData((prevData) => prevData.filter((company) => !selectedIds.includes(company._id)));
        setSelectedCompanies({});
        setSelectAllAcrossPages(false);
      } catch (error) {
        console.error("Error deleting company data:", error);
      }
    }
    onAlertClose();
  };

  const indexOfLastCompany = currentPage * companiesPerPage;
  const indexOfFirstCompany = indexOfLastCompany - companiesPerPage;
  const currentCompanies = filteredData.slice(indexOfFirstCompany, indexOfLastCompany);

  const totalPages = Math.ceil(filteredData.length / companiesPerPage);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => (prevPage < totalPages ? prevPage + 1 : prevPage));
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => (prevPage > 1 ? prevPage - 1 : prevPage));
  };

  const selectedData = companyData.filter((company) => selectedCompanies[company._id]);

  return (
    <Box>
      <Container maxW="9xl" py={10} mt={20}>
        <Flex direction="column" align="center" justify="center"  mb={10}>
            <Heading fontSize="3xl" fontFamily={"ClashDisplay"} color={"blue.400"}>
              COMPANY DETAILS
            </Heading>
        </Flex>
        <Stack spacing={2}>
                     
            <Flex>
              <Input
                placeholder="Search by company name"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                w={{ base: "full", sm: "300px" }}
              />
              <IconButton icon={<MdSearch />} aria-label="Search" ml={2} />
            

          <Flex mb={4} justify="flex-end" align="center">
            <Button
              colorScheme="teal"
              mr={2}
              onClick={handleSelectAllAcrossPages}
              isDisabled={companyData.length === 0}
            >
              {selectAllAcrossPages ? "Unselect All" : "Select All Across Pages"}
            </Button>
            <Button
              colorScheme="red"
              leftIcon={<MdDelete />}
              onClick={onAlertOpen}
              mr={2}
              isDisabled={Object.keys(selectedCompanies).every((id) => !selectedCompanies[id])}
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
                    isChecked={currentCompanies.every((company) => selectedCompanies[company._id])}
                    onChange={handleSelectAllOnPage}
                    borderColor="black"
                  />
                </Th>
                <Th>S.No</Th>
                <Th>Company Name</Th>
                <Th>Industry</Th>
                <Th>Location</Th>
                <Th>Company Size</Th>
                <Th>Contact Person</Th>
                <Th>Contact Email</Th>
                <Th>Contact Phone</Th>
                <Th>Partnership Interests</Th>
                <Th>Additional Information</Th>
                <Th>Date</Th>
              </Tr>
            </Thead>
            <Tbody>
              {currentCompanies.map((company, index) => (
                <Tr key={company._id}>
                  <Td>
                    <Checkbox
                      isChecked={selectedCompanies[company._id] || false}
                      onChange={() => handleSelectCompany(company._id)}
                      borderColor="black"
                    />
                  </Td>
                  <Td>{indexOfFirstCompany + index + 1}</Td>
                  <Td>{company.companyName}</Td>                  
                  <Td>{company.industry}</Td>
                  <Td>{company.location}</Td>
                  <Td>{company.companySize}</Td>
                  <Td>{company.contactPerson}</Td>
                  <Td>{company.contactEmail}</Td>
                  <Td>{company.contactPhone}</Td>
                  <Td>{company.partnershipInterests.join(", ")}</Td>
                  <Td>{company.additionalInfo}</Td>                 
                  <Td>{moment(company.createdAt).format("DD-MM-YYYY")}</Td>
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
        isCentered
      >
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize="lg" fontWeight="bold">
              Delete Company Details
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

export default CompanyPanel;
