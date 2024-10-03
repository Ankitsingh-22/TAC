// src/Admin/ResetPassword.jsx
import React, { useState } from 'react';
import axios from 'axios';
import { Box, Button, Input, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';

const AdminResetPassword = () => {
  const [email, setEmail] = useState('');
  const [token, setToken] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleResetPassword = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/reset-password', { email, token, newPassword });
      setMessage('Password reset successfully. You can now log in.');
      navigate('/admin/login');
    } catch (err) {
      setMessage('Error resetting password.');
    }
  };

  return (
    <Box padding="5">
      <Text fontSize="2xl">Reset Password</Text>
      <form onSubmit={handleResetPassword}>
        <Input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          mb="4"
        />
        <Input
          placeholder="Reset Token"
          value={token}
          onChange={(e) => setToken(e.target.value)}
          mb="4"
        />
        <Input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          mb="4"
        />
        <Button type="submit" colorScheme="teal">Reset Password</Button>
      </form>
      {message && <Text mt="4">{message}</Text>}
    </Box>
  );
};

export default AdminResetPassword;
