import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box } from '@mui/material';
import instance from '../services/AxiosOrder';
import { Link, useNavigate } from 'react-router-dom'
import { Toast } from '../common/funtion';



function Login() {

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const loginData = () => {

    if (email !== '' && password !== "") {
      const data = {
        email: email,
        password: password
      }
      instance.post('/user/login', data)
        .then((res) => {
          console.log(res.data.token)
          localStorage.setItem('login',res.data.token)
          Toast.fire({
            icon: "success",
            title: "Login in successfully"
          });

          setTimeout(() => {
            window.location.reload()
          }, 2000);
        })
        .catch((err) => {
          console.log(err)
          Toast.fire({
            icon: "error",
            title: "Login in Faild"
          });
        })
    } else {
      Toast.fire({
        icon: "error",
        title: "Invalid Detaisl"
      });
    }


  }


  // const loginData = () => {

  //   instance.post('/user/login', {
  //     email: email,
  //     password: password
  //   })
  //     .then(function (response) {
  //       console.log(response);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //     });

  // }


  return (
    <Container maxWidth="xs">

      <Box sx={{ boxShadow: 8, padding: 3, borderRadius: 2 }}>
        <Box
          sx={{
            marginTop: 1,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box component="form" sx={{ mt: 1 }}>
            <TextField
              variant="outlined"
              margin="normal"
              required
              fullWidth
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
              autoComplete="current-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />

            <Link to={'/register'} style={{ textDecoration: 'none', color: 'black' }}>
              <Typography

              >
                Register
              </Typography>
            </Link>

            <Button
              // type="submit"
              fullWidth
              variant="contained"
              color="primary"
              sx={{ mt: 3, mb: 2 }}
              onClick={loginData}
            >
              Sign In
            </Button>
          </Box>
        </Box>

      </Box>
    </Container>
  );
};

export default Login;
