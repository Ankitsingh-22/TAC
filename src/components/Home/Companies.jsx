import React, { useState, useRef, useEffect } from 'react';
import { Box, Flex, Heading, Text, keyframes, useBreakpointValue } from '@chakra-ui/react';

// List of companies
const companiesList = [
  { name: "ARUN ENG & CO" },
  { name: "Arka Jain" },
  { name: "Jharkhand IT Solutions" },
  { name: "Hitachi Payment Services" },
  { name: "Hitachi Chennai" },
  { name: "Emversity" },
  { name: "Hitachi Mumbai" },
  { name: "Hitachi North East" },
  { name: "Hitachi Jaipur" },
  { name: "Hitachi Assam" },
  { name: "Winso Software Pvt Ltd" },
  { name: "CMS" },
  { name: "M/s Unique Engineer's" },
  { name: "Blue Craft" },
  { name: "A.K ENGINEERING CORPORATION" },
  { name: "JINDAL ORRISA" }
];

// Duplicated list to ensure seamless scrolling
const duplicatedList = [...companiesList, ...companiesList];

const scrollAnimation = keyframes`
  0% { transform: translateX(0); }
  100% { transform: translateX(-50%); }  // Move by half of the total width
`;

const Companies = () => {
  const [isPaused, setIsPaused] = useState(false);  // State to control scrolling
  const animationRef = useRef(null);

  // Calculate the total width required for seamless scrolling
  const containerWidth = duplicatedList.length * 405; // Adjust item width if necessary

  // Pause animation when mouse enters and resume when mouse leaves
  useEffect(() => {
    if (isPaused) {
      animationRef.current.style.animationPlayState = 'paused';
    } else {
      animationRef.current.style.animationPlayState = 'running';
    }
  }, [isPaused]);

  const headingFontSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "4xl", "2xl": "6xl", "3xl": "8xl" });
  const textFontSize = useBreakpointValue({ base: "10px", sm: "11px", md: "sm", lg: "md", xl: "sm", "2xl": "2xl", "3xl": "2xl"  });
  //const pScreenX = useBreakpointValue({base: 3, sm: 4, md: 4, lg: 12, xl: 6, "2xl": 7, "3xl": 14}); 
  const pscreenY = useBreakpointValue({base: 5, sm: 10, md: 10, lg: 10, xl: 12, "2xl": 14, "3xl": 40}); 


  return (

    
    <Box textAlign="center" py={pscreenY}>
      <Flex justifyContent="center" alignItems="center" direction={{base:"column", xl:"row"}}>
      <Heading as="h4" size="xl"  p={{base:"2","lg":"4", "3xl":"8"}}
        fontSize={headingFontSize}
        fontFamily={"ClashDisplay"}
        color={"black"}  // Change to your desired color
      >
        Top Startups & MNC’s
      </Heading>
      <Heading as="h4" size="xl" 
        fontSize={headingFontSize}
        fontFamily={"ClashDisplay"}
        
        color={"blue.400"}  // Change to your desired color
      >
        that Hire from TalentConnect
      </Heading>
      </Flex>
      <Box overflow="hidden" width="100%" mt={{base:"10",lg:"20"}}>
        <Flex
          ref={animationRef}
          as="ul"
          listStyleType="none"
          width={`${containerWidth}px`}  // Set width based on duplicated list
          animation={`${scrollAnimation} 60s linear infinite`}  // Smooth scrolling
          whiteSpace="nowrap"
          onMouseEnter={() => setIsPaused(true)}  // Stop scrolling when hovering
          onMouseLeave={() => setIsPaused(false)}  // Resume scrolling when hover ends
        >
          {duplicatedList.map((company, index) => (
            <Box
              as="li"
              key={index}
              mx="6"
              display="inline-block"
              p="4"
              bg="white"             
              borderRadius="md"
              boxShadow="0 0 15px rgba(160, 32, 240, 0.6)"  // Shining shadow effect
              transition="box-shadow 0.3s, border-color 0.3s"
            >
              <Text
                fontSize={textFontSize}
                fontWeight="bold"
                color="orange.400"
                fontFamily={"Poppins, sans-serif"}  // Professional font style
              >
                {company.name}
              </Text>
            </Box>
          ))}
        </Flex>
      </Box>
    </Box>
  );
};

export default Companies;
