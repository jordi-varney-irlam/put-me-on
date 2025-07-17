import { Flex, Container, Text, Link } from '@chakra-ui/react'
import React from 'react'
import TextPressure from './components/TextPressure';

const NavBar = () => {
  return ( 
      <Container maxW={"1140px"} px={4}>
       <Flex
        h="64px" // or h={16}
        alignItems="center"
        justifyContent="center" // center the animated text
        bg="gray.500"
        overflow="hidden"
        borderRadius="xl"
      >
        <div style={{ height: '100%', display: 'flex', alignItems: 'center' }}>
          <TextPressure
            text="Put Me On. Put Me On. Put Me On. Put Me On."
            flex={true}         // disables spacing between letters
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#ffffff"
            strokeColor="#ff0000"
            minFontSize={60}     // small enough to fit navbar
          />
        </div>

            {/*<Text
            fontSize={{ base: "22px", sm: "28px" }}
            fontWeight={"bold"}
            textTransform={"uppercase"}
            textAlign={"center"}
            bgGradient={"linear(to-r, purple.300, yellow.400)"}
            bgClip={"text"}
            ><Link href="/">Put Me On </Link>
    </Text>*/}

        </Flex>   
    </Container>
  )
}

export default NavBar
