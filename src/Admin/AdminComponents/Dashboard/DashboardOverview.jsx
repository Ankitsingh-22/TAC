import React, { useEffect, useState } from 'react';
import { Box, Grid, Flex, Text, Center } from '@chakra-ui/react';
import { FaUserGraduate, FaUniversity, FaBuilding, FaBriefcase } from 'react-icons/fa';
import { MdContactMail } from "react-icons/md";
import CurrentDateTime from './CurrentDateTime';

const DashboardOverview = () => {
  const [collegeCount, setCollegeCount] = useState(0);
  const [companyCount, setCompanyCount] = useState(0);
  const [jobPostCount, setJobPostCount] = useState(0);
  const [contactCount, setContactCount] = useState(0);
  const [studentPostCount, setStudentPostCount] = useState(0);
  const [studentApplyCount, setStudentApplyCount] = useState(0);
  

  useEffect(() => {
    const fetchCollegeCount = async () => {
      try {
        //const response = await fetch('http://3.7.169.233:5000/api/college/count');

        const response = await fetch('http://3.7.169.233:5000/api/college/count');
        const data = await response.json();
        setCollegeCount(data.count);
      } catch (error) {
        console.error('Error fetching college count:', error);
      }
    };

    const fetchCompanyCount = async () => {
      try {
        //const response = await fetch('http://3.7.169.233:5000/api/company/count');

        const response = await fetch('http://3.7.169.233:5000/api/company/count');
        const data = await response.json();
        setCompanyCount(data.count);
      } catch (error) {
        console.error('Error fetching company count:', error);
      }
    };

    const fetchJobPostCount = async () => {
      try {
       // const response = await fetch('http://3.7.169.233:5000/api/cards/count');

        const response = await fetch('http://3.7.169.233:5000/api/cards/count');
        const data = await response.json();
        setJobPostCount(data.count);
      } catch (error) {
        console.error('Error fetching job post count:', error);
      }
    };

    const fetchContactCount = async () => {
      try {
        //const response = await fetch('http://3.7.169.233:5000/api/contact/count');

        const response = await fetch('http://3.7.169.233:5000/api/contact/count');
        const data = await response.json();
        setContactCount(data.count);
      } catch (error) {
        console.error('Error fetching contact count:', error);
      }
    };

    const fetchStudentPostCount = async () => {
      try {
       // const response = await fetch('http://3.7.169.233:5000/api/resumes/count');

         const response = await fetch('http://3.7.169.233:5000/api/resumes/count');
        const data = await response.json();
        setStudentPostCount(data.count);
      } catch (error) {
        console.error('Error fetching student posted a resume count:', error);
      }
    };

    const fetchStudentApplyCount = async () => {
      try {
        //const response = await fetch('http://3.7.169.233:5000/api/job-Applications/count');

        const response = await fetch('http://3.7.169.233:5000/api/job-Applications/count');
        const data = await response.json();
        setStudentApplyCount(data.count);
      } catch (error) {
        console.error('Error fetching student applied count:', error);
      }
    };

    fetchCollegeCount();
    fetchCompanyCount();
    fetchJobPostCount();
    fetchContactCount();
    fetchStudentApplyCount();
    fetchStudentPostCount();
  }, []);

  const summaryCards = [
    { title: 'Students (Posted Resumes)', value: studentPostCount, icon: <FaUserGraduate />, bgColor: 'blue.100' },
    { title: 'Students (Applied for Jobs)', value: studentApplyCount, icon: <FaUserGraduate />, bgColor: 'green.100' },
    { title: 'Total Colleges', value: collegeCount, icon: <FaUniversity />, bgColor: 'purple.100' },
    { title: 'Total Companies', value: companyCount, icon: <FaBuilding />, bgColor: 'yellow.100' },
    { title: 'Jobs Posted', value: jobPostCount, icon: <FaBriefcase />, bgColor: 'orange.100' },
    { title: 'Contacted', value: contactCount, icon: <MdContactMail />, bgColor: 'red.100' },
  ];

  return (
    <Box mt={20}>
      <CurrentDateTime />
      <Grid
        templateColumns={{
          base: 'repeat(1, 1fr)', // 1 column for small screens
          sm: 'repeat(2, 1fr)', // 2 columns for small screens
          md: 'repeat(3, 1fr)'  // 3 columns for medium and larger screens
        }}
        gap={6}
        mb={6}
      >
        {summaryCards.map((card, index) => (
          <Box key={index} p={5} bg={card.bgColor} borderRadius="md" boxShadow="md">
            <Flex direction="column" alignItems="center">
              <Box fontSize="4xl" mb={2}>
                {card.icon}
              </Box>
              <Text fontSize="lg" fontWeight="bold" textAlign="center" mb={2}>
                {card.title}
              </Text>
              <Text fontSize="2xl" fontWeight="bold" textAlign="center">
                {card.value}
              </Text>
            </Flex>
          </Box>
        ))}
      </Grid>
    </Box>
  );
};

export default DashboardOverview;
