import React from "react";
import { Box, Image, Text, useBreakpointValue } from "@chakra-ui/react";
import { Link } from "react-router-dom"; // Import Link from react-router-dom
import logo from "../../assets/images/Logo/logo.png"; // Adjust the path to your logo image

const Logo = () => {
  return (
    <Link to="/" className="logo-link">
      {" "}
      {/* Wrap the Box in a Link */}
      <Box
        className="logo-container"
        position="relative"
        paddingBottom="0px"
        width="100px"
        height={useBreakpointValue({base:"40px" ,lg:"50px","xl":"55px","3xl":"80px"})}
        // display="flex"
        // alignItems="center"
        // justifyContent="flex-start"
        // overflow="hidden"
        // border="1px solid transparent"
        // transition="transform 0.3s ease-in-out"
        // _hover={{
        //   ".company-name": {
        //     transform: "translateY(0)",
        //     opacity: 1,
        //     zIndex: 1,
        //   },
        //   ".logo": { transform: "translateX(50%)" },
        // }} 
      >
        <Image
          src={logo}
          alt="Logo"
          className="logo"
          width={{base:"50px" ,lg:"50px","xl":"55px" ,"3xl":"100px"}}
          marginLeft={"5px"}
          height="auto"
          objectFit="cover"
          transition="transform 0.3s ease-in-out"
        />
        {/* <Text
          className="company-name"
          position="absolute"
          bottom={0}
          left={0}
          fontSize="10px"
          textAlign="center"
          fontWeight="bold"
          width="100%"
          backgroundColor="rgba(57, 198, 78, 0.8)"
          color="black"
          boxSizing="border-box"
          transform="translateY(100%)"
          transition="transform 0.3s ease-in-out, font-size 0.3s ease-in-out"
          opacity={0}
          zIndex={-1}
        >
          TalentConnect
        </Text> */}
      </Box>
    </Link>
  );
};

export default Logo;
