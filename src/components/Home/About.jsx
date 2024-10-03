import {
  Flex,
  Heading,
  Stack,
  Text,
  useBreakpointValue,
  Box,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import hVideo from "../../assets/videos/tc.mp4";

export default function About() {
  const isMobile = useBreakpointValue({ base: true, xl: false });

  // Responsive sizes
 // const buttonSizes = useBreakpointValue({ base: "sm", sm: "md", md: "md", lg: "md", xl: "md", "2xl": "xl", "3xl": "5xl" });
  //const paddingX = useBreakpointValue({ base: 3, sm: 4, md: 5, lg: 6, xl: 4, "2xl": 7, "3xl": "14" });
  const paddingY = useBreakpointValue({ base: 3, sm: 4, md: 5, lg: 6, xl: 6, "2xl": 7, "3xl": "14" });
  const headingSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "5xl", "2xl": "6xl", "3xl": "8xl" });
  const textSize = useBreakpointValue({ base: "sm", sm: "md", md: "md", lg: "lg", xl: "lg", "2xl": "2xl", "3xl": "5xl" });
  const videoSize = useBreakpointValue({ base: "100%", sm: "100%", md: "100%", lg: "100%", xl: "100%", "2xl": "100%", "3xl": "100%"});
  const pScreenX = useBreakpointValue({base: 3, sm: 4, md: 4, lg: 10, xl: 6, "2xl": 7, "3xl": 14}); 
 // const pscreenY = useBreakpointValue({base: 3, sm: 4, md: 12, lg: 12, xl: 12, "2xl": 0, "3xl": 7}); 

  // Framer-motion variants for text animations
  const textVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 1 } },
  };

  return (
    <Stack
      //minH={"90vh"}
      direction={{ base: "column", md: "row" }}
      spacing={4}
      maxW={{ base: "100%", lg: "1200px", xl: "1440px", "2xl": "2560px" }}
      mx={"auto"}
      px={pScreenX}
     // py={pscreenY}
      position={"relative"}
      overflow={"hidden"}
      bgColor={"#BEE3F8"}
      zIndex={1}
    >
      {/* Video for Desktop and Larger Screens */}
      {!isMobile && (
        <Flex flex={1} align={"center"} justify={"flex-start"} position={"relative"}>
         <Box               
               // maxW="800px"
                borderRadius={"lg"}
                //maxHeight="60vh"
                p={paddingY}
              >
                <Box
                  w="100%"
                  display="flex"
                  justifyContent="center"
                  as={motion.div}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  _hover={{
                    transform: "scale(1.03)",
                    borderColor: "blue.400",
                    boxShadow: "0 0 20px rgba(255, 215, 0, 1)",
                    transition: "all 0.4s ease",
                    borderRadius: "lg",
                  }}
                >
                  <video
                    key="mobile-video"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: videoSize,
                      height: "auto",
                      borderRadius: "8px",
                      border: "2px solid transparent",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    src={hVideo}
                    aria-label="Promotional video for TalentConnect"
                  />
                </Box>
              </Box>
        </Flex>
      )}
      
      <Flex p={0} flex={1} align={"center"} justify={"center"} position={"relative"}>
        <Stack spacing={6} w={"full"} maxW={{ base: "320px", sm: "375px", md: "425px", lg: "768px", xl: "1024px", "2xl": "1440px", "3xl" :"2560px"}}>
          <Heading
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={headingSize}
          >
            <Text
              as={"span"}
              position={"relative"}
              _after={{
                content: "''",
                width: "full",
                height: useBreakpointValue({ base: "20%", md: "30%" }),
                position: "absolute",
                bottom: 1,
                left: 0,
                bg: "blue.400",
                zIndex: -1,
              }}
            >
              About Us
            </Text>
            <br />
            <Text color={"blue.400"} as={"span"}>
              At TalentConnect,
            </Text>
          </Heading>
          <Text
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={textSize}
            color={"black"}
          >
            We are dedicated to bridging the gap between talented individuals and the dynamic workforce.
          </Text>
          
          {/* Video for Mobile */}
          {isMobile && (
            <Flex flex={1} align={"center"} justify={"center"} position={"relative"}>
              <Box
                w={videoSize}
                maxW="800px"
                borderRadius={"lg"}
                maxHeight="60vh"
                //p={paddingY}
              >
                <Box
                  w="100%"
                  display="flex"
                  justifyContent="center"
                  as={motion.div}
                  initial={{ opacity: 0, x: -100 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 1 }}
                  _hover={{
                    transform: "scale(1.03)",
                    borderColor: "blue.400",
                    boxShadow: "0 0 20px rgba(255, 215, 0, 1)",
                    transition: "all 0.4s ease",
                    borderRadius: "lg",
                  }}
                >
                  <video
                    key="mobile-video"
                    controls
                    autoPlay
                    loop
                    muted
                    playsInline
                    style={{
                      width: videoSize,
                      height: "auto",
                      borderRadius: "8px",
                      border: "2px solid transparent",
                      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.2)",
                    }}
                    src={hVideo}
                    aria-label="Promotional video for TalentConnect"
                  />
                </Box>
              </Box>
            </Flex>
          )}
          
          <Text
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={textSize}
            color={"black"}
          >
            Our mission is to provide top-notch career services that empower individuals to achieve their professional aspirations while supporting organizations in building their dream teams.
          </Text>
          <Text
            as={motion.div}
            variants={textVariants}
            initial="hidden"
            whileInView="visible"
            fontSize={textSize}
            color={"black"}
          >
            With a commitment to excellence, innovation, and integrity, TalentConnect is your trusted partner in career success.
          </Text>
        </Stack>
      </Flex>
    </Stack>
  );
}
