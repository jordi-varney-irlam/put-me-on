import React, { useState } from 'react';
import {
  Box,
  Button,
  FormControl,
  FormHelperText,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  VStack,
} from '@chakra-ui/react';
import { motion } from 'framer-motion';

const MotionBox = motion(Box);

/**
 * Shared card + username/password form used by the login and sign-up pages.
 * `onSubmit({ username, password })` should return a promise.
 */
const AuthForm = ({ emoji, title, subtitle, submitLabel, onSubmit, footer, passwordHelper }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await onSubmit({ username: username.trim(), password });
    } finally {
      setLoading(false);
    }
  };

  return (
    <MotionBox
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      maxW="420px"
      mx="auto"
      mt={{ base: 4, md: 12 }}
      px={4}
    >
      <Box bg="white" borderRadius="card" boxShadow="lift" overflow="hidden">
        <Box h="8px" bgGradient="linear(to-r, purple.500, butter.400)" />
        <Box p={{ base: 6, md: 8 }}>
          <VStack spacing={1} mb={6} textAlign="center">
            <Text fontSize="4xl">{emoji}</Text>
            <Heading size="lg" letterSpacing="-0.02em">
              {title}
            </Heading>
            {subtitle && <Text color="gray.500">{subtitle}</Text>}
          </VStack>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isRequired>
                <FormLabel>Username</FormLabel>
                <Input
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  autoComplete="username"
                  autoFocus
                  size="lg"
                  borderRadius="xl"
                />
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Password</FormLabel>
                <InputGroup size="lg">
                  <Input
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    autoComplete={submitLabel === 'Log in' ? 'current-password' : 'new-password'}
                    borderRadius="xl"
                  />
                  <InputRightElement>
                    <IconButton
                      size="sm"
                      variant="ghost"
                      aria-label={showPassword ? 'Hide password' : 'Show password'}
                      icon={<span>{showPassword ? '🙈' : '👁️'}</span>}
                      onClick={() => setShowPassword((s) => !s)}
                    />
                  </InputRightElement>
                </InputGroup>
                {passwordHelper && <FormHelperText>{passwordHelper}</FormHelperText>}
              </FormControl>
              <Button type="submit" width="100%" size="lg" isLoading={loading} mt={2} boxShadow="soft">
                {submitLabel}
              </Button>
            </VStack>
          </form>

          {footer && (
            <Box mt={6} textAlign="center" fontSize="sm" color="gray.600">
              {footer}
            </Box>
          )}
        </Box>
      </Box>
    </MotionBox>
  );
};

export default AuthForm;
