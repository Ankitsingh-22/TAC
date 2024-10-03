import React, { useState, useEffect } from "react";
import {
  Stack,
  Flex,
  Button,
  Text,
  VStack,
  useBreakpointValue,
} from "@chakra-ui/react";
import { HashLink as Link } from "react-router-hash-link";
import { motion } from "framer-motion";

// Array of video URLs
const videos = [
  "https://static.vecteezy.com/system/resources/previews/043/623/224/mp4/two-successful-young-businesswoman-shaking-hands-business-meeting-in-office-job-interview-business-career-placement-concept-hr-holding-job-contract-hiring-female-applicant-human-resources-concept-free-video.mp4",
];

export default function Hero() {
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);
  const buttonSizes = useBreakpointValue({base: "sm", sm: "sm", md: "sm", lg: "md", xl: "lg", "2xl": "2xl", "3xl": "4xl",});
  const px = useBreakpointValue({ base: 2, sm: 2, md: 2, lg: 4, xl: 6, "2xl": 8, "3xl": 12 });
  const py = useBreakpointValue({ base: 2, sm: 2, md: 2, lg: 4, xl: 6, "2xl": 8, "3xl": 12 });
  const spacing = useBreakpointValue({ base: 2, sm: 3, md: 3, lg: 5, xl: 6, "2xl": 7, "3xl": 10 });
  const sizeHeading =  useBreakpointValue({ base: "4xl",sm: "4xl", md: "4xl", lg: "5xl", xl: "7xl","2xl": "8xl","3xl": "9xl"});
  const sizeText = useBreakpointValue({base: "sm", sm: "md",md: "md",lg: "lg",xl: "xl", "2xl": "3xl","3xl": "5xl"});
  // Change video at intervals
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentVideoIndex((prevIndex) => (prevIndex + 1) % videos.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(intervalId); // Clean up on unmount
  }, []);

  return (
    <Flex
      w={"full"}
      h={"100vh"}
      position={"relative"}
      overflow={"hidden"}
      align={"center"}
      justify={"center"}
    >
      {/* Video Background */}
      <video
        key={currentVideoIndex}
        autoPlay
        loop
        muted
        playsInline
        src={videos[currentVideoIndex]}
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          zIndex: -1,
          transition: "opacity 1s ease-in-out",
        }}
      />

      {/* Gradient Overlay */}
      <VStack
        w={"full"}
        h={"full"}
        justify={"center"}
        px={px}
        bgGradient={"linear(to-l, rgba(0, 0, 0, 0.6), transparent)"}
        position={"relative"}
        spacing={spacing}
        align={"center"}
      >
        <Stack
          maxW={{ base: "90%", sm: "80%", md: "70%", lg: "60%", xl: "75%", "2xl": "75%" }}
          spacing={spacing}
          textAlign={"center"}
          as={motion.div}
          initial={{ opacity: 0, y: -100 }}  // Start from top (y: -100)
          animate={{ opacity: 1, y: 0 }}     // Animate to center (y: 0)
          transition={{ duration: 1 }}        // Smooth transition over 1 second
        >
          <style>
@import url('https://fonts.googleapis.com/css2?family=Permanent+Marker&family=Playpen+Sans:wght@100..800&display=swap');
</style>
          <Text
            color={"orange.300"} 
            //fontWeight={100}
            lineHeight={1.6}
            fontSize={sizeHeading}
             fontFamily={"Permanent Marker, cursive"} // Set your desired font family here
             // fontSize={"105px"} // Heading size
    //  textTransform={"uppercase"}
      transform={"rotate(-0deg)"}
      textShadow={"5px 5px white"} // Blue shadow (blue.400 in rgba)
          >
            Welcome to TalentConnect !
          </Text>
         

<Text
  color={"white"}
  fontSize={sizeText}
  fontWeight={800}
  fontFamily={"Playpen Sans, cursive"}
  as={motion.div}
  initial={{ y: "-100vh" }}          // Start off-screen to the top
  animate={{ y: 0 }}                 // Move to original position
  transition={{ type: "tween", duration: 1, delay: 0.7 }} // Delayed transition
>
  Your premier destination for comprehensive career solutions. Whether
  you're a job seeker, an employer, or an academic institution, we
  connect talent with opportunity.
</Text>

          <Stack
            direction={"row"}
            spacing={spacing} // Responsive spacing between buttons
            justify={"center"}
          >
            <Link to="/#our-services">
              <Button
                as={motion.button}
                fontSize={buttonSizes} // Responsive font size
                px={px} // Responsive horizontal padding
                py={py} // Responsive vertical padding
                bgGradient="linear(to-r, teal.400, blue.500)"
                rounded={"full"}
                color={"white"}
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Learn More
              </Button>
            </Link>
            <Link to="/contact">
              <Button
                as={motion.button}
                fontSize={buttonSizes} // Responsive font size
                px={px} // Responsive horizontal padding
                py={py} // Responsive vertical padding
                bg={"whiteAlpha.300"}
                rounded={"full"}
                color={"white"}
                _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
                whileHover={{ scale: 1.1 }}
                transition={{ duration: 0.3 }}
              >
                Contact Us
              </Button>
            </Link>
          </Stack>
        </Stack>
      </VStack>
    </Flex>
  );
}
