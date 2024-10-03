import React, { useState, useRef, useEffect } from 'react';
import { Box, Heading, Text, Input, Button, Stack, Icon, VStack, HStack } from '@chakra-ui/react';
import { Formik, Form, Field } from 'formik';
import * as Yup from 'yup';
import axios from 'axios';
import { FaGraduationCap, FaClock , FaBriefcase,FaBuilding, FaTags,  } from 'react-icons/fa';
import { FaLocationDot } from "react-icons/fa6";
import { IoPerson } from "react-icons/io5";
import { RiSpeakFill } from "react-icons/ri";

const validationSchema = Yup.object({
  name: Yup.string()
    .required('Name is required')
    .matches(/^[A-Za-z\s]+$/, 'Name should only contain letters and spaces'),
  email: Yup.string()
    .email('Invalid email')
    .matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Email must be a valid Gmail address')
    .required('Email is required'),
  phone: Yup.string()
    .matches(/^\d{10}$/, 'Phone number must be exactly 10 digits')
    .required('Phone number is required'),
  resume: Yup.mixed().required('Resume is required'),
});

export default function OpeningForm({ jobId }) {
  const [message, setMessage] = useState(null);
  const [jobDetails, setJobDetails] = useState(null);
  const fileInputRef = useRef();

  useEffect(() => {
    const fetchJobDetails = async () => {
      if (!jobId) {
        console.error("No jobId provided");
        return;
      }
      
      try {
        //const response = await axios.get(`http://3.7.169.233:5000/api/cards/cards/${jobId}`);
        const response = await axios.get(`http://3.7.169.233:5000/api/cards/cards/${jobId}`);

        setJobDetails(response.data);
      } catch (error) {
        console.error("Error fetching job details:", error.response ? error.response.data : error.message);
      }
    };

    fetchJobDetails();
  }, [jobId]);

  const handleSubmit = async (values, actions) => {
    const data = new FormData();
    data.append('name', values.name);
    data.append('email', values.email);
    data.append('phone', values.phone);
    data.append('resume', values.resume);
    data.append('jobId', jobId);
    data.append('jobTitle', jobDetails.title);

    try {
      //await axios.post('http://3.7.169.233:5000/api/job-applications/apply', data, {

      await axios.post('http://3.7.169.233:5000/api/job-applications/apply', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });
      setMessage({ text: 'Resume uploaded successfully!', type: 'success' });
      actions.resetForm();
      if (fileInputRef.current) fileInputRef.current.value = '';
      setTimeout(() => setMessage(null), 3000);
    } catch (error) {
      setMessage({ text: 'Error uploading resume.', type: 'error' });
      setTimeout(() => setMessage(null), 3000);
    }
    actions.setSubmitting(false);
  };

  if (!jobDetails) {
    return <Text>Loading job details...</Text>;
  }

  return (
    <Formik 
      initialValues={{ name: '', email: '', phone: '', resume: null }}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      {({ setFieldValue, isSubmitting, errors, touched }) => (
        <Form>
          <Stack spacing={4} bg={'white'} rounded={'xl'} p={{ base: 4, sm: 6, md: 8 }}>
            <Heading fontSize="2xl" mb={4}>Job Description</Heading>
            <Text fontSize="lg" mb={6}>{jobDetails.jobDescription}</Text><hr></hr>

            {/* Job Details Section */}
            <Heading fontSize="2xl" mb={4}>Job Role</Heading>
            <VStack align="start" spacing={2} mb={6}>
              <HStack spacing={2}>
                <Icon as={FaLocationDot} boxSize={5} />
                <Text color="gray.500">Work Location:</Text>
                <Text>{jobDetails.location}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaBuilding} boxSize={5} />
                <Text color="gray.500">Department:</Text>
                <Text>{jobDetails.department}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaTags} boxSize={5} />
                <Text width="120px" color="gray.500">Role / Category:</Text>
                <Text width="auto">{jobDetails.jobRole} & {jobDetails.roleCategory}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaClock} boxSize={5} />
                <Text color="gray.500">Employment type:</Text>
                <Text>{jobDetails.employmentType}</Text>
              </HStack>
            </VStack>
            <hr></hr>

            <Heading fontSize="2xl" mb={4}>Job Requirements</Heading>
            <VStack align="start" spacing={2} mb={6}>
              <HStack spacing={2}>
                <Icon as={FaBriefcase} boxSize={5} />
                <Text color="gray.500">Experience:</Text>
                <Text>{jobDetails.experience}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={FaGraduationCap} boxSize={5} />
                <Text color="gray.500">Education:</Text>
                <Text>{jobDetails.education}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={RiSpeakFill} boxSize={5} />
                <Text color="gray.500">English level:</Text>
                <Text>{jobDetails.englishLevel}</Text>
              </HStack>
              <HStack spacing={2}>
                <Icon as={IoPerson} boxSize={5} />
                <Text color="gray.500">Gender:</Text>
                <Text>{jobDetails.gender}</Text>
              </HStack>
            </VStack>

            {/* Form Fields */}
            <Field name="name">
              {({ field }) => (
                <Input
                  {...field}
                  type="text"
                  placeholder="Full Name"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{ color: "gray.500" }}
                  size="lg"
                />
              )}
            </Field>
            {errors.name && touched.name && (
              <Text color="red.500" textAlign="center">{errors.name}</Text>
            )}

            <Field name="email">
              {({ field }) => (
                <Input
                  {...field}
                  type="email"
                  placeholder="Email Address"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{ color: "gray.500" }}
                  size="lg"
                />
              )}
            </Field>
            {errors.email && touched.email && (
              <Text color="red.500" textAlign="center">{errors.email}</Text>
            )}

            <Field name="phone">
              {({ field }) => (
                <Input
                  {...field}
                  type="tel"
                  placeholder="Phone Number"
                  bg={"gray.100"}
                  border={0}
                  color={"gray.500"}
                  _placeholder={{ color: "gray.500" }}
                  size="lg"
                />
              )}
            </Field>
            {errors.phone && touched.phone && (
              <Text color="red.500" textAlign="center">{errors.phone}</Text>
            )}

            <Field name="resume">
              {() => (
                <Box>
                  <Input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(event) => setFieldValue("resume", event.currentTarget.files[0])}
                    ref={fileInputRef}
                    style={{
                      padding: "8px",
                      border: "none",
                      borderRadius: "4px",
                      background: "#f7fafc",
                    }}
                  />
                  <Text fontSize="sm" color="gray.500" mt={2}>
                    Upload your resume in .pdf or .docx format.
                  </Text>
                  {errors.resume && <Text color="red.500">{errors.resume}</Text>}
                </Box>
              )}
            </Field>

            <Button
              mt={4}
              colorScheme="blue"
              isLoading={isSubmitting}
              type="submit"
               _hover={{transform: "scale(1.05)"}}
            >
              Apply
            </Button>

            {message && (
              <Text color={message.type === 'success' ? 'green.500' : 'red.500'} textAlign="center">
                {message.text}
              </Text>
            )}
          </Stack>
        </Form>
      )}
    </Formik>
  );
}
