// import { Box, Button, Flex, Heading, Image, Text } from '@chakra-ui/react';

//     <Flex
//       justifyContent="center"
//       alignItems="center"
//       h="100vh"
//       bg="white"
//       fontFamily="Arial, sans-serif"
//       px={6} // Add padding for mobile
//       marginY={[40,20,-8]}
//     >
//       <Flex
//         direction={['column', 'column', 'row']} // Stack on mobile, row on larger screens
//         width="100%"
//         maxW="1200px"
//         justifyContent="space-between"
//         alignItems="center"
//         gap={[-20, 10, 40]} // Adjust gap for mobile
//       >
//         {/* Left Section */}
//         <Box 
//           mt={[10, 10, 48]} // Adjust margin for mobile
//           width={['100%', '100%', '50%']} // Full width on mobile, half on larger screens
//         >
//           <Heading as="h2" size="lg" color="blue.400" fontSize={["28px", "32px", "40px"]}>
//             Why Join Our Counseling?
//           </Heading>
//           <Heading as="h3" size="md" mt={5} color="blue.200">
//             We at TalentConnect
//           </Heading>
//           <Text fontSize={["16px", "16px", "18px"]} lineHeight="1.5" mt={5}>
//             Embark on a journey of self-discovery and career advancement with our personalized counseling services. Our expert counselors provide tailored guidance to help you navigate your career path with confidence and clarity. By joining our counseling sessions, you gain access to professional advice that is specifically designed to address your unique needs and aspirations.
//           </Text>
//           <Button
//             as="a"
//             href="#"
//             mt={10}
//             px={6}
//             py={3}
//             bg="blue.300"
//             color="white"
//             borderRadius="full"
//             fontSize="16px"
//             textDecoration="none"
//             _hover={{ bg: 'blue.500' }}
//             width={["100%", "auto"]} // Full-width button on mobile
//             textAlign="center"
//           >
//             LEARN MORE
//           </Button>
//         </Box>

//         {/* Right Section */}
//         <Box 
//           width={['100%', '100%', '50%']} // Full width on mobile, half on larger screens
//           textAlign={['center', 'center', 'right']} // Center on mobile
//           mt={["-100px", "20px", "0"]} // Adjust margin for mobile
//         >
//           <Image
//             src="https://img.freepik.com/free-vector/study-abroad-concept-illustration_114360-7493.jpg?t=st=1725531667~exp=1725535267~hmac=7877dbe9f5b934d55f97ff13fddba4e65e1da9ae27979dd15c0f15dee1c9a874&w=740"
//             alt="Illustration of a person walking towards flags representing goals"
//             maxW={['100%', '80%']}
//             mt={40}
//           />
//           <Box mt={5} 
//             display="flex"
//             flexDirection={['column', 'row']} // Stack stats on mobile, row on larger screens
//             gap={10} // Adjust gap for stats
//             justifyContent={['center', 'space-around']} // Center on mobile, spaced on larger screens
//           >
//             {/* Stats */}
//             <Box mb={5}>
//               <Heading as="h1" size="2xl" color="blue.300" m={0}>
//                 200+
//               </Heading>
//               <Heading as="h3" size="md" mt={1}>
//                 Students Placed
//               </Heading>
//               <Text fontSize="14px" color="gray.600">
//                 And Counting.
//               </Text>
//             </Box>
//             <Box>
//               <Heading as="h1" size="2xl" color="blue.300" m={0}>
//                 300+
//               </Heading>
//               <Heading as="h3" size="md" mt={1}>
//                 Students Mentored
//               </Heading>
//               <Text fontSize="14px" color="gray.600">
//                 And Counting
//               </Text>
//             </Box>
//           </Box>
//         </Box>
//       </Flex>
//     </Flex>
//   );
// }



import React from "react";
import {
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Heading,
  Container,
  Image
} from "@chakra-ui/react";

function ProgramDetails() {
  return (
    <Flex
      // mt={{ base: 10 }} // Responsive margin-top
      w="full"
      h={useBreakpointValue({ base: "66vh", md: "60vh", lg: "80vh", xl:"80vh", "2xl": "60vh", "3xl": "55vh" })}
      backgroundImage={
        'url(https://images.unsplash.com/photo-1653566031587-74f7d86a2e71?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEyfHxKb2IlMjBjb3Vuc2VsaW5nfGVufDB8fDB8fHww)'
      }
      backgroundSize="cover"
      backgroundPosition="center center"
      backgroundAttachment="fixed"
      zIndex={1}
      position="relative"
      alignItems="center" // Center content vertically
      justifyContent="center" // Center content horizontally
    >
      <VStack
        w="full"
        h="full" // Matches the height of the image
        justify="center"
        alignItems="flex-start" // Aligns content to the left
        px={useBreakpointValue({ base: 4, md: 0, lg: 0, xl: "0", "2xl": "0", "3xl": "0" })}
        bgGradient="linear(to-r, blackAlpha.600, transparent)" // Gradient from left to transparent
      >

        <Box
          bg="#D7D7F9"
          p={useBreakpointValue({base:2, xl: 6})}
          borderRadius="md"
          textAlign="left"
          color="black"
          w={useBreakpointValue({ base: "full", md: "70%", lg: "60%", xl: "35%", "2xl": "50%", "3xl": "40%"  })} // Width for the text box
          h="100%" // Ensures the height matches the image
        >
          <Flex justifyContent="center" alignItems="center">
            <Heading
              fontFamily="ClashDisplay"
              fontSize={useBreakpointValue({ base: "2xl", md: "xl", lg: "4xl", xl: "4xl", "2xl": "5xl", "3xl": "6xl" })}// Responsive font size
              fontWeight="bold"
              p="2"
            >
              <Text as="span" color="black">
                Why Join Our Counseling?
              </Text>
            </Heading>
          </Flex>
          <Text
            mt={0}
            fontSize={useBreakpointValue({ base: "xs", md: "xs", lg: "md", xl: "lg", "2xl": "2xl", "3xl": "4xl" })}
            fontWeight="400"
            color="black"
          //lineHeight="1.6"
          >
            <br />
            <Text as="span" color="blue.400" fontSize={20} fontWeight={600}>
              {' '}   We at TalentConnect
            </Text>
            <br />
            Embark on a journey of self-discovery and career advancement with our personalized counseling services. Our expert counselors provide tailored guidance to help you navigate your career path with confidence and clarity. By joining our counseling sessions, you gain access to professional advice that is specifically designed to address your unique needs and aspirations.
          </Text>
        </Box>

      </VStack>
    </Flex>
  );
}
export default ProgramDetails;