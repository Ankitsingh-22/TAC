import { Box, Heading, Text, Button, VStack, HStack, useBreakpointValue } from '@chakra-ui/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import hVideo from "../../assets/videos/Camnew.mp4"; // Local video

const MotionBox = motion(Box);
const MotionHeading = motion(Heading);
const MotionText = motion(Text);

const HeroPage = () => {
    const paddingX = useBreakpointValue({ base: 4, md: 8, lg: 16, xl: 24, "2xl": 32 });
    const buttonSize = useBreakpointValue({ base: 'md', md: 'lg', lg: 'lg', xl: 'lg' });
    
    return (
        <Box
            position="relative"
            overflow="hidden"
            height={{ base: "520px", md: "2xl", lg: "3xl", xl:'90vh' }} 
            minHeight="300px"  // Ensure minimum height is set
            py={{ base: 32, md: 20, lg: 28 }}  // Adjusted vertical padding
            px={paddingX}  // Adjusted horizontal padding based on screen size
            color="white"
        >
            {/* Background Video */}
            <MotionBox
                position="absolute"
                top={0}
                left={0}
                width="100%"
                height="100%"
                zIndex={-1}  // Ensure video is behind the content
                opacity={1}
                transition="opacity 1s ease-in-out"  // Smooth fade-in effect
            >
                <video
                    src={hVideo}
                    muted
                    loop
                    autoPlay
                    style={{
                        width: '100%',
                        height: '100%',
                        objectFit: 'cover',
                        objectPosition: 'center',  // Keeps video focus on the center
                        transition: 'opacity 2s ease-in-out',  // Smooth transition
                    }}
                />
            </MotionBox>

            <VStack spacing={{ base: 6, md: 6, lg: 8 }} textAlign="center" zIndex={1}>
                {/* Hero Text with Animation */}
                <MotionHeading
                    as="h1"
                    size={useBreakpointValue({ base: "2xl", md: "2xl", lg: "3xl" })}  // Adjusted heading size
                    lineHeight={{ base: "short", lg: "shorter" }}
                    bgGradient="linear(to-r, yellow.200, yellow.500)"
                    bgClip="text"
                    fontWeight="bold"
                    letterSpacing="wide"
                    initial={{ opacity: 0, y: -50 }}  // Start from invisible and up
                    animate={{ opacity: 1, y: 0 }}  // End with visible and original position
                    transition={{ duration: 1 }}  // Animation duration
                >
                    CampusToCubicle:
                    <Text color="blue.200">Partnering for Future Success</Text>
                </MotionHeading>

                <MotionText
                    fontSize={{ base: "md", md: "lg", lg: "xl", xl: "2xl" }}  // Responsive text sizes
                    maxW="800px"
                    color="gray.100"
                    initial={{ opacity: 0, y: 20 }}  // Start from invisible and down
                    animate={{ opacity: 1, y: 0 }}  // End with visible and original position
                    transition={{ duration: 1, delay: 0.5 }}  // Animation duration and delay
                >
                    TalentConnect bridges the campus-to-cubicle gap by aligning company needs with college engagement for efficient recruitment and tailored training for new hires.
                </MotionText>

                {/* Call to Action Buttons */}
                <HStack
                    spacing={{ base: 4, md: 8 }}
                    flexDirection={{ base: 'column', md: 'row' }}  // Stack buttons vertically on mobile
                    justifyContent={{ base: 'center', md: 'flex-start' }}  // Center-align on mobile
                >
                  <Link to="/contact">
                        <Button
                            colorScheme="transparent"
                            border="2px solid"
                            borderColor={"yellow.300"}
                            _hover={{ backgroundColor: "yellow.300", color: 'black' }}
                            size={buttonSize}  // Responsive button sizes
                            rightIcon={<FaArrowRight />}
                            as={motion.button}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            Get Started
                        </Button>
                    </Link>
                </HStack>
            </VStack>
        </Box>
    );
};

export default HeroPage;
