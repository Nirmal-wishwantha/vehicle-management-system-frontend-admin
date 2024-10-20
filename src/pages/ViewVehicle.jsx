import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import instance from '../services/AxiosOrder';
import ProfileCard from '../component/profile/ProfileCard';
import { Toast } from '../common/funtion';
import { Typography, Dialog, DialogTitle, DialogContent, TextField, DialogActions, Button } from '@mui/material';

import { DatePicker, TimePicker } from '@mui/x-date-pickers';
import AddVehicle from './AddVehicle';


export default function ViewVehicle() {
  const [vahicle, setVahicle] = useState([]);

  const [vehicleImages, setVehicleImages] = useState({});

  useEffect(() => {
    loadData();

    return () => {
      Object.values(vehicleImages).forEach(imageUrl => {
        URL.revokeObjectURL(imageUrl);
      });
    };
  }, []);



  const loadData = () => {
    instance.get('/vehicle')
      .then((res) => {
        setVahicle(res.data);


        res.data.forEach(vehicle => {
          getimg(vehicle.id);
        });
      })
      .catch((err) => {
        console.log(err);
      });
  };



  const getimg = (id) => {
    instance.get(`vehicle/get/image/${id}`, { responseType: 'blob' })
      .then((res) => {
        const imageUrl = URL.createObjectURL(res.data);

        // Set image URL for the specific vehicle ID
        setVehicleImages(prevImages => ({
          ...prevImages,
          [id]: imageUrl // Associate the image with the vehicle ID
        }));
      })
      .catch((err) => {
        console.log(err);
      });
  };



  // lord vehicle


  //  async function loadData() {
  //     try {
  //         const details = await instance('/vehicle');
  //         setVahicle(details.data);
  //         console.log("Vehicle data:", details.data);

  //         const images = await Promise.all(
  //             details.data.map(async (vehicle) => {
  //                 try {
  //                     const response = await instance.get(`http://localhost:8080/upload/get/image/${vehicle.id}`);
  //                     return { ...vehicle, image: response.data }; // Include image data with vehicle details
  //                 } catch (error) {
  //                     console.error(`Failed to fetch image for vehicle ID: ${vehicle.id}`, error);
  //                     if (error.response && error.response.status === 404) {
  //                         return { ...vehicle, image: null }; // Handle missing images
  //                     }
  //                     throw error; // Rethrow if it's not a 404
  //                 }
  //             })
  //         );

  //         console.log("Images with vehicle details:", images);
  //         setVahicle(images);

  //     } catch (err) {
  //         console.error("Error loading data:", err);
  //     }
  // }


  // vehicle delete

  const deleteVehicle = (vehicleId) => {
    instance.delete(`/vehicle/${vehicleId}`)
      .then((res) => {
        console.log(res);
        setVahicle(prevVahicle => prevVahicle.filter(val => val.id !== vehicleId));
        Toast.fire({
          icon: "success",
          title: "Deleted Successfully!"
        });

        loadData();

      })
      .catch((err) => {
        console.log(err);
        Toast.fire({
          icon: "error",
          title: "Delete Failed!"
        });
      });
  };


  // vehicle reservation

  const [open, setOpen] = useState(false);
  const [selectedVehicleId, setSelectedVehicleId] = useState(null);

  const [email, setEmail] = useState('');
  const [date, setDate] = useState(null);
  const [time, setTime] = useState(null);
  const [phone, setPhone] = useState('');


  const handleReserveOpen = (vehicleId) => {
    setSelectedVehicleId(vehicleId);
    setOpen(true);
  };

  const handleReserveClose = () => {
    setOpen(false);
    setSelectedVehicleId(null);
  };

  const reserveVehicle = () => {
    if (email && date && time && phone) {
      const data = {
        reservationEmail: email,
        reservationDate: date.format('YYYY-MM-DD'),
        pickupTime: time.format('HH:mm'),
        phoneNumber: phone,
      };

      instance.post(`/reserve/${selectedVehicleId}`, data)
        .then((res) => {
          console.log(res);
          Toast.fire({
            icon: "success",
            title: "Reservation Successful..!"
          });
          handleReserveClose();
        })
        .catch((err) => {
          console.log(err);

          Toast.fire({
            icon: "error",
            title: "Reservation Failed..!"
          });
        });
    }
  };


  // update vehicle dialog

  const [openUpdate, setOpenUpdate] = useState(false);
  const [selectedVehicle, setSelectedVehicle] = useState(null);

  const handleUpdateOpen = (vehicle) => {
    setSelectedVehicle(vehicle);
    setOpenUpdate(true);
  };

  const handleUpdateClose = () => {
    setOpenUpdate(false);
    setSelectedVehicle(null);
  };


  // Update Vehicle Function
  const vehicleUpdate = () => {
    if (selectedVehicle.brand && selectedVehicle.model && selectedVehicle.price && selectedVehicle.description) {
      const data = {
        brand: selectedVehicle.brand,
        model: selectedVehicle.model,
        price: selectedVehicle.price,
        description: selectedVehicle.description
      };

      instance.put(`/vehicle/${selectedVehicle.id}`, data)
        .then((res) => {
          Toast.fire({
            icon: "success",
            title: "Vehicle Updated Successfully..!"
          });

          imageUpload(selectedVehicle.id);
          handleUpdateClose();

          loadData();

        })
        .catch((err) => {
          Toast.fire({
            icon: "error",
            title: "Vehicle Update Failed!"
          });
        });

    } else {
      Toast.fire({
        icon: "warning",
        title: "Please fill all the fields!"
      });
    }
  };






  // image update

  const [image, setImage] = useState(null);

  const imageUpload = async (vehicleId) => {
    const formData = new FormData();
    formData.append('file', image); // Append the image file to form data

    // Update the image
    const res = await instance.put(`/vehicle/update/image/${vehicleId}`, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
    })
      .catch((err) => {
        console.log(err);
      })

  };





  const handleFieldChange = (field, value) => {
    setSelectedVehicle((prev) => ({
      ...prev,
      [field]: value
    }));
  };
  return (
    <div>
      <Box sx={{ position: 'sticky', top: 67, backgroundColor: 'blue', zIndex: 1, color: 'whitesmoke', borderRadius: 1 }}>
        <Typography variant="h4" align="center" gutterBottom>
          Vehicles Update and Delete
        </Typography>
      </Box>

      <Box sx={{ margin: 1 }}>
        <AddVehicle />
      </Box>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 2, justifyContent: 'center' }}>
        {vahicle.map((vahicle, index) => (
          <ProfileCard
            number={index + 1}
            key={index}
            brand={vahicle.brand}
            model={vahicle.model}
            price={vahicle.price}
            description={vahicle.description}
            imageUrl={vehicleImages[vahicle.id]}
            onDelete={() => deleteVehicle(vahicle.id)}
            onUpdate={() => handleUpdateOpen(vahicle)}
            onReserve={() => handleReserveOpen(vahicle.id)}


          />
        ))}
      </Box>

      {/* Dialog for Reservation */}
      <Dialog open={open} onClose={handleReserveClose}>
        <DialogTitle>Reserve Vehicle</DialogTitle>
        <DialogContent>
          <TextField
            fullWidth
            label="Email"
            margin="normal"
            autoComplete='email'
            onChange={(e) => setEmail(e.target.value)}
          />
          <DatePicker
            label="Reservation Date"
            value={date}
            onChange={setDate}
            TextField={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          <TimePicker
            label="Pickup Time"
            value={time}
            onChange={setTime}
            TextField={(params) => <TextField {...params} fullWidth margin="normal" />}
          />
          <TextField
            fullWidth
            label="Phone Number"
            margin="normal"
            onChange={(e) => setPhone(e.target.value)}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleReserveClose} color="secondary">Cancel</Button>
          <Button onClick={reserveVehicle} color="primary">Reserve Now</Button>
        </DialogActions>
      </Dialog>



      {/* Dialog for Update Vehicle */}
      {selectedVehicle && (
        <Dialog open={openUpdate} onClose={handleUpdateClose}>
          <DialogTitle>Update Vehicle</DialogTitle>
          <DialogContent>
            <TextField
              fullWidth
              label="Brand"
              margin="normal"
              value={selectedVehicle.brand}
              onChange={(e) => handleFieldChange('brand', e.target.value)}
            />
            <TextField
              fullWidth
              label="Model"
              margin="normal"
              value={selectedVehicle.model}
              onChange={(e) => handleFieldChange('model', e.target.value)}
            />
            <TextField
              fullWidth
              label="Price"
              margin="normal"
              type="number"
              value={selectedVehicle.price}
              onChange={(e) => handleFieldChange('price', e.target.value)}
            />
            <TextField
              fullWidth
              label="Description"
              margin="normal"
              multiline
              rows={3}
              value={selectedVehicle.description}
              onChange={(e) => handleFieldChange('description', e.target.value)}
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
                onChange={(e) => setImage(e.target.files[0])}
              />
            </Button>
            {image && (
              <Typography variant="caption" display="block" sx={{ marginBottom: 2 }}>
                {image.name} {/* Show the name of the selected image */}
              </Typography>
            )}










          </DialogContent>
          <DialogActions>
            <Button onClick={handleUpdateClose} color="secondary">Cancel</Button>
            <Button onClick={vehicleUpdate} color="primary">Update Vehicle</Button>
          </DialogActions>
        </Dialog>
      )}

    </div>
  );
}
