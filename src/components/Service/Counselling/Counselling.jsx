import React from "react";
import {
  Stack,
  Flex,
  Text,
  VStack,
  useBreakpointValue,
  Box,
  Heading,
  Container,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import Section3 from "./Section3";
import Section4 from "./Section4";
import About from "./About";
// import New2 from "./new2";
import Hero from "./hero"

export default function OnCampus() {
  return (
    <>
   <Flex
      direction="column"
      bgGradient="linear(to-br, blue.300, purple.200)"// Set background color here
    >

      <Hero />
      <About />
      {/* <New2 /> */}

      {/* Section 3 */}
      <Section3 />

      {/* Section 4 */}
      <Section4 />
    </Flex>
    </>
  );
}
