import { Box, Heading, SimpleGrid, Icon, Text, Stack, Flex } from "@chakra-ui/react";
import { FcBusinessman, FcMoneyTransfer, FcDataRecovery, FcFeedback } from "react-icons/fc";

// Feature component for displaying each challenge
const Feature = ({ title, text, icon }) => {
  return (
    <Stack
      align="center"
      transition="transform 0.3s, box-shadow 0.3s"
      _hover={{ transform: "scale(1.05)", boxShadow: "lg" }}
      p={5}
      borderRadius="md"
      bg="white"
      shadow="md"
    >
      <Flex
        w={{ base: 12, md: 16 }}
        h={{ base: 12, md: 16 }}
        align={"center"}
        justify={"center"}
        rounded={"full"}
        bg={"blue.500"}
        mb={2}
        transition="all 0.3s ease"
        _hover={{
          bg: "blue.300",
          transform: "scale(1.2)",
        }}
      >
        {icon}
      </Flex>
      <Text fontWeight={700} textAlign="center" fontSize={{ base: "md", md: "lg" }}>
        {title}
      </Text>
      <Text color={"black"} textAlign="center" fontSize={{ base: "sm", md: "md" }}>
        {text}
      </Text>
    </Stack>
  );
};

export default function CollegeChallenges() {
  return (
    <Box p={{ base: 5, md: 5, lg: 20 }} bg="#f4f4f3ff">
      <Flex justifyContent="center" alignItems="center">
        <Heading
          fontFamily="ClashDisplay"
          fontSize={{ base: "2xl", md: "3xl", lg: "4xl" }} // Responsive font size
          fontWeight="bold"
          p="2"
          mb={6}
          textAlign="center"
        >
          <Text as="span" color="black">
            Challenges Faced by Colleges
          </Text>
          <Text as="span" color="blue.400">
            {' '}in Campus Recruitment
          </Text>
        </Heading>
      </Flex>
      
      <Text
        fontSize={{ base: "sm", md: "md", lg: "lg" }}
        color={"black"}
        mb={10}
        textAlign="center"
        px={{ base: 4, md: 0, lg: 0 }}  // Padding for better readability on small screens
      >
        Colleges often face several challenges in campus recruitment, including limited employer reach, resource constraints, skill gaps among graduates, and a lack of actionable feedback.
      </Text>

      {/* Responsive grid for features */}
      <SimpleGrid columns={{ base: 1, sm: 1, md: 1, lg: 2, xl: 4 }} spacing={10}>
        <Feature
          icon={<Icon as={FcBusinessman} w={10} h={10} />}
          title={"Limited Employer Reach"}
          text={"Difficulty in connecting with a wide range of companies."}
        />
        <Feature
          icon={<Icon as={FcMoneyTransfer} w={10} h={10} />}
          title={"Resource Constraints"}
          text={"Insufficient tools and resources to manage recruitment efficiently."}
        />
        <Feature
          icon={<Icon as={FcDataRecovery} w={10} h={10} />}
          title={"Skill Gaps"}
          text={"Graduates often lack industry-specific skills."}
        />
        <Feature
          icon={<Icon as={FcFeedback} w={10} h={10} />}
          title={"Feedback Shortages"}
          text={"Lack of actionable insights to improve recruitment strategies."}
        />
      </SimpleGrid>
    </Box>
  );
}
