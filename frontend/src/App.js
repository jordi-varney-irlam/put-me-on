import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import { Box, Button, Heading, Text, VStack } from '@chakra-ui/react';

import NavBar from './NavBar';
import TrueBar from './TrueBar';
import HomePage from './pages/HomePage';
import CreateUserPage from './pages/CreateUserPage';
import LoginPage from './pages/LoginPage';

const NotFound = () => (
  <VStack spacing={4} py={24} textAlign="center">
    <Text fontSize="6xl">🫠</Text>
    <Heading>Nothing here</Heading>
    <Text color="gray.600">That page doesn't exist.</Text>
    <Button as={Link} to="/">
      Back home
    </Button>
  </VStack>
);

function App() {
  return (
    <Box minH="100vh" display="flex" flexDirection="column" pt={4}>
      <TrueBar />

      <Box as="main" flex="1">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/createuser" element={<CreateUserPage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Box>

      <NavBar />
    </Box>
  );
}

export default App;
