
import Home from "../../pages/Home";
import ViewVehicle from "../../pages/ViewVehicle";
import HouseIcon from '@mui/icons-material/House';
import DeleteIcon from '@mui/icons-material/Delete';
import FormatListNumberedRtlIcon from '@mui/icons-material/FormatListNumberedRtl';
import ViewReservation from "../../pages/ViewReservation";
import Reservation from "../../pages/Reservation";



const routes = [

    {
        path: '/home',
        Element: <Home />,
        text: 'Home',
        icon: <HouseIcon />

    },

    {
        path: '/reservation',
        Element: <ViewReservation />,
        text: 'ViewReservation',
        icon: <FormatListNumberedRtlIcon />
    },


    {
        path: '/vehicle',
        Element: <ViewVehicle />,
        text: 'Delete Vehicle',
        icon: <DeleteIcon />
    }

]

export default routes;