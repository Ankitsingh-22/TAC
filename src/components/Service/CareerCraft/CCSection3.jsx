import React from "react";
import { Container, Stack, Heading,Flex, Box, Text, useBreakpointValue } from "@chakra-ui/react";

const Section3 = () => {
  const cardData = [
    {

      title: "1:1 Mentorship",
      imageUrl:
        "https://images.unsplash.com/photo-1513258496099-48168024aec0?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8M3x8bWVudG9yc2hpcHxlbnwwfHwwfHx8MA%3D%3D",
      description:
        "TalentConnect provides regular sessions, mentees can gain valuable insights, overcome challenges, and accelerate their progress in their personal or professional journey.",

    },
    {
      title: "Skill Enhancement",
      imageUrl:
        "https://images.unsplash.com/photo-1613347761513-0f37baebfd20?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTMxfHxlbmdpbm5lciUyMHdvcmtpbmd8ZW58MHx8MHx8fDA%3D",
      description:
        "TalentConnect provides courses and certifications in high-demand technical skills and offers advanced certification programs for career advancement and specialization.",
    },
    {
      title: "High-Skilled Mentor",
      imageUrl:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR7OAw1nW0KLSzM8b6otJgqEhxtFyhfWfBhYg&s",
      description:
        "TalentConnect provides high-paid skilled professional panels which give end-to-end guidance to the candidates.",
    },
  ];

  return (
    <Container maxW="100%" minH={"80vh"} pb={10}>
    <Flex justifyContent="center" alignItems="center" mb={10} mt={10}>
        <Heading
          fontFamily="ClashDisplay"
          fontSize={useBreakpointValue({ base: "2xl", sm: "3xl", "2xl": "5xl", "3xl": "7xl" })} 
          fontWeight="bolder"
          textAlign="center"
        >
          <Text as="span" color="#303048">
          CareerCraft’s
          </Text>
          <Text as="span" color="#F8BE2F">
            {" "}Key Benefits
          </Text>
        </Heading>
      </Flex>
      <Stack
        direction={useBreakpointValue({ base: "column", md: "column", lg: "row" })}
        justify="space-around"
        spacing={10}
      >
        {cardData.map((card, index) => (
          <Box
            key={index}
            //maxW={{ base: "100%", md: "md" }}
            w={"full"}
            h={"50vh"}
            overflow="hidden"
            position="relative"
            borderRadius="xl"
            boxShadow="lg"
            bgSize="cover"
            bgImage={`url(${card.imageUrl})`}
            bgPosition="center"
            _hover={{
              _before: {
                content: `""`,
                position: "absolute",
                left: 0,
                bottom: 0,
                w: "100%",
                h: "100%",
                bg: "rgba(0,0,0,0.5)",
                zIndex: 1,
                transition: "all 0.5s ease",
              },
              "> .content": {
                transform: "translateY(0)",
                opacity: 1,
                transition: "all 0.5s ease",
              },
              "> .titleBox": {
                opacity: 0,
              },
            }}
          >
            <Box
              position="absolute"
              left={0}
              bottom={0}
              w="100%"
              h="100%"
              p={4}
              bg="rgba(0,0,0,0.7)"
              zIndex={2}
              color="white"
              className="content"
              transform="translateY(100%)"
              opacity={0}
              display="flex"
              flexDirection="column"
              justifyContent="center"
              alignItems="center"
              textAlign="center"
            >
              <Heading fontFamily={"ClashDisplay"} textTransform={"uppercase"} color="blue.400" as="h3" size={useBreakpointValue({base:"md", "2xl": "lg", "3xl": "3xl"})} mb={useBreakpointValue({base: 4, md: 0, lg: -4, xl: -4})}>
                {card.title} <br /> <br />
              </Heading>
              <Text text-align= {"justify"} fontSize={useBreakpointValue({base: "xs", md: "sm", lg: "xs", xl: "md", "2xl": "xl", "3xl": "4xl"})}>{card.description}</Text>
            </Box>
            <Box
              position="relative"
              left={0}
              bottom={0}
              w="100%"
              p={4}
              bg="rgba(0,0,0,0.5)"
              zIndex={3}
              color="white"
              className="titleBox"
              textAlign="center"
              
            >
              <Heading fontFamily={"ClashDisplay"}  as="h3" size={useBreakpointValue({base:"sm", "2xl": "lg", "3xl": "3xl"})}>
                {card.title}
              </Heading>
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default Section3;
