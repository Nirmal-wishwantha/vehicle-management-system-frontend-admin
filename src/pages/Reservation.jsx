import React, { useState } from 'react';
import { TextField, Button, Container, Typography, Box, InputAdornment } from '@mui/material';
import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import instance from '../services/AxiosOrder';


function Reservation() {



  const [email, setEmail] = useState();
  const [date, setDate] = useState();
  const [time, setTime] = useState();
  const [phone, setPhone] = useState();

  const reserve = () => {

    if (email !== '' && date !== '' && time !== '' && phone !== '') {

      const data = {
        reservationEmail: email,
        reservationDate: date,
        pickupTime: time,
        phoneNumber: phone
      }

      instance.post(`/reserve`,data)
        .then((res) => {
          console.log(res)
        })
        .catch((err) => (
          console.log(err)

        ))}


  }

  return (
    <Container maxWidth="sm" >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '50px',
          maxWidth: '600px',
          margin: '0 auto',
          padding: 3,
          boxShadow: 5,
          borderRadius: 2
        }}


      >
        <Typography component="h1" variant="h4">
          Vehicle New Reservation
        </Typography>
        <Box component="form" sx={{ mt: 3 }}>
          {/* Email Address */}
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

          {/* Reservation Date */}
          <DatePicker
            label="Reservation Date"
            onChange={(newDate) =>
              setDate((prevState) => ({
                ...prevState,
                reservationDate: newDate,
              }))
            }
            TextField={(params) => (
              <TextField
                {...params}
                required
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
          />

          {/* Pickup Time */}
          <TimePicker
            label="Pickup Time"
            onChange={(newTime) =>
              setTime((prevState) => ({
                ...prevState,
                pickupTime: newTime,
              }))
            }
            TextField={(params) => (
              <TextField
                {...params}
                required
                fullWidth
                margin="normal"
                variant="outlined"
              />
            )}
          />


          {/* Phone Number */}
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="phoneNumber"
            label="Phone Number"
            type="tel"
            onChange={(e) => setPhone(e.target.value)}

          />

          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
            onClick={() => reserve()}
          >
            Reserve Now
          </Button>
        </Box>
      </Box>
    </Container>
  );
};

export default Reservation;
