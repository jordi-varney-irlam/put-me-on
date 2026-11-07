import React from 'react';
import { Link as ChakraLink, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { apiFetch } from '../api';
import { useAuth } from '../context/AuthContext';

const CreateUserPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleRegister = async ({ username, password }) => {
    try {
      await apiFetch('/api/auth/register', { method: 'POST', body: { username, password } });
    } catch (err) {
      toast({ title: "Couldn't create account", description: err.message, status: 'error' });
      return;
    }

    // Log the new user straight in so they can start posting.
    try {
      const data = await apiFetch('/api/auth/login', { method: 'POST', body: { username, password } });
      login(data.token, data.user);
      toast({ title: `Welcome, ${data.user.username}! 🎉`, status: 'success', duration: 3000 });
      navigate('/');
    } catch {
      toast({ title: 'Account created!', description: 'Please log in.', status: 'success' });
      navigate('/login');
    }
  };

  return (
    <AuthForm
      emoji="✨"
      title="Join Put Me On"
      subtitle="Share the movies, music, places and more you love"
      submitLabel="Create account"
      onSubmit={handleRegister}
      footer={
        <>
          Already have an account?{' '}
          <ChakraLink as={Link} to="/login" color="purple.600" fontWeight={600}>
            Log in
          </ChakraLink>
        </>
      }
    />
  );
};

export default CreateUserPage;
