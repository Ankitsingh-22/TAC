import React from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import {
  Container,
  Flex,
  Box,
  Heading,
  Text,
  IconButton,
  Button,
  VStack,
  HStack,
  Wrap,
  WrapItem,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputLeftElement,
  Textarea,
  Select,
  useToast,
  useTheme,
  useBreakpointValue
} from '@chakra-ui/react';
import { MdPhone, MdEmail, MdLocationOn, MdOutlineEmail } from 'react-icons/md';
import { BsPerson, BsInstagram, BsLinkedin, BsTwitter, BsYoutube } from 'react-icons/bs';

// Validation schema
const validationSchema = Yup.object({
  userType: Yup.string().required('User Type is required'),
  name: Yup.string().required('Name is required'),
  email: Yup.string().email('Invalid email address').required('Email is required'),
  message: Yup.string().required('Message is required'),
});

export default function ContactForm() {
  const theme = useTheme();
  const toast = useToast();

  const formik = useFormik({
    initialValues: {
      userType: '',
      name: '',
      email: '',
      message: '',
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      try {
        //const response = await axios.post('http://3.7.169.233:5000/api/contact/contact', values);

        const response = await axios.post('http://3.7.169.233:5000/api/contact/contact', values);
        toast({
          title: 'Message sent.',
          description: response.data.message,
          status: 'success',
          duration: 5000,
          isClosable: true,
        });
        formik.resetForm();
      } catch (error) {
        toast({
          title: 'An error occurred.',
          description: error.response?.data.message || 'Unable to send message.',
          status: 'error',
          duration: 5000,
          isClosable: true,
        });
      }
    }
  });

  return (
    <Container bg="#F7FAFC" maxW="full" mt={0} pt={{ base: 20, md: 15, lg: 10}} centerContent overflow="hidden">
      <Flex>
        <Box
          bg="gray.600"
          color="white"
          borderRadius="lg"
          m={{ sm: 4, md: 16, lg: 10 }}
          p={{ sm: 5, md: 5, lg: 16 }}
        >
          <Box p={4}>
            <Wrap spacing={{ base: 20, sm: 3, md: 5, lg: 20 }}>
              <WrapItem>
                <Box>
                  <Heading>Contact Us</Heading>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Have questions or need assistance?
                  </Text>
                  <Text mt={{ sm: 3, md: 3, lg: 5 }} color="gray.500">
                    Contact TalentConnect today.
                  </Text>
                  <Box py={{ base: 5, sm: 5, md: 8, lg: 10 }}>
                    <VStack spacing={4} alignItems="flex-start">
                      <HStack>
                        <Button
                          size="md"
                          height="48px"
                          width="300px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #D5006D" }}
                          leftIcon={<MdPhone color="#D5006D" size="20px" />}
                        >
                          +91-9888678899
                        </Button>
                      </HStack>
                      <HStack>
                        <Button
                          size="md"
                          height="48px"
                          width="300px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #D5006D" }}
                          leftIcon={<MdEmail color="#D5006D" size="20px" />}
                        >
                          talentconnect@gmail.com
                        </Button>
                      </HStack>
                      <HStack>
                        <Button
                          size="md"
                          height="48px"
                          width="300px"
                          variant="ghost"
                          color="#DCE2FF"
                          _hover={{ border: "2px solid #D5006D" }}
                          leftIcon={<MdLocationOn color="#D5006D" size="20px" />}
                        >
                          Bengaluru, Karnataka, India
                        </Button>
                      </HStack>
                    </VStack>
                  </Box>
                  <HStack
                    mt={{ lg: 10, md: 10 }}
                    spacing={5}
                    px={5}
                    alignItems="flex-start"
                  >
                    <IconButton
                      aria-label="Instagram"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#D5006D" }}
                      icon={<BsInstagram size="28px" />}
                    />
                    <IconButton
                      aria-label="LinkedIn"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#D5006D" }}
                      icon={<BsLinkedin size="28px" />}
                    />
                    <IconButton
                      aria-label="Twitter"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#D5006D" }}
                      icon={<BsTwitter size="28px" />}
                    />
                    <IconButton
                      aria-label="YouTube"
                      variant="ghost"
                      size="lg"
                      isRound={true}
                      _hover={{ bg: "#D5006D" }}
                      icon={<BsYoutube size="28px" />}
                    />
                  </HStack>
                </Box>
              </WrapItem>
              <WrapItem>
                <Box bg="white" borderRadius="lg">
                  <Box m={8} color="#0B0E3F">
                    <VStack spacing={5}>
                      <FormControl id="userType" isInvalid={formik.touched.userType && formik.errors.userType}>
                        <FormLabel>Are you a student, campus, or company?</FormLabel>
                        <Select
                          name="userType"
                          placeholder="Select option"
                          value={formik.values.userType}
                          onChange={formik.handleChange}
                        >
                          <option value="student">Student</option>
                          <option value="campus">Campus</option>
                          <option value="company">Company</option>
                        </Select>
                        <Text color="red.500" fontSize="sm">{formik.errors.userType}</Text>
                      </FormControl>
                      <FormControl id="name" isInvalid={formik.touched.name && formik.errors.name}>
                        <FormLabel>Your Name</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <BsPerson color="gray.800" />
                          </InputLeftElement>
                          <Input
                            name="name"
                            type="text"
                            size="md"
                            value={formik.values.name}
                            onChange={formik.handleChange}
                          />
                        </InputGroup>
                        <Text color="red.500" fontSize="sm">{formik.errors.name}</Text>
                      </FormControl>
                      <FormControl id="email" isInvalid={formik.touched.email && formik.errors.email}>
                        <FormLabel>Email</FormLabel>
                        <InputGroup borderColor="#E0E1E7">
                          <InputLeftElement pointerEvents="none">
                            <MdOutlineEmail color="gray.800" />
                          </InputLeftElement>
                          <Input
                            name="email"
                            type="email"
                            size="md"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                          />
                        </InputGroup>
                        <Text color="red.500" fontSize="sm">{formik.errors.email}</Text>
                      </FormControl>
                      <FormControl id="message" isInvalid={formik.touched.message && formik.errors.message}>
                        <FormLabel>Message</FormLabel>
                        <Textarea
                          name="message"
                          borderColor="gray.300"
                          placeholder="Your message"
                          value={formik.values.message}
                          onChange={formik.handleChange}
                        />
                        <Text color="red.500" fontSize="sm">{formik.errors.message}</Text>
                      </FormControl>
                      <FormControl id="submit" float="right">
                        <Button
                          type="submit"
                          variant="solid"
                          bg="#D5006D"
                          color="white"
                          _hover={{
                              bgGradient: 'linear(to-r, #0ea5e9, #2563eb)',
                              transform: 'scale(1.05)',
                              textDecoration: 'none', // Ensure no underline on hover
                              color:"white"
                            }}
                          onClick={formik.handleSubmit}
                        >
                          Send Message
                        </Button>
                      </FormControl>
                    </VStack>
                  </Box>
                </Box>
              </WrapItem>
            </Wrap>
          </Box>
        </Box>
      </Flex>
    </Container>
  );
}
