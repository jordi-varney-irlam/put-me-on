import { Flex, Container, Text, Button, HStack } from '@chakra-ui/react'
import React from 'react'
import { Link } from "react-router-dom"

const TrueBar = () => {
  return ( 
      <Container maxW={"1140px"} px={4}>
       <Flex
        h="64px" // or h={16}
        alignItems="center"
        justifyContent="space-between" // put space between contents
        bg="gray.500"
        overflow="hidden"
        borderRadius="xl"
        px={4} // adds padding to left and right
      >
        <Text
            as={Link}
            to="/"
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, purple.300, yellow.400)"}
            bgClip={"text"}
            >Put Me On
        </Text>

        <HStack>
          <Button as={Link} to="/createuser">
            New User
          </Button>
          <Button as={Link} to="/login" colorScheme="purple">
            Login
          </Button>
        </HStack>
        

        </Flex>   
    </Container>
  )
}

export default TrueBar;