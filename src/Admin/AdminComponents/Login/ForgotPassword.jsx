import React, { useState, useEffect, useContext } from 'react';
import { Box, Button, Input, Text, Flex, InputGroup, InputRightElement } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../contexts/AuthContext';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import axios from 'axios';

// Background image URL (replace with your image URL)
const backgroundImage = 'url(https://4kwallpapers.com/images/walls/thumbs_3t/18274.png)';

const AdminLogin = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState('');
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [resetCode, setResetCode] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const [timer, setTimer] = useState(90);
  const [canResend, setCanResend] = useState(false);

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    let interval = null;
    if (!canResend && isForgotPassword) {
      interval = setInterval(() => {
        setTimer((prev) => {
          if (prev === 1) {
            setCanResend(true);
            clearInterval(interval);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [canResend, isForgotPassword]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const response = await fetch('http://3.7.169.233:5000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(errorData.message || 'Login failed');
        return;
      }

      const data = await response.json();
      login(data.token);
      navigate('/admin/dashboard');
    } catch (error) {
      console.error('Login error:', error);
      setError('An unexpected error occurred. Please try again later.');
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post('/api/admin/forgot-password', { email });
      setMessage('Password reset code sent to your email.');
      setIsForgotPassword(true);
      setCanResend(false);
      setTimer(90); // Reset the timer
    } catch (err) {
      setMessage('Error sending password reset code.');
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match.');
      return;
    }
    try {
      await axios.post('/api/admin/reset-password', { email, resetCode, newPassword });
      setMessage('Password has been reset successfully.');
      setIsForgotPassword(false);
    } catch (err) {
      setMessage('Error resetting password.');
    }
  };

  const handleResendCode = async () => {
    if (canResend) {
      try {
        await axios.post('/api/admin/forgot-password', { email });
        setMessage('Password reset code resent to your email.');
        setCanResend(false);
        setTimer(90); // Reset the timer
      } catch (err) {
        setMessage('Error resending password reset code.');
      }
    }
  };

  return (
    <Flex
      direction="column"
      align="center"
      justify="center"
      h="100vh"
      w="100vw"
      backgroundImage={backgroundImage}
      backgroundSize="cover"
      backgroundPosition="center"
    >
      <Box
        bg="rgba(255, 255, 255, 0.8)"
        borderRadius="lg"
        p="8"
        boxShadow="lg"
        width={{ base: "90%", sm: "70%", md: "50%", lg: "30%" }}
      >
        <Text fontSize="2xl" mb="4" textAlign="center">
          {isForgotPassword ? 'Reset Password' : 'Admin Login'}
        </Text>
        {error && <Text color="red.500" mb="4" textAlign="center">{error}</Text>}
        {message && <Text color="green.500" mb="4" textAlign="center">{message}</Text>}
        <form onSubmit={isForgotPassword ? handleResetPassword : handleLogin}>
          {!isForgotPassword ? (
            <>
              <Input
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                mb="4"
                size="lg"
              />
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  mb="4"
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                mb="4"
                size="lg"
              >
                Login
              </Button>
              <Button
                variant="link"
                onClick={() => setIsForgotPassword(true)}
                size="sm"
                colorScheme="teal"
                width="full"
              >
                Forgot Password?
              </Button>
            </>
          ) : (
            <>
              <Input
                placeholder="Email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                mb="4"
                size="lg"
                isDisabled
              />
              <Input
                placeholder="Reset Code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
                mb="4"
                size="lg"
              />
              <InputGroup size="lg">
                <Input
                  type={showPassword ? 'text' : 'password'}
                  placeholder="New Password"
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  mb="4"
                />
                <InputRightElement>
                  <Button
                    variant="link"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Input
                type="password"
                placeholder="Confirm New Password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                mb="4"
                size="lg"
              />
              <Button
                type="submit"
                colorScheme="teal"
                width="full"
                mb="4"
                size="lg"
              >
                Reset Password
              </Button>
              <Button
                variant="link"
                onClick={handleResendCode}
                colorScheme="teal"
                isDisabled={!canResend}
              >
                {canResend ? 'Resend Code' : `Resend Code (${Math.floor(timer / 60)}:${timer % 60})`}
              </Button>
            </>
          )}
        </form>
        {isForgotPassword && (
          <Button
            variant="link"
            onClick={() => setIsForgotPassword(false)}
            colorScheme="teal"
            width="full"
          >
            Back to Login
          </Button>
        )}
      </Box>
    </Flex>
  );
};

export default AdminLogin;
