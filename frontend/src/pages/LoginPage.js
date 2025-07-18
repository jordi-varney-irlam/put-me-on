import React, { useState } from 'react';
import { Box, Input, Button, VStack, Heading } from '@chakra-ui/react';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const res = await fetch('http://localhost:5001/api/auth/login', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ username, password }),
            });

            const data = await res.json();

            if (res.ok) {
                alert('Login successful!');
                console.log('Token:', data.token);

                localStorage.setItem('token', data.token);

                setUsername('');
                setPassword('');
            } else {
                alert(data.message || 'Login failed');
            }
        } catch (err) {
            alert('An error occurred: ' + err.message);
        }
    };
    
    return (
        <Box maxW="md" mx="auto" mt={8} p={4} borderWidth={1} borderRadius="lg">
          <Heading size="md" mb={4}>Login</Heading>
          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <Input
                placeholder="Username"
                value={username}
                onChange={e => setUsername(e.target.value)}
                required
              />
              <Input
                placeholder="Password"
                type="password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
              />
              <Button colorScheme="teal" type="submit" width="100%">
                Log In
              </Button>
            </VStack>
          </form>
        </Box>
      );
    };
    
    export default LoginPage;