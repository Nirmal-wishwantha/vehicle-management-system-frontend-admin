
import Home from "../../pages/Home";
import ViewVehicle from "../../pages/ViewVehicle";
import HouseIcon from '@mui/icons-material/House';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import ViewReservation from "../../pages/ViewReservation";
import Reservation from "../../pages/Reservation";
import DirectionsCarFilledRoundedIcon from '@mui/icons-material/DirectionsCarFilledRounded';
import RejectReserve from "../../pages/RejectReserve";
import ApproveReserve from "../../pages/approveReserve";
import GppBadRoundedIcon from '@mui/icons-material/GppBadRounded';
import BeenhereRoundedIcon from '@mui/icons-material/BeenhereRounded';



const routes = [

    // {
    //     path: '/home',
    //     Element: <Home />,
    //     text: 'Home',
    //     icon: <HouseIcon />

    // },

    {
        path: '/reservation',
        Element: <ViewReservation />,
        text: 'ViewReservation',
        icon: <FormatListNumberedRtlIcon />
    },
 
    {
        path: '/approve',
        Element: <ApproveReserve/>,
        text: 'Approve Reserve',
        icon: <BeenhereRoundedIcon/>
    },

    {
        path: '/reject',
        Element: <RejectReserve />,
        text: 'Reject Reserve',
        icon: <GppBadRoundedIcon/>
    },

    {
        path: '/vehicle',
        Element: <ViewVehicle />,
        text: 'Vehicle Manage',
        icon: <DirectionsCarFilledRoundedIcon />
    },


]

export default routes;