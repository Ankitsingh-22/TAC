import { Box, Button, Flex, Heading, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import backgroundImg from '../../assets/images/campustocubicle/col.png'; // Import background image
import collegeImg from '../../assets/images/campustocubicle/college.jpeg'; // Import right section image

// Motion component for animation
const MotionBox = motion(Box);

function OnlineLearningPage() {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            minH="100vh"  // Ensure the height is 100% of the viewport
            bgImage={`url(${backgroundImg})`}  // Use imported background image
            bgPos="center"  // Center the background
            bgSize="contain"  // Ensure the image is fully visible without cropping
            bgRepeat="no-repeat"  // Prevent repeating the background image
            fontFamily="Arial, sans-serif"
        >
            <Flex
                width="100%"
                maxW="100vw"
                direction={useBreakpointValue({ base: 'column', md: 'column', lg: 'row' })}
                height={useBreakpointValue({ base: 'auto', md: 'auto', lg: '600px', xl: '700px' })}
                justifyContent="space-between"
                alignItems="center"
                bg="transparent"
                borderRadius="md"
                overflow="hidden"
            >
                {/* Left Section with Content */}
                <MotionBox
                    width={useBreakpointValue({ base: '100%', md: '100%', lg: '50%' })}
                    initial={{ opacity: 0, x: -100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    p={{ base: 6, md: 10 }} // Adjusted padding for responsiveness
                >
                    <Heading
                        as="h2"
                        fontSize={{ base: 'xl', md: '3xl', lg: '30px', xl: '40px' }}
                        mb={4}
                        color="blue.200"
                    >
                        <Text color="yellow.300">For Colleges :</Text>
                        Why Collaborate with TalentConnect?
                    </Heading>
                    <Text fontSize={{ base: 'sm', md: 'md', lg: 'md', xl: 'lg' }} mb={4}>
                    In Talentconnect, we redefine the journey from academia to professional excellence. Our innovative approach connects bright young talents from colleges and universities with companies, creating synergies that shape future careers. We believe in fostering collaboration among talent, educational institutions, and organizations to cultivate a thriving workforce.
                    {/* At TalentConnect, we're revolutionizing the way companies discover fresh talent. We have partnerships with various colleges and universities. Our platform is a gateway to a vibrant community of skilled graduates, poised to make an impact in their desired fields. */}
                    </Text>
                    <Link to="/college-form">
                        <Button
                            mt={2} // Adjusted margin-top for mobile
                            bg="yellow.300"
                            color="white"
                            _hover={{ bg: 'blue.300' }}
                            borderRadius="full"
                            px={{ base: 3, md: 4 }} // Adjusted padding for mobile
                            py={2} // Adjusted padding for mobile
                        >
                            Empower your student
                        </Button>
                    </Link>
                </MotionBox>

                {/* Right Section with Image */}
                <MotionBox
                    width={{ base: '100%', md: '100%', lg: '50%' }}
                    initial={{ opacity: 0, x: 100 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5 }}
                    p={{ base: 6, md: 10 }} // Adjusted padding for responsiveness
                >
                    <Image
                        src={collegeImg}  // Use imported right section image
                        alt="College"
                        objectFit="cover"
                        borderRadius={20}
                    />
                </MotionBox>
            </Flex>
        </Flex>
    );
}

export default OnlineLearningPage;