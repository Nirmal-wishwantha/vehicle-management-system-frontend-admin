import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import { Link, useNavigate } from 'react-router-dom';
import instance from '../services/AxiosOrder';

import { Toast } from '../common/funtion';

export default function Register() {

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const navigate = useNavigate();
  


  const RegisterData = () => {

    if (name !== '' && email !== '' && phone !== '' && password !== '' && confirmPassword !== '') {
      console.log(true);

      if (password == confirmPassword) {
        console.log(true);
        const data = {
          name: name,
          email: email,
          phone: phone,
          password: password
        }
        instance.post('/user/register', data)
          .then((res) => {
            Toast.fire({
              icon: "success",
              title: "Register in successfully"
            });

            setTimeout( ()=> {
              navigate('/login');
            }, 2000);
            
            
          })
          .catch((err) => {
            Toast.fire({
              icon: "error",
              title: "Register in Error..!"
            })
          });

      } else {
        Toast.fire({
          icon: "error",
          title: "Confirm Password Invalid..!"
        });
      }


    } else {
      Toast.fire({
        icon: "error",
        title: "Invalid Details..!"
      });
    }

  }

  return (
    <Container maxWidth="xs">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Typography component="h1" variant="h5">
          Register
        </Typography>
        <Box component="form"

          sx={{ mt: 1 }}>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="name"
            label="Name"
            name="name"
            autoComplete="name"
            autoFocus
            onChange={(e) => setName(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            autoComplete="email"
            onChange={(e) => setEmail(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="phone"
            label="Phone Number"
            name="phone"
            autoComplete="phone"
            onChange={(e) => setPhone(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="new-password"
            onChange={(e) => setPassword(e.target.value)}
          />

          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label="Confirm Password"
            type="password"
            id="confirmPassword"
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <Link to={'/login'} style={{ textDecoration: 'none', color: 'black' }}>
            <Typography>
              Login
            </Typography>
          </Link>

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={()=>RegisterData()}
          >
            Register
          </Button>
        </Box>
      </Box>
    </Container>
  );
};


