import {
  Box,
  Button,
  Container,
  Heading,
  Stack,
  Text,
  Flex,
  useColorModeValue,
  useBreakpointValue,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";

export default function ReadyToTransform() {
  // Responsive values
  const headingFontSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "5xl", "2xl": "6xl", "3xl": "8xl" });
  const textFontSize = useBreakpointValue({ base: "sm", sm: "md", md: "md", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "5xl"  });
  const buttonSizes = useBreakpointValue({ base: "sm", sm: "md", md: "sm", lg: "md", xl: "md", "2xl": "xl", "3xl": "4xl" });
  const pY = useBreakpointValue({base: 10, sm: 10, md: 10, lg: 10, xl: 6, "2xl": 7, "3xl": "10"});
  const paddingX = useBreakpointValue({base: 3, sm: 4, md: 12, lg: 6, xl: 6, "2xl": 7, "3xl": "30"});
  const paddingY = useBreakpointValue({base: 2, sm: 4, md: 6, lg: 6, xl: 6, "2xl": 7, "3xl": "55"});

  return (
    <Box
      id="ready-to-transform"
      bg={"#BEE3F8"}
      p={pY}
      borderRadius="lg"
      boxShadow="lg"
      textAlign="center"
      
    >
      <Container maxW={{ base: "100%", lg: "1200px", xl: "1440px", "2xl": "2560px", "3xl":"100%" }}>
        <Flex justifyContent="center" alignItems="center" flexDirection={{base:"column", xl:"row"}}>
          <Heading
            as="h2"
            fontSize={headingFontSize}
            fontFamily={"ClashDisplay"}
            color={"black"} // Change to your desired color
            mb={{"3xl":4}}
           p={{base:"0","lg":"4", "3xl":"8"}}
          >
            Ready to Transform
          </Heading>
          <Heading
            as="h2"
            fontSize={headingFontSize}
            fontFamily={"ClashDisplay"}
            color={"blue.400"} // Change to your desired color
            mb={{base:"4"}}
          >
            Your Career?
          </Heading>
        </Flex>
        <Text fontSize={textFontSize} mb={6} >
          Join TalentConnect today and take the first step towards unlocking
          your full career potential. Let's make it happen!
        </Text>
        <Stack
          spacing={4}
          direction={{ base: "column", md: "row" }}
          justify="center"
        >
          <Button
            as={RouterLink}
            to="/jobs/post-resume"
            rounded={"full"}
            color={"teal"}
            bg={"white"}
            px={paddingX}
            py={paddingY}
            fontSize={buttonSizes}
            _hover={{ transform: "scale(1.05)", boxShadow: "lg", bg: "blue.300", color: "white" }}
          >
            Post Your Resume
          </Button>
          <Button
            as={RouterLink}
            to="/jobs/current-opening"
            rounded={"full"}
            color={"teal"}
            bg={"white"}
            px={paddingX}
            py={paddingY} 
            fontSize={buttonSizes}
            _hover={{ transform: "scale(1.05)", boxShadow: "lg", bg: "blue.300", color: "white" }}
          >
            Current Openings
          </Button>
        </Stack>
      </Container>
    </Box>
  );
}
