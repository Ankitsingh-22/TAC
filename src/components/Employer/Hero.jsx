import React, { useState } from 'react';
import { Stack, Flex, Button, Text, VStack, useBreakpointValue } from '@chakra-ui/react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

function Section1() {
  const [isHovered, setIsHovered] = useState(false); // State to handle hover

  return (
    <Flex w={'full'} h={'100vh'} position="relative">
      {/* Blurred background image */}
      <Flex
        w={'full'}
        h={'full'}
        backgroundImage={
          'url(https://images.unsplash.com/photo-1560439513-74b037a25d84?q=80&w=1470&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)'
        }
        backgroundSize={'cover'}
        backgroundPosition={'center center'}
        position="absolute"
        top={0}
        left={0}
        filter={isHovered ? 'blur(0px)' : 'blur(4px)'} // Only background blurs
        transition="filter 0.4s ease" // Smooth transition for the blur effect
      />

      {/* Gradient overlay */}
      <Flex
        position="absolute"
        top={0}
        left={0}
        w={'full'}
        h={'full'}
        bgGradient="linear(to-b, rgba(0,0,0,0.3), rgba(0,0,0,0.3), rgba(0,0,0,0.3))"
      />

      {/* Foreground content */}
      <VStack
        w={'full'}
        h={'full'}
        justify={'center'}
        align={'center'}
        zIndex={1} // Ensures the content is above the background
        px={useBreakpointValue({ base: 4, md: 8 })}
        spacing={6}
        textAlign="center"
      >
        {/* Animate the heading */}
        <motion.div
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <Text
            color={'white'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '3xl', lg: "3xl", xl: '6xl', "2xl": "7xl" })}
            textShadow="2px 2px 6px rgba(0,0,0,0.7)"
          >
            Make your next hire with
          </Text>
        </motion.div>

        {/* Animate the sub-heading */}
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <Text
            color={'blue.400'}
            fontWeight={700}
            lineHeight={1.2}
            fontSize={useBreakpointValue({ base: '3xl', md: '3xl', lg: "3xl", xl: '5xl', "2xl": "6xl" })}
            textShadow="2px 2px 6px rgba(0,0,0,0.7)"
          >
            Talent Connect
          </Text>
        </motion.div>

        {/* Animate the description text */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          <Text
            color={'white'}
            fontWeight={400}
            lineHeight={1.5}
            fontSize={useBreakpointValue({ base: 'lg', md: 'xl', lg: '2xl' })}
            maxW="3xl"
          >
            We can help you expand your reach and get your jobs in front of the right candidates.
          </Text>
        </motion.div>

        {/* Call to Action Button */}
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          onHoverStart={() => setIsHovered(true)} // Set isHovered to true on hover
          onHoverEnd={() => setIsHovered(false)}  // Set isHovered to false when hover ends
        >
          <Link to="/company-form">
          <Button
                position="relative"
                bg={'blue.400'}
                rounded={'full'}
                color={'white'}
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                _after={{
                    content: '""',
                    position: 'absolute',
                    top: '-10px',
                    left: '-10px',
                    width: 'calc(100% + 20px)',
                    height: 'calc(100% + 20px)',
                    borderRadius: 'full',
                    border: '2px solid rgba(255, 255, 255, 0.5)',
                    opacity: 0,
                    transition: 'opacity 0.3s ease, transform 0.3s ease',
                    boxShadow: '0 0 15px rgba(255, 255, 255, 0.8)',
                    animation: isHovered ? 'glow 1.5s infinite alternate' : 'none',
                }}
                _focus={{ boxShadow: 'none' }}
                >
            Employer Enrollment
          </Button>
        </Link>
      </motion.div>
    </VStack>
    <style>
        {`
          @keyframes glow {
            0% {
              transform: scale(1);
              opacity: 0.6;
            }
            100% {
              transform: scale(1.1);
              opacity: 1;
            }
          }
        `}
      </style>
    </Flex >
  );
}

export default Section1;
