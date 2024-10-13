import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, Box } from '@mui/material';
import { Toast } from '../common/funtion';
import instance from '../services/AxiosOrder';

function UpdateVehicle() {

  const [brand, setBrand] = useState();
  const [model, setModel] = useState();
  const [price, setPrice] = useState();
  const [discription, setDiscription] = useState();
  const [image, setImage] = useState();
  
const vehicleUpdate=()=>{
  if (brand !== '' && model !== "" && price !== '' && discription !== '') {
    const data = {
      brand: brand,
      model: model,
      price: price,
      description: discription
    }

    instance.put('/vehicle', data)
      .then((res) => {
        console.log(res.data);
        Toast.fire({
          icon: "success",
          title: "Vehicle Update successfully"
        });

      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Vehicle Update Faild..!"
        });
      })
  }

  

}

 


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        marginTop: '50px',
        maxWidth: '600px',
        margin: '0 auto',
      }}
    >
      
      <Typography variant="h4" gutterBottom>
        Update Vehicle
      </Typography>

      <form style={{ width: '100%' }}>
        {/* Brand */}
        <TextField
          fullWidth
          label="Brand"
          variant="outlined"
          name="brand"
          required
          sx={{ marginBottom: 2 }}
          onChange={(e)=>setBrand(e.target.value)}
        />

        {/* Model */}
        <TextField
          fullWidth
          label="Model"
          variant="outlined"
          name="model"
          required
          sx={{ marginBottom: 2 }}
          onChange={(e)=>setModel(e.target.value)}

        />

        {/* Price */}
        <TextField
          fullWidth
          label="Price"
          variant="outlined"
          name="price"
          type="number"
          required
          sx={{ marginBottom: 2 }}
          onChange={(e)=>setPrice(e.target.value)}

        />

        {/* Description */}
        <TextField
          fullWidth
          label="Description"
          variant="outlined"
          name="description"
          multiline
          rows={3}
          required
          sx={{ marginBottom: 2 }}
          onChange={(e)=>setDiscription(e.target.value)}

        />

        {/* Image Upload */}
        <Button
          variant="contained"
          component="label"
          fullWidth
          sx={{ marginBottom: 2 }}
        >
          Upload Image
          <input type="file" hidden 
          // onChange={handleImageUpload}
           accept="image/*" />
        </Button>
        {
        // vehicleData.image && 
        (
          <Typography variant="caption" display="block" sx={{ marginBottom: 2 }}>
            {/* {vehicleData.image.name} */}
          </Typography>
        )}

        {/* Submit Button */}
        <Button 
        type="submit" 
        variant="contained" 
        color="primary" 
        fullWidth 
        onClick={()=>vehicleUpdate()}>
          Update Vehicle
        </Button>
      </form>
    </Box>
  );
}

export default UpdateVehicle;
