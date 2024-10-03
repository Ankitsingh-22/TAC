import React from "react";
import { Container, Stack, Heading, Box, Text, useBreakpointValue } from "@chakra-ui/react";

const CTCSection3 = () => {
  const cardData = [
    {
      title: "Connecting Talent",
      imageUrl:
        "https://images.pexels.com/photos/1181346/pexels-photo-1181346.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2",
      description:
        "Talentconnect is a tech company that bridges the gap between campus and the corporate world, helping job seekers find their dream roles.",
    },
    {
      title: "Empowering Job Seekers",
      imageUrl:
        "https://images.pexels.com/photos/1181371/pexels-photo-1181371.jpeg",
      description:
        "Through comprehensive training and strategic hiring initiatives, Talent Connect equips candidates with the skills and opportunities to thrive in the job market.", 
    },
    {
      title: "Serving Employers",
      imageUrl:
        "https://images.pexels.com/photos/3182759/pexels-photo-3182759.jpeg",
      description:
        "Talentconnect provides a platform for companies to access a diverse pool of talented candidates, streamlining the recruitment process.",
    },
  ];

  return (
    <Container maxW="100%" bg="white"  minH={"80vh"}>
      <Heading as="h2" fontSize={{ base: '3xl', md: '4xl' }} mb={4} color="blue.200" textAlign={"center"}> <br/>
                    <Text as="span" color="yellow.300" fontSize={{ base: '2xl', md: '4xl' }}>
                        Our Unique
                    </Text> Offering
                </Heading>
      <br />
      <Stack
        direction={useBreakpointValue({ base: "column", md: 'column', lg: "row" })}
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
              <Heading fontFamily={"ClashDisplay"} textTransform={"uppercase"} color="blue.300" as="h3" size="md" mb={2}>
                {card.title} <br /> <br />
              </Heading>
              <Text text-align= {"justify"}>{card.description}</Text>
            </Box>
            <Box
              position="relative"
              left={0}
              bottom={0}
              w="100%"
              p={4}
              bg="yellow.300"
              zIndex={3}
              color="black"
              className="titleBox"
              textAlign="center"
              
            >
              <Heading fontFamily={"ClashDisplay"}  as="h3" size="md">
                {card.title}
              </Heading>
            </Box>
          </Box>
        ))}
      </Stack>
    </Container>
  );
};

export default CTCSection3;
