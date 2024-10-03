import React, { useState } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Container,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Stack,
  Text,
  Textarea,
  useTheme,
  useToast
} from '@chakra-ui/react';

// Validation schema
const validationSchema = Yup.object({
  polytechnicCourses: Yup.array().min(1, 'At least one Polytechnic/ITI/Diploma course must be selected'),
  ugCourses: Yup.array().min(1, 'At least one UG course must be selected'),
  pgCourses: Yup.array().min(1, 'At least one PG course must be selected'),
  collegeName: Yup.string().required('College/Institution Name is required'),
  location: Yup.string().required('Location is required'),
  studentsStrengthUG: Yup.number().required('Students Strength (UG) is required').positive().integer(),
  studentsStrengthPG: Yup.number().required('Students Strength (PG) is required').positive().integer(),
  collegeEmail: Yup.string().email('Invalid email address').required('College Email is required'),
  mobileNumber: Yup.string().required('Mobile Number is required').matches(/^[0-9]{10}$/, 'Mobile Number must be exactly 10 digits'),
  placementSeason: Yup.string().required('Placement Season Duration is required'),
  upcomingEvents: Yup.string().required('Upcoming Student Engagements are required'),
  partnershipInterests: Yup.array().min(1, 'At least one Partnership Interests must be selected'),
});

const CollegeForm = () => {
  const theme = useTheme();
  const [message, setMessage] = useState(null);
  const [messageType, setMessageType] = useState(null); // 'success' or 'error'

  
  const formik = useFormik({
    initialValues: {
      polytechnicCourses: [],
      ugCourses: [],
      pgCourses: [],
      collegeName: '',
      location: '',
      studentsStrengthUG: '',
      studentsStrengthPG: '',
      collegeEmail: '',
      mobileNumber: '',
      placementSeason: '',
      upcomingEvents: '',
      partnershipInterests: []
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
       try {
        //await axios.post('http://3.7.169.233:5000/api/college/submit-college-form', values);

        await axios.post('http://3.7.169.233:5000/api/college/submit-college-form', values);
        setMessage("Your college details have been submitted successfully.");
        setMessageType('success');
        setTimeout(() => {
          setMessage(null);
        }, 5000); // Hide the success message after 5 seconds
        formik.resetForm(); // Reset form fields after successful submission
      } catch (error) {
        setMessage(error.response?.data || "Unable to submit college details.");
        setMessageType('error');
        setTimeout(() => {
          setMessage(null);
        }, 5000); // Hide the error message after 5 seconds
      }
    }
  });

  return (
    <Box>
      {/* Hero Section with Background Animation */}
      <Box
        position="relative"
        overflow="hidden"
        py={24}
        textAlign="center"
        color="white"
        bgGradient="linear(to-r, #008080, #0083B0)"
      >
        <Container maxW="container.lg" position="relative" zIndex={1}>
          <Heading textColor={"blue.400"} fontFamily={"ClashDisplay"} as="h1" size="2xl" mb={4} textShadow="2px 2px 4px rgba(0, 0, 0, 0.6)">
            Partner with TalentConnect
          </Heading>
          <Text fontSize="xl" mb={6} textShadow="1px 1px 2px rgba(0, 0, 0, 0.5)">
            Empower your students with the best career opportunities. Join our network today!
          </Text>
        </Container>
        <Box
          position="absolute"
          top={0}
          left={0}
          width="100%"
          height="100%"
          zIndex={0}
          _before={{
            content: '""',
            position: 'absolute',
            width: '200%',
            height: '200%',
            top: '-50%',
            left: '-50%',
            background: 'radial-gradient(circle, rgba(255, 255, 255, 0.1) 10%, transparent 20%)',
            backgroundSize: '20px 20px',
            animation: 'moveBg 20s linear infinite',
          }}
        />
        <style>
          {`
            @keyframes moveBg {
              0% {
                transform: translate(0, 0);
              }
              100% {
                transform: translate(50%, 50%);
              }
            }
          `}
        </style>
      </Box>

      {/* Message Box */}
      {message && (
        <Box
          position="fixed"
          top="50%"
          left="50%"
          transform="translate(-50%, -50%)"
          p={6}
          maxW="sm"
          borderWidth={1}
          borderRadius="md"
          borderColor={messageType === 'success' ? 'green.400' : 'red.400'}
          bgGradient={messageType === 'success' ? "linear(to-r, white, green.50)" : "linear(to-r, white, red.50)"}
          boxShadow="lg"
          textAlign="center"
          zIndex={1000}
        >
          <Heading size="md" color={messageType === 'success' ? 'green.600' : 'red.600'} mb={4}>
            {messageType === 'success' ? 'Thank you!' : 'Error!'}
          </Heading>
          <Text color={messageType === 'success' ? 'green.600' : 'red.600'}>
            {message}
          </Text>
        </Box>
      )}

      {/* Form Section */}
      <Box
        p={8}
        maxW="lg"
        mx="auto"
        borderWidth={1}
        borderRadius="lg"
        borderColor={theme.colors.blue[400]}
        boxShadow="2xl"
        bgGradient="linear(to-r, white, blue.50)"
        mt={-10}
        position="relative"
        overflow="hidden"
        _before={{
          content: '""',
          position: 'absolute',
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: `url('https://www.transparenttextures.com/patterns/white-diamond.png')`,
          opacity: 0.2,
          zIndex: -1,
        }}
      >
        <Text
          fontSize="2xl"
          mb={6}
          fontWeight="bold"
          textAlign="center"
          color="blue.600"
          bgGradient="linear(to-r, blue.400, blue.600)"
          bgClip="text"
        >
          Submit Your College Details
        </Text>

        <form onSubmit={formik.handleSubmit}>
          <Stack spacing={4}>

              {/* Polytechnic/ITI/Diploma Courses Multi-Select */}
              <FormControl isInvalid={formik.touched.polytechnicCourses && formik.errors.polytechnicCourses}>
                <FormLabel fontWeight="bold">Polytechnic/ITI/Diploma Courses Offered (Select all that apply)</FormLabel>
                <CheckboxGroup
                  name="polytechnicCourses"
                  value={formik.values.polytechnicCourses}
                  onChange={(value) => formik.setFieldValue('polytechnicCourses', value)}
                >
                  <Stack spacing={2}>
                    <Checkbox value="Diploma in Engineering">Diploma in Engineering</Checkbox>
                    <Checkbox value="Diploma in Pharmacy">Diploma in Pharmacy</Checkbox>
                    <Checkbox value="Polytechnic in Mechanical Engineering">Polytechnic in Mechanical Engineering</Checkbox>
                    <Checkbox value="Polytechnic in Civil Engineering">Polytechnic in Civil Engineering</Checkbox>
                    <Checkbox value="ITI in Electrical">ITI in Electrical</Checkbox>
                    <Checkbox value="ITI in Fitter">ITI in Fitter</Checkbox>
                    <Checkbox value="ITI in Welding">ITI in Welding</Checkbox>
                    <Checkbox value="ITI in Electronics">ITI in Electronics</Checkbox>
                    <Checkbox value="No Courses Offered">No Courses Offered</Checkbox>
                  </Stack>
                </CheckboxGroup>
                <Text color="red.500" fontSize="sm">{formik.errors.polytechnicCourses}</Text>
              </FormControl>


            {/* UG Courses Multi-Select */}
            <FormControl isInvalid={formik.touched.ugCourses && formik.errors.ugCourses}>
              <FormLabel fontWeight="bold">UG Courses Offered (Select all that apply)</FormLabel>
              <CheckboxGroup
                value={formik.values.ugCourses}
                onChange={(value) => formik.setFieldValue('ugCourses', value)}
              >
                <Stack spacing={2}>
                  <Checkbox value="B.Tech">B.Tech</Checkbox>
                  <Checkbox value="BBA">BBA</Checkbox>
                  <Checkbox value="BSc">BSc</Checkbox>
                  <Checkbox value="BCA">BCA</Checkbox>
                  <Checkbox value="BE">BE</Checkbox>
                  <Checkbox value="BA">BA</Checkbox>
                  <Checkbox value="BBM">BBM</Checkbox>
                  <Checkbox value="PUC Science Combinations">PUC Science Combinations</Checkbox>
                  <Checkbox value="PUC Humanities Combinations">PUC Humanities Combinations</Checkbox>
                  <Checkbox value="PUC Commerce combinations">PUC Commerce combinations</Checkbox>
                  <Checkbox value="B.Pharma">B.Pharma</Checkbox>
                  <Checkbox value="D.Pharma">D.Pharma</Checkbox>
                  <Checkbox value="No Courses Offered">No Courses Offered</Checkbox>
                </Stack>
              </CheckboxGroup>
              <Text color="red.500" fontSize="sm">{formik.errors.ugCourses}</Text>
            </FormControl>

            {/* PG Courses Multi-Select */}
            <FormControl isInvalid={formik.touched.pgCourses && formik.errors.pgCourses}>
              <FormLabel fontWeight="bold">PG Courses Offered (Select all that apply)</FormLabel>
              <CheckboxGroup
                value={formik.values.pgCourses}
                onChange={(value) => formik.setFieldValue('pgCourses', value)}
              >
                <Stack spacing={2}>
                  <Checkbox value="M.Tech">M.Tech</Checkbox>
                  <Checkbox value="MBA">MBA</Checkbox>
                  <Checkbox value="MA">MA</Checkbox>
                  <Checkbox value="MCA">MCA</Checkbox>
                  <Checkbox value="ME">ME</Checkbox>
                  <Checkbox value="MSc">MSc</Checkbox>
                  <Checkbox value="MCom">MCom</Checkbox>
                  <Checkbox value="M.Pharma">M.Pharma</Checkbox>
                  <Checkbox value="No Courses Offered">No Courses Offered</Checkbox>
                </Stack>
              </CheckboxGroup>
              <Text color="red.500" fontSize="sm">{formik.errors.pgCourses}</Text>
            </FormControl>

            {/* College/Institution Name */}
            <FormControl isInvalid={formik.touched.collegeName && formik.errors.collegeName}>
              <FormLabel fontWeight="bold">College/Institution Name</FormLabel>
              <Input
                name="collegeName"
                value={formik.values.collegeName}
                onChange={formik.handleChange}
                placeholder="Enter name"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.collegeName}</Text>
            </FormControl>

            {/* Location */}
            <FormControl isInvalid={formik.touched.location && formik.errors.location}>
              <FormLabel fontWeight="bold">Location</FormLabel>
              <Input
                name="location"
                value={formik.values.location}
                onChange={formik.handleChange}
                placeholder="Enter location"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.location}</Text>
            </FormControl>

            {/* Students Strength UG */}
            <FormControl isInvalid={formik.touched.studentsStrengthUG && formik.errors.studentsStrengthUG}>
              <FormLabel fontWeight="bold">Students Strength (UG)</FormLabel>
              <Input
                type="number"
                name="studentsStrengthUG"
                value={formik.values.studentsStrengthUG}
                onChange={formik.handleChange}
                placeholder="Enter number of UG students"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.studentsStrengthUG}</Text>
            </FormControl>

            {/* Students Strength PG */}
            <FormControl isInvalid={formik.touched.studentsStrengthPG && formik.errors.studentsStrengthPG}>
              <FormLabel fontWeight="bold">Students Strength (PG)</FormLabel>
              <Input
                type="number"
                name="studentsStrengthPG"
                value={formik.values.studentsStrengthPG}
                onChange={formik.handleChange}
                placeholder="Enter number of PG students"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.studentsStrengthPG}</Text>
            </FormControl>

            {/* College Email */}
            <FormControl isInvalid={formik.touched.collegeEmail && formik.errors.collegeEmail}>
              <FormLabel fontWeight="bold">College TPO/SPOC Email Address</FormLabel>
              <Input
                type="email"
                name="collegeEmail"
                value={formik.values.collegeEmail}
                onChange={formik.handleChange}
                placeholder="Enter email"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.collegeEmail}</Text>
            </FormControl>

            {/* Mobile Number */}
            <FormControl isInvalid={formik.touched.mobileNumber && formik.errors.mobileNumber}>
              <FormLabel fontWeight="bold">Mobile Number</FormLabel>
              <Input
                type="tel"
                name="mobileNumber"
                value={formik.values.mobileNumber}
                onChange={formik.handleChange}
                placeholder="Enter mobile number"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.mobileNumber}</Text>
            </FormControl>

            {/* Placement Season Duration */}
            <FormControl isInvalid={formik.touched.placementSeason && formik.errors.placementSeason}>
              <FormLabel fontWeight="bold">Placement Season Duration (Month and Year)</FormLabel>
              <Input
                name="placementSeason"
                value={formik.values.placementSeason}
                onChange={formik.handleChange}
                placeholder="E.g: Feb 2024"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.placementSeason}</Text>
            </FormControl>

            {/* Upcoming Student Engagements */}
            <FormControl isInvalid={formik.touched.upcomingEvents && formik.errors.upcomingEvents}>
              <FormLabel fontWeight="bold">Upcoming Student Engagements</FormLabel>
              <Textarea
                name="upcomingEvents"
                value={formik.values.upcomingEvents} 
                onChange={formik.handleChange}
                placeholder="E.g: Job Fairs, Recruiter Sessions, Networking Events etc"
              />
              <Text color="red.500" fontSize="sm">{formik.errors.upcomingEvents}</Text>
            </FormControl>

           {/* Partnership Interests */}
          <FormControl isInvalid={formik.touched.partnershipInterests && formik.errors.partnershipInterests}>
            <FormLabel fontWeight="bold">Partnership Interests (Select all that apply)</FormLabel>
            <CheckboxGroup
              name="partnershipInterests"
              value={formik.values.partnershipInterests}
              onChange={(value) => formik.setFieldValue('partnershipInterests', value)}
            >
              <Stack spacing={2}>
                <Checkbox value="Campus Placement">Campus Placement</Checkbox>
                <Checkbox value="Seminar">Seminar</Checkbox>
                <Checkbox value="Campus Branding">Campus Branding</Checkbox>
                <Checkbox value="Job Fairs">Job Fairs</Checkbox>
                <Checkbox value="Training Program">Training Program</Checkbox>
                
              </Stack>
            </CheckboxGroup>
            <Text color="red.500" fontSize="sm">{formik.errors.polytechnicCourses}</Text>
          </FormControl>

            {/* Consent Notice */}
            <Text mt={4} fontSize="sm" color="gray.600">
              Note: By applying here you provide consent to share your personal data with TalentConnect. The personal data would be processed for employment purposes and would be within TalentConnect data protection notice. Read our Privacy Statement and Website Terms and Conditions for more information.
            </Text>

            {/* Submit Button */}
            <Button mt={6} type="submit" colorScheme="blue" size="lg" width="full" _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}>
              Submit
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default CollegeForm;
