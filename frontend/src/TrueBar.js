import React from 'react';
import {
  Avatar,
  Box,
  Button,
  Container,
  Flex,
  HStack,
  Menu,
  MenuButton,
  MenuItem,
  MenuList,
  Text,
  useToast,
} from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from './context/AuthContext';

const TrueBar = () => {
  const { isLoggedIn, user, logout } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = () => {
    logout();
    toast({ title: 'Logged out', description: 'See you soon 👋', status: 'info', duration: 2500 });
    navigate('/');
  };

  return (
    <Box position="sticky" top={4} zIndex={10} mb={8}>
      <Container maxW="1140px" px={4}>
        <Flex
          h="68px"
          alignItems="center"
          justifyContent="space-between"
          px={{ base: 4, md: 6 }}
          borderRadius="full"
          bg="rgba(255, 255, 255, 0.72)"
          backdropFilter="saturate(180%) blur(14px)"
          border="1px solid"
          borderColor="whiteAlpha.800"
          boxShadow="soft"
        >
          <HStack as={Link} to="/" spacing={2} _hover={{ textDecoration: 'none' }}>
            <Text fontSize={{ base: '22px', sm: '26px' }} lineHeight={1}>
              📣
            </Text>
            <Text
              fontSize={{ base: '20px', sm: '26px' }}
              fontWeight={800}
              letterSpacing="-0.02em"
              textTransform="uppercase"
              bgGradient="linear(to-r, purple.600, purple.400, butter.600)"
              bgClip="text"
            >
              Put Me On
            </Text>
          </HStack>

          {isLoggedIn ? (
            <Menu placement="bottom-end">
              <MenuButton
                as={Button}
                variant="ghost"
                px={2}
                leftIcon={<Avatar size="sm" name={user?.username} bg="purple.500" color="white" />}
              >
                <Text display={{ base: 'none', sm: 'inline' }}>{user?.username || 'Account'}</Text>
              </MenuButton>
              <MenuList borderRadius="xl" boxShadow="lift">
                <MenuItem onClick={handleLogout}>Log out</MenuItem>
              </MenuList>
            </Menu>
          ) : (
            <HStack spacing={2}>
              <Button as={Link} to="/createuser" variant="ghost" size={{ base: 'sm', sm: 'md' }}>
                Sign up
              </Button>
              <Button as={Link} to="/login" size={{ base: 'sm', sm: 'md' }} boxShadow="soft">
                Log in
              </Button>
            </HStack>
          )}
        </Flex>
      </Container>
    </Box>
  );
};

export default TrueBar;
