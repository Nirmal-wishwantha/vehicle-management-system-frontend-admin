import { TableRow, TableCell, Button } from '@mui/material';

export default function ReservationRow({ number, reservationDate, reservationEmail,
   reservationPhoneNumber, reservationPickupTime, reservationVehicleId, reservationId,Approve,Reject }) {
  return (
    <TableRow>
      <TableCell align='center'>{number}</TableCell>
      <TableCell align='center'>{reservationId}</TableCell>
      <TableCell align='center'>{reservationDate}</TableCell>
      <TableCell align='center'>{reservationEmail}</TableCell>
      <TableCell align='center'>{reservationPickupTime}</TableCell>
      <TableCell align='center'>{reservationPhoneNumber}</TableCell>
      <TableCell align='center'>{reservationVehicleId}</TableCell>
      <TableCell align="center">
        <Button variant="contained" color="success" sx={{ marginRight: 1 }}
        onClick={Approve}
        >
          Approve
        </Button>
        <Button variant="contained" color="error"
        onClick={Reject}
        >
          Reject
        </Button>
      </TableCell>
    </TableRow>
  );
}
