import React from 'react'
import AddVehicle from './AddVehicle'
import Reservation from './Reservation'
import UpdateVehicle from './Updatevehicle'
import { Margin } from '@mui/icons-material'
import { Box } from '@mui/material'
import ProfileCard from '../component/profile/ProfileCard'
import ViewVehicle from './ViewVehicle'
import ViewReservation from './ViewReservation'


export default function Home() {
  return (
    <div>

      <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center' }}>

        <ViewReservation/>

       

      </Box>
    </div>
  )
}
