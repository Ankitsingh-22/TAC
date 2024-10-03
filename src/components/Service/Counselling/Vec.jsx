import { Box, Text, keyframes } from "@chakra-ui/react";
import { useEffect, useState } from "react";

// Define the floating animation keyframes
const floatAnimation = keyframes`
  0% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0); }
`;

const FuturePoint = ({ point, index, position }) => {
  const { left, top, mobileLeft, mobileTop } = position;

  return (
    <Box
      position="absolute"
      animation={`${floatAnimation} ${3 + index}s ease-in-out infinite`}
      left={{ base: mobileLeft, md: left }}
      top={{ base: mobileTop, md: top }}
      transform={{
        base: `rotate(${index * 60}deg) translate(90px) rotate(-${index * 60}deg)`, // Mobile adjustments
        md: `rotate(${index * 60}deg) translate(180px) rotate(-${index * 60}deg)`, // Larger screens
      }}
      bgGradient="linear(to-r, blue.400, teal.300)"
      p={[2, 4]} 
      borderRadius="80px"
      shadow="lg"
      _hover={{
        transform: {
          base: `rotate(${index * 60}deg) translate(90px) scale(1.2) rotate(-${index * 60}deg)`,
          md: `rotate(${index * 60}deg) translate(180px) scale(1.2) rotate(-${index * 60}deg)`,
        },
        shadow: "xl",
        bgGradient: "linear(to-r, teal.300, blue.400)",
      }}
      transition="transform 0.2s ease-out"
      zIndex={index + 2}
    >
      <Text
        color="white"
        fontWeight="bold"
        textAlign="center"
        fontSize={["sm", "md", "lg"]} 
      >
        {point}
      </Text>
    </Box>
  );
};

const AnimatedFuturePoints = () => {
  const [scrollY, setScrollY] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <Box
      position="relative"
      display="flex"
      justifyContent="center"
      alignItems="center"
      p={[2, 4]} // Adjust padding for smaller screens
      height="100vh"
      bgGradient="linear(to-b, transparent)"
      mt={10}
    >
      {/* Main character */}
      <Box
        as="img"
        src="https://i.postimg.cc/zBxxQCLL/Screenshot-2024-09-11-170518-removebg-preview.png"
        alt="Thinking character"
        boxSize={["180px", "150px", "250px"]} // More refined sizes for responsiveness
        objectFit="cover"
        zIndex={1}
        position="relative"
        borderRadius="full"
        border="4px solid blue.500"
        shadow="2xl"
        mt={2}
      />

      {/* Floating text points in a curve */}
      <FuturePoint
        point="Higher Studies"
        index={0}
        position={{ left: '-48%', top: '30%', mobileLeft: '-50%', mobileTop: '42%' }}
      />
      <FuturePoint
        point="Start Up"
        index={1}
        position={{ left: '34%', top: '15%', mobileLeft: '35%', mobileTop: '35%' }}
      />
      <FuturePoint
        point="Passion"
        index={2}
        position={{ left: '100%', top: '30%', mobileLeft: '98%', mobileTop: '42%' }}
      />
      <FuturePoint
        point="Government Job"
        index={3}
        position={{ left: '-50%', top: '65%', mobileLeft: '-50%', mobileTop: '58%' }}
      />
      <FuturePoint
        point="Career"
        index={4}
        position={{ left: '97%', top: '65%', mobileLeft: '90%', mobileTop: '58%' }}
      />
    </Box>
  );
};

export default AnimatedFuturePoints;
