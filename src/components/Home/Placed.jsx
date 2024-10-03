import React, { useState, useEffect } from 'react';
import { Box, Flex, Image, Text, useTheme, Heading, IconButton } from '@chakra-ui/react';
import { ArrowBackIcon, ArrowForwardIcon } from '@chakra-ui/icons';

const cardData = [
  {
    title: 'Ajit Gupta',
    image: 'https://www.gyanone.com/wp-content/webp-express/webp-images/uploads/2020/07/Abhigyan-Dubey-300x300.jpg.webp',
    description: 'Placed at Hitachi',
    qualification: 'B.Tech in Computer Science',
  },
  {
    title: 'Noor Fatima',
    image: 'https://www.indiancomputer.co.in/wp-content/uploads/2023/04/businessmen-hands-white-table-300x300.jpg',
    description: 'Placed at TCS',
    qualification: 'M.Sc in Information Technology',
  },
  {
    title: 'Rohit Raj',
    image: 'https://media.licdn.com/dms/image/C4D03AQHqO6VIq7GEyg/profile-displayphoto-shrink_400_400/0/1648231702101?e=2147483647&v=beta&t=diSU37DiHYNitQptD5ufUx-BDfHRAFY2v_2MlQtOwzs',
    description: 'Placed at Dell',
    qualification: 'MBA in Business Analytics',
  },
  {
    title: 'Aditi Sharma',
    image: 'https://nirrch.res.in/wp-content/uploads/2019/04/antara-banerjee-300x300.jpg',
    description: 'Placed at SBI',
    qualification: 'M.Com in Finance',
  },
];

const AutoSliding3DCardSlider = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % cardData.length);
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + cardData.length) % cardData.length);
  };

  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 4000); // Change slide every 4 seconds

    return () => clearInterval(interval); // Cleanup interval on component unmount
  }, []);

  return (
    <Flex direction="column" alignItems="center" mt={10} mb={10} position="relative">
      <Flex justifyContent="center" alignItems="center">
      <Heading mb={6} p={4} fontSize={['xl', '2xl', '4xl']} color={theme.colors.black }>
        Placed 
      </Heading>
      <Heading mb={6} fontSize={['xl', '2xl', '4xl']} color={theme.colors.blue[400] }>
        Students
      </Heading>
      </Flex>
      <Flex
        alignItems="center"
        justifyContent="center"
        position="relative"
        width="100%"
        maxW="1300px"
        p={4}
        borderRadius="lg"
        overflow="hidden"
        bgGradient="linear(to-r, blue.100, white)"
        boxShadow="2xl"
        _before={{
          content: '""',
          position: 'absolute',
          top: '-50%',
          left: '-50%',
          width: '200%',
          height: '200%',
          bg: 'radial-gradient(circle, rgba(255,255,255,0.15) 10%, transparent 70%)',
          zIndex: 0,
        }}
      >
        {/* Left Arrow Icon */}
        <IconButton
          icon={<ArrowBackIcon />}
          aria-label="Previous"
          position="absolute"
          left={['20px', '30px', '50px']}
          top="50%"
          transform="translateY(-50%)"
          onClick={handlePrev}
          colorScheme="blue"
          bg="blue.400"
          _hover={{ bg: "blue.500" }}
          borderRadius="full"
          boxShadow="lg"
          zIndex={2}
        />

        <Flex
          position="relative"
          width="100%"
          height={['350px', '400px', '500px']}
          justifyContent="center"
          alignItems="center"
          perspective="1500px"
          zIndex={1}
        >
          {cardData.map((card, index) => {
            const isActive = index === currentIndex;
            const isNext = index === (currentIndex + 1) % cardData.length;
            const isPrev = index === (currentIndex - 1 + cardData.length) % cardData.length;

            return (
              <Box
                key={index}
                transform={
                  isActive
                    ? 'scale(1) rotateY(0deg)'
                    : isNext
                    ? 'scale(0.9) rotateY(15deg) translateX(120%)'
                    : isPrev
                    ? 'scale(0.9) rotateY(-15deg) translateX(-120%)'
                    : 'scale(0.8) rotateY(0deg) translateZ(-100px)'
                }
                transition="transform 0.7s ease"
                position="absolute"
                width={['220px', '260px', '300px']}
                height={['280px', '320px', '400px']}
                boxShadow="2xl"
                rounded="lg"
                bg={isActive ? theme.colors.blue[500] : 'white'}
                color={isActive ? 'white' : 'gray.800'}
                p={4}
                display="flex"
                flexDirection="column"
                justifyContent="center"
                alignItems="center"
                opacity={isActive || isNext || isPrev ? 1 : 0.5}
                zIndex={isActive ? 3 : 1}
                _hover={{ boxShadow: 'xl', transform: 'scale(1.05)' }}
              >
                <Image
                  src={card.image}
                  alt={card.title}
                  rounded="full"
                  mb={4}
                  boxSize={['150px', '280px', '280px']}
                  boxShadow="md"
                  border={`4px solid ${isActive ? theme.colors.blue[200] : 'gray.200'}`}
                />
                <Text fontSize={['md', 'lg', 'xl']} fontWeight="bold">
                  {card.title}
                </Text>
                <Text mt={2} fontSize={['sm', 'md']} fontStyle="italic">
                  {card.qualification}
                </Text>
                <Text mt={2} textAlign="center" fontSize={['sm', 'md']}>
                  {card.description}
                </Text>
              </Box>
            );
          })}
        </Flex>

        {/* Right Arrow Icon */}
        <IconButton
          icon={<ArrowForwardIcon />}
          aria-label="Next"
          position="absolute"
          right={['20px', '30px', '50px']}
          top="50%"
          transform="translateY(-50%)"
          onClick={handleNext}
          colorScheme="blue"
          bg="blue.400"
          _hover={{ bg: "blue.500" }}
          borderRadius="full"
          boxShadow="lg"
          zIndex={2}
        />
      </Flex>
    </Flex>
  );
};

export default AutoSliding3DCardSlider;
