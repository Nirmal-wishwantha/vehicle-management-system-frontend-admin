import React, { useState } from 'react';
import { TextField, Button, Box, Typography } from '@mui/material';

function UpdateReservation (){
  const [formData, setFormData] = useState({
    brand: '',
    model: '',
    price: '',
    description: '',
    image: null
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleImageChange = (e) => {
    setFormData({ ...formData, image: e.target.files[0] });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(formData);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: '300px', margin: 'auto' }}>
        
      <Typography variant="h6" gutterBottom>
        Update Reservation
      </Typography>
      <TextField
        label="Brand"
        name="brand"
        value={formData.brand}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        label="Model"
        name="model"
        value={formData.model}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        label="Price"
        name="price"
        type="number"
        value={formData.price}
        onChange={handleInputChange}
        fullWidth
        required
      />
      <TextField
        label="Description"
        name="description"
        value={formData.description}
        onChange={handleInputChange}
        multiline
        rows={4}
        fullWidth
      />
      <Button
        variant="contained"
        component="label"
      >
        Upload Image
        <input
          type="file"
          name="image"
          onChange={handleImageChange}
          hidden
        />
      </Button>
      <Button type="submit" variant="contained" color="primary">
        Update Reservation
      </Button>
    </Box>
  );
};

export default UpdateReservation;
