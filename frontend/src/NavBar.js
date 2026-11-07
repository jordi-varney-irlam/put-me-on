import { Box, Container, Flex, Text } from '@chakra-ui/react';
import React from 'react';
import TextPressure from './components/TextPressure';

// Footer banner with the interactive "pressure" text.
const NavBar = () => {
  return (
    <Container as="footer" maxW="1140px" px={4} mt={16} pb={8}>
      <Flex
        h="72px"
        alignItems="center"
        justifyContent="center"
        bgGradient="linear(to-r, purple.700, purple.500, purple.700)"
        overflow="hidden"
        borderRadius="full"
        boxShadow="lift"
      >
        <Box h="100%" w="100%" display="flex" alignItems="center" px={6}>
          <TextPressure
            text="Put Me On. Put Me On. Put Me On. Put Me On."
            flex={true}
            alpha={false}
            stroke={false}
            width={true}
            weight={true}
            italic={true}
            textColor="#FFF3C2"
            minFontSize={60}
          />
        </Box>
      </Flex>
      <Text textAlign="center" mt={4} fontSize="sm" color="purple.700" opacity={0.7}>
        Share what you love. Discover what's next.
      </Text>
    </Container>
  );
};

export default NavBar;
