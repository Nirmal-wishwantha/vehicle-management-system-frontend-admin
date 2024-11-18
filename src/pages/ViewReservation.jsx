import React, { useEffect, useState } from 'react';
import instance from '../services/AxiosOrder';
import { Box, Typography, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import ReservationRow from '../component/reservationTable/ReservasionTable'
import { Approval } from '@mui/icons-material';

export default function ViewReservation() {
    const [reservations, setReservations] = useState([]);

    useEffect(() => {
        Reservations();
    }, []);

    const Reservations = () => {
        instance.get('/reserve')
            .then((res) => {
                console.log(res.data);
                setReservations(res.data);
            })
            .catch((err) => {
                console.error(err);
            });
    };


    // Approval
    const reservationsApprove = (id) => {
        instance.post(`/admin/approve/${id}`)
            .then((res) => {
                console.log(res);

                setReservations(prev =>
                    prev.map(reservation =>
                        reservation.id === id
                            ? { ...reservation, disableApprove: true, disableReject: false } // Approve is disabled, Reject is enabled
                            : reservation
                    )
                );

            })
            .catch((err) => {
                console.log(err)
            })
    }

    // reject
    const reservationsReject = (id) => {
        instance.post(`/admin/reject/${id}`)
            .then((res) => {
                console.log(res);


                setReservations(prev =>
                    prev.map(reservation =>
                        reservation.id === id
                            ? { ...reservation, disableApprove: false, disableReject: true } // Reject is disabled, Approve is enabled
                            : reservation
                    )
                );
            })

            .catch((err) => {
                console.log(err)
            })
    }






    return (
        <div>
            <Box>

                <Box sx={{ position: 'sticky', top: 67, backgroundColor: 'blue', zIndex: 1, color: 'whitesmoke', borderRadius: 1 }}>
                    <Typography variant="h4" align="center" gutterBottom >
                        All Reservations
                    </Typography>
                </Box>


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
                                <TableCell align="center">Actions</TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {reservations.map((val, index) => (
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
                                    Approve={() => reservationsApprove(val.id)}
                                    Reject={() => reservationsReject(val.id)}
                                    disableApprove={val.disableApprove}
                                    disableReject={val.disableReject}
                                />
                            ))}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Box>
        </div>
    );
}
