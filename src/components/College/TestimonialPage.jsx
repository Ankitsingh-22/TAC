import React, { useState, useEffect } from "react";
import { Box, Text, Button, Stack, Flex, Avatar, useBreakpointValue } from "@chakra-ui/react";

const testimonials = [
  {
    name: "John Doe",
    role: "Director of Recruitment at XYZ University",
    quote: "TalentConnect has revolutionized the way we recruit. The seamless process and extensive network have been game-changers for us.",
    avatarUrl: "https://randomuser.me/api/portraits/men/1.jpg",
  },
  {
    name: "Jane Smith",
    role: "HR Manager at ABC College",
    quote: "The platform's innovative tools and comprehensive support have made our hiring process much more efficient.",
    avatarUrl: "https://randomuser.me/api/portraits/women/1.jpg",
  },
  {
    name: "Alice Johnson",
    role: "Career Counselor at DEF College",
    quote: "With TalentConnect, we've been able to connect with top-tier talent effortlessly. The results speak for themselves!",
    avatarUrl: "https://randomuser.me/api/portraits/women/2.jpg",
  },
  // Add more testimonials as needed
];

const Testimonials = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % testimonials.length);
    }, 3000); // Change testimonial every 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, []);

  const { name, role, quote, avatarUrl } = testimonials[currentIndex];

  return (
    
    <Box p={4} bg="yellow.100">
        
      <Stack spacing={8} align="center">
        <Box textAlign="center">
          <Avatar src={avatarUrl} name={name} size="xl" mb={4} />
          <Text fontSize="xl" fontWeight="bold">
            {name}
          </Text>
          <Text fontSize="lg" color="gray.600">
            {role}
          </Text>
          <Text fontSize="md" mt={4}>
            "{quote}"
          </Text>
        </Box>
        <Stack spacing={4} direction={useBreakpointValue({ base: "column", md: "row" })}>
          {testimonials.map((testimonial, index) => (
            <Button
              key={index}
              onClick={() => setCurrentIndex(index)}
              variant={index === currentIndex ? "solid" : "outline"}
              colorScheme="blue"
            >
              {testimonial.name}
            </Button>
          ))}
        </Stack>
      </Stack>
    </Box>
  );
};

export default Testimonials;
