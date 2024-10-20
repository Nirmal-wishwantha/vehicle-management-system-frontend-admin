import { TableRow, TableCell, Button } from '@mui/material';

export default function ReservationRow({ number, reservationDate, reservationEmail,
  reservationPhoneNumber, reservationPickupTime, reservationVehicleId, reservationId, Approve, Reject,adminStatus,
disableApprove,disableReject}) {
  return (
    <TableRow>
      <TableCell align='center'>{number}</TableCell>
      <TableCell align='center'>{reservationId}</TableCell>
      <TableCell align='center'>{reservationDate}</TableCell>
      <TableCell align='center'>{reservationEmail}</TableCell>
      <TableCell align='center'>{reservationPickupTime}</TableCell>
      <TableCell align='center'>{reservationPhoneNumber}</TableCell>
      <TableCell align='center'>{reservationVehicleId}</TableCell>
      <TableCell align='center'>{adminStatus}</TableCell>

      <TableCell align='center'>


        <Button
          variant="contained"
          color="success"
          sx={{ margin: 1 }}
          onClick={Approve}
          disabled={disableApprove}
        >
          Approve
        </Button>

        <Button
          variant="contained"
          color="error"
          onClick={Reject}
          disabled={disableReject}
        >
          Reject
        </Button>

      </TableCell>
    </TableRow>
  );
}
