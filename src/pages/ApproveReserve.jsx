import React, { useEffect, useState } from 'react'
import { Box, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ReservationRow from '../component/reservationTable/ReservasionTable'
import instance from '../services/AxiosOrder';



export default function ApproveReserve() {

    const [approve, setApprove] = useState([]);


    useEffect(() => {
        rejectList();
    }, []);


    const rejectList = () => {
        instance.get('/admin/approve/get')
            .then((res) => {
                setApprove(res.data);
                console.log(res.data);

            })
            .catch((err) => {
                console.log(err)
            })
    }


    return (
        <div>
            <Box>

                <TableContainer component={Paper} sx={{ marginTop: '20px', maxWidth: '100%', margin: 'auto', boxShadow: 5 }}>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell align='center'>No</TableCell>
                                <TableCell align='center'>Reserved ID</TableCell>
                                <TableCell align='center'>Reservation Date</TableCell>
                                <TableCell align='center'>Email</TableCell>
                                <TableCell align='center'>Pickup Time</TableCell>
                                <TableCell align='center'>Phone Number</TableCell>
                                <TableCell align='center'>Vehicle ID</TableCell>
                                <TableCell align='center'>Status</TableCell>
                                <TableCell align='center'>Action</TableCell>
                                
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {approve.map((val, index) => (
                                <ReservationRow
                                key={index}
                                number={index + 1}
                                reservationId={val.id}
                                reservationDate={val.reservationDate}
                                reservationEmail={val.reservationEmail}
                                reservationPhoneNumber={val.phoneNumber}
                                reservationPickupTime={val.pickupTime}
                                reservationVehicleId={val.vehicleId}
                                adminStatus={val.reservationStatus}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>





            </Box>
        </div>
    )
}
