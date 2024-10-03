import { Box, Button, Flex, Heading, Image, Text, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import backgroundImg from '../../assets/images/campustocubicle/com.png'; // Import background image

// Motion component for animation
const MotionBox = motion(Box);

function OnlineLearningPage() {
    return (
        <Flex
            justifyContent="center"
            alignItems="center"
            minH="100vh"
            bgImage={`url(${backgroundImg})`}  // Set the background image
            bgPos="center"
            bgSize="cover"  // Ensure the background image covers the full section
            bgRepeat="no-repeat"  // Prevent repetition of the background image
            px={{ base: 4, md: 12 }} // Padding for small and large screens
            py={8}
            fontFamily="Arial, sans-serif"
            overflow="hidden"
            flexDirection={useBreakpointValue({ base: 'column', md: 'column', lg: 'row-reverse' })}  // Reverse row to place content on right, image on left
        >
            {/* Right Section with Content */}
            <MotionBox
                p={{ base: 4, md: 4, lg: 8 }}
                width={useBreakpointValue({ base: '100%', md: '100%', lg: '50%' })}
                initial={{ opacity: 0, x: 100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                textAlign={{ base: 'center', md: 'left' }}
                mb={{ base: 8, md: 0 }}  // Margin bottom for mobile
            >
                <Heading as="h2" fontSize={useBreakpointValue({ base: '3xl', md: '3xl', lg: '3xl', xl: '4xl' })} mb={4} color="blue.200">
                    <Text as="span" color="yellow.300" fontSize={{ base: '2xl', md: '3xl', lg: '3xl', xl: '4xl' }}>
                        For Companies:
                    </Text> Why Partner with TalentConnect?
                </Heading>
                <Text fontSize={{ base: 'sm', md: 'md', lg: 'md', xl: 'lg' }} mb={6} color="black">
                    At TalentConnect, we're revolutionizing the way companies discover fresh talent. We have partnerships with various colleges and universities. Our platform is a gateway to a vibrant community of skilled graduates, each equipped with passion and proficiency. Whether you seek innovative thinkers or creative visionaries, TalentConnect offers a diverse pool of candidates poised to make an impact.
                </Text>
                <Link to="/company-form">
                    <Button
                        bg="yellow.300"
                        color="white"
                        _hover={{ bg: 'blue.400', transform: 'translateY(-2px)', boxShadow: 'lg' }}
                        borderRadius="full"
                        px={6}
                        py={4}
                        shadow="md"
                        transition="all 0.3s ease"
                    >
                        Discover Fresh Talent
                    </Button>
                </Link>
            </MotionBox>

            {/* Left Section with Image */}
            <MotionBox
                width={{ base: '100%', md: '100%', lg: '50%' }}
                initial={{ opacity: 0, x: -100 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.7 }}
                display="flex"
                justifyContent="center"
                alignItems="center"
                overflow="hidden"
                p={10}
            >
                <Image
                    src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8ODJ8fENvbXBhbnklMjBidWlsZGluZ3xlbnwwfHwwfHx8MA%3D%3D"
                    alt="Company building"
                    objectFit="cover"
                    w="100%"
                    h={{ base: '250px', md: '260px',lg: 'auto' }}
                    maxH={{ base: '300px', md: '400px', lg: '600px' }}  // Adjust max height for mobile
                    borderRadius={20}
                />
            </MotionBox>
        </Flex>
    );
}

export default OnlineLearningPage;
