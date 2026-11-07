import React from 'react';
import { Link as ChakraLink, useToast } from '@chakra-ui/react';
import { Link, useNavigate } from 'react-router-dom';
import AuthForm from '../components/AuthForm';
import { apiFetch } from '../api';
import { useAuth } from '../context/AuthContext';

const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogin = async ({ username, password }) => {
    try {
      const data = await apiFetch('/api/auth/login', { method: 'POST', body: { username, password } });
      login(data.token, data.user);
      toast({ title: `Welcome back, ${data.user.username}!`, status: 'success', duration: 2500 });
      navigate('/');
    } catch (err) {
      toast({ title: 'Login failed', description: err.message, status: 'error' });
    }
  };

  return (
    <AuthForm
      emoji="👋"
      title="Welcome back"
      subtitle="Log in to share your recommendations"
      submitLabel="Log in"
      onSubmit={handleLogin}
      footer={
        <>
          New here?{' '}
          <ChakraLink as={Link} to="/createuser" color="purple.600" fontWeight={600}>
            Create an account
          </ChakraLink>
        </>
      }
    />
  );
};

export default LoginPage;
