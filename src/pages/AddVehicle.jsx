import React, { useState } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import instance from '../services/AxiosOrder';

function AddVehicle() {
  const [brand, setBrand] = useState('');
  const [model, setModel] = useState('');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [image, setImage] = useState(null);

  const addVehicle = async () => {
    if (brand !== '' && model !== '' && price !== '' && description !== '') {
      const data = {
        brand: brand,
        model: model,
        price: price,
        description: description,
      };


      const res = await instance.post('/vehicle', data);
      const vehicleId = res.data.id;


      if (image) {
        await imageUpload(vehicleId);
      }


    }
  };



  const imageUpload = async (vehicleId) => {
    const formData = new FormData();
    formData.append('file', image); // Append the image file to form data

    // Upload the image
    const res = await instance.post(`/vehicle/upload/${vehicleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .catch((err) => {
        console.log(err);
      })

  };


  return (
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
        borderRadius: 2,
      }}
    >
      <Typography variant="h4" gutterBottom>
        Add New Vehicle
      </Typography>

      <form style={{ width: '100%' }} onSubmit={(e) => { e.preventDefault(); addVehicle(); }}>
        {/* Brand */}
        <TextField
          fullWidth
          label="Brand"
          variant="outlined"
          onChange={(e) => setBrand(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Model */}
        <TextField
          fullWidth
          label="Model"
          variant="outlined"
          onChange={(e) => setModel(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Price */}
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          type="number"
          onChange={(e) => setPrice(e.target.value)}
          required
          sx={{ marginBottom: 2 }}
        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          onChange={(e) => setDescription(e.target.value)}
          multiline
          rows={3}
          required
          sx={{ marginBottom: 2 }}
        />



        {/* Image Upload */}
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Upload Image
          <input
            type="file"
            hidden
            accept="image/*"
            onChange={(e) => setImage(e.target.files[0])} // Track selected image
          />
        </Button>
        {image && (
          <Typography variant="caption" display="block" sx={{ marginBottom: 2 }}>
            {image.name} {/* Show the name of the selected image */}
          </Typography>
        )}



        {/* Submit Button */}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Add Vehicle
        </Button>
      </form>
    </Box>
  );
}

export default AddVehicle;
