import { useState } from "react";
import {
  Box,
  Button,
  Container,
  Flex,
  Heading,
  Icon,
  Text,
  Stack,
  useBreakpointValue,
  useColorModeValue,
  keyframes,
  SimpleGrid,
} from "@chakra-ui/react";
import {
  FcBusiness,
  FcGraduationCap,
  FcCollaboration,
  FcAssistant,
  FcReading,
  FcBriefcase,
  FcGlobe,
} from "react-icons/fc";
import { HashLink as Link } from "react-router-hash-link";

const rotate = keyframes`
  0% { transform: rotate(0deg); border-color: #63b3ed; }
  25% { border-color: #f56565; }
  50% { border-color: #48bb78; }
  75% { border-color: #d69e2e; }
  100% { transform: rotate(360deg); border-color: #63b3ed; }
`;

const colors = ["yellow.400", "green.400", "red.400", "purple.400", "pink.400", "teal.400", "orange.400"];

const getRandomColor = () => {
  const randomIndex = Math.floor(Math.random() * colors.length);
  return colors[randomIndex];
};

const Card = ({ heading, description, icon, link }) => {
  const [isHovered, setIsHovered] = useState(false);
  const [bgColor] = useState(getRandomColor); 

  const headingSize = useBreakpointValue({ base: "md", sm: "md", md: "md", lg: "md", xl: "md", "2xl": "md", "3xl": "xl" });
  const textSize = useBreakpointValue   ({ base: "sm", sm: "sm", md: "sm",   lg: "md", xl: "md", "2xl": "md", "3xl": "2xl"  });

  return (
    <Box
      as={Link}
      to={link}
      boxShadow="md"
      align="center"
      borderRadius="xl"
      p={{base:"3", "3xl":"8"}}
      w="100%"
      h="100%"
      bg={useColorModeValue("white", "gray.800")}      
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <Flex direction="column" justify="space-between" h="100%">
        <Stack align="center" spacing={4}>
          <Flex
            w={20} h={20}
            align="center" justify="center"
            mb={4}
            borderRadius="full"
            borderWidth="4px"
            borderColor={isHovered ? "blue.400" : "transparent"}
            animation={isHovered ? `${rotate} 4s infinite linear` : "none"}
          >
            <Flex
              w={16} h={16}
              align="center" justify="center"
              bg={bgColor}
              color="white"
              rounded="full"
            >
              {icon}
            </Flex>
          </Flex>
          <Box textAlign="center">
            <Heading size={headingSize} color="#7877e6ff">
              {heading}
            </Heading>
            <Text mt={2} fontSize={textSize} color="gray.700">
              {description}
            </Text>
          </Box>
        </Stack>
        <Box textAlign="center" mt={4}>
          <Button 
            variant="link"
            fontWeight={700}
            size="md"
            fontSize={textSize}
            color="blue.500"
          >
            Learn more
          </Button>
        </Box>
      </Flex>
    </Box>
  );
};

export default function OurServices() {
  const headingFontSize = useBreakpointValue({ base: "2xl", sm: "3xl", md: "3xl", lg: "4xl", xl: "5xl", "2xl": "6xl", "3xl": "8xl" });
  const pScreenX = useBreakpointValue({base: 3, sm: 4, md: 4, lg: 12, xl: 40, "2xl": 60, "3xl": 80}); 
  const pscreenY = useBreakpointValue({base: 10, sm: 10, md: 10, lg: 12, xl: 8, "2xl": 14, "3xl": 30}); 

  return (
    <Box id="our-services" bgColor="#BEE3F8" py={pscreenY} px={pScreenX}>
      <Flex justifyContent="center" alignItems="center" mb={{base:10, xl:20}}>
        <Heading
          fontSize={headingFontSize}
          fontWeight="700"
          color="black"
          mr={{base:"2","3xl":"10"}}
        >
          Our
        </Heading>
        <Heading
          fontSize={headingFontSize}
          fontWeight="700"
          color="blue.400"
        >
          Services
        </Heading>
    
      </Flex>

      <SimpleGrid columns={{ base: 1, lg: 2, xl:3 }} spacing={8} justifyItems="center">
        <Card
          heading="OnCampus"
          icon={<Icon as={FcGraduationCap} w={10} h={10} />}
          description="Our OnCampus service brings career opportunities directly to students, connecting them with top employers through campus recruitment drives and job events."
          link="/oncampus"
        />
        <Card
          heading="OffCampus"
          icon={<Icon as={FcGlobe} w={10} h={10} />}
          description="TalentConnect's Off Campus service offers a platform for recent graduates to explore diverse career opportunities."
          link="/offcampus"
        />
        <Card
          heading="Workforce Provider"
          icon={<Icon as={FcBriefcase} w={10} h={10} />}
          description="Our Workforce Provider service offers tailored staffing solutions to connect employers with top talent."
          link="/workforce"
        />
        <Card
          heading="Seminar"
          icon={<Icon as={FcCollaboration} w={10} h={10} />}
          description="Our seminars provide valuable insights on various career-related topics, led by industry experts."
          link="/seminar"
        />
        <Card
          heading="Counselling"
          icon={<Icon as={FcAssistant} w={10} h={10} />}
          description="Personalized career counseling services to help you navigate your career path."
          link="/counselling"
        />
        <Card
          heading="CareerCraft"
          icon={<Icon as={FcReading} w={10} h={10} />}
          description="CareerCraft is focused on skill development and career readiness through workshops and mentorship."
          link="/careercraft"
        />
      </SimpleGrid>
    </Box>
  );
}
