import {
  Box,
  chakra,
  Container,
  Stack,
  Text,
  SimpleGrid,
  useColorModeValue,
  useBreakpointValue
} from "@chakra-ui/react";
import { FaInstagram, FaTwitter, FaYoutube } from "react-icons/fa";
import { BsLinkedin } from "react-icons/bs"; // Import LinkedIn icon
import { HashLink as Link } from "react-router-hash-link"; // Import HashLink
import logo from "../assets/images/Logo/logo.png"; // Adjust the path if needed

const SocialButton = ({ children, label, href }) => {
  return (
    <chakra.button
      bg="transparent"
      borderRadius="md"
      _hover={{
        bg: useColorModeValue("pink.300", "pink.700"),
      }}
      as="a"
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={label}
    >
      {children}
    </chakra.button>
  );
};

export default function Footer() {
  return (
    <Box
      bg={useColorModeValue("gray.50", "gray.800")}
      color={useColorModeValue("gray.700", "gray.200")}
      py={10}
      mt={0}
    >
      <Container maxW={useBreakpointValue({ base: "100%", lg: "1200px", xl: "1440px", "2xl": "2560px" })}>
        <SimpleGrid
          columns={{ base: 1, sm: 2, lg: 4 }}
          spacing={10}
          textAlign="left"
        >
          <Stack spacing={4} fontSize={useBreakpointValue({base:"sm", "3xl":"4xl"})}>
            <a href="/">
              <img
                src={logo}
                alt="Talent Connect Logo"
                style={useBreakpointValue({
                      base: { height: "40px", width: "50px" }, // For mobile and smaller screens
                      xl: { height: "50px", width: "60px" },
                      "3xl": { height: "100px", width: "110px" }, // For large screens (>= 62em)
                    })}

              />
            </a>
            <Text  color="black">
              © 2023 Talent Connect. All rights reserved
            </Text>
            <Text fontWeight="bold">Follow Us</Text>
            <Stack direction="row" spacing={4}>
              <SocialButton label="Follow us on Instagram" href="#">
                <FaInstagram />
              </SocialButton>
              <SocialButton label="Follow us on LinkedIn" href="#">
                <BsLinkedin />
              </SocialButton>
              <SocialButton label="Follow us on Twitter" href="#">
                <FaTwitter />
              </SocialButton>
              <SocialButton label="Subscribe to us on YouTube" href="#">
                <FaYoutube />
              </SocialButton>
            </Stack>
          </Stack>
          <Stack spacing={4} fontSize={useBreakpointValue({base:"sm", "3xl":"4xl"})}>
            <Text fontWeight="bold" as="a" href="/">
              Home
            </Text>
            <Text fontWeight="bold" as={Link} to="/#our-services">
              Services
            </Text>
            <Stack spacing={1}>
              <Text as={Link} to="/oncampus">
                OnCampus
              </Text>
              <Text as={Link} to="/offcampus">
                OffCampus
              </Text>
              <Text as={Link} to="/seminar">
                Seminar
              </Text>
              <Text as={Link} to="/counselling">
                Counselling
              </Text>
              <Text as={Link} to="/careercraft">
                CareerCraft
              </Text>
              <Text as={Link} to="/workforce">
                Workforce Provider [Staffing Solution]
              </Text>
            </Stack>
          </Stack>
          <Stack spacing={4} fontSize={useBreakpointValue({base:"sm", "3xl":"4xl"})}>
            <Text fontWeight="bold" as={Link} to="/#ready-to-transform">
              Jobs
            </Text>
            <Stack spacing={1}>
              <Text as={Link} to="/jobs/current-opening">
                Current Openings
              </Text>
              <Text as={Link} to="/jobs/post-resume">
                Post Your Resume
              </Text>
            </Stack>
            <Stack spacing={4}>
              <Text fontWeight="bold" as={Link} to="/employer">
                Employer
              </Text>
              
            </Stack>
          </Stack>
          <Stack spacing={4} fontSize={useBreakpointValue({base:"sm", "3xl":"4xl"})}>
            <Text fontWeight="bold" as={Link} to="/college">
                College
              </Text>
            <Text fontWeight="bold" as={Link} to="/campus-to-cubicle">
              Campus to Cubicle
            </Text>
            <Stack spacing={4}>
              
              <Text fontWeight="bold" as={Link} to="/contact">
                Contact Us
              </Text>
               
            </Stack>
          </Stack>
        </SimpleGrid>
      </Container>
    </Box>
  );
}
