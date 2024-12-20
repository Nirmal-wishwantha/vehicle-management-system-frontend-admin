import './App.css'
import routes from './common/navigation/routes';
import { useState, useEffect } from 'react';


import * as React from 'react';
import { styled, useTheme } from '@mui/material/styles';
import Box from '@mui/material/Box';
import MuiDrawer from '@mui/material/Drawer';
import MuiAppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import List from '@mui/material/List';
import CssBaseline from '@mui/material/CssBaseline';
import Typography from '@mui/material/Typography';
import Divider from '@mui/material/Divider';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import { Navigate, Route, Routes, Link } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import { Button } from '@mui/material';



const drawerWidth = 240;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: 'hidden',
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create('width', {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: 'hidden',
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up('sm')]: {
    width: `calc(${theme.spacing(8)} + 1px)`,
  },
});

const DrawerHeader = styled('div')(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'flex-end',
  padding: theme.spacing(0, 1),
  // necessary for content to be below app bar
  ...theme.mixins.toolbar,
}));

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== 'open',
})(({ theme }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(['width', 'margin'], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  variants: [
    {
      props: ({ open }) => open,
      style: {
        marginLeft: drawerWidth,
        width: `calc(100% - ${drawerWidth}px)`,
        transition: theme.transitions.create(['width', 'margin'], {
          easing: theme.transitions.easing.sharp,
          duration: theme.transitions.duration.enteringScreen,
        }),
      },
    },
  ],
}));

const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
  ({ theme }) => ({
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    boxSizing: 'border-box',
    variants: [
      {
        props: ({ open }) => open,
        style: {
          ...openedMixin(theme),
          '& .MuiDrawer-paper': openedMixin(theme),
        },
      },
      {
        props: ({ open }) => !open,
        style: {
          ...closedMixin(theme),
          '& .MuiDrawer-paper': closedMixin(theme),
        },
      },
    ],
  }),
);



export default function App() {

  const [login, setLogin] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('login',)

    if (token) {
      setLogin(true);
    } else {
      setLogin(false);
    }

  }, [])


  return (

    <div>


      {
        login ? <Main /> : <Routes>

          <Route path='/login' element={<Login />} />
          <Route path='/register' element={<Register />} />
          <Route path='*' element={<Navigate to='/login' />} />
        </Routes>
      }



    </div>

  )
}



function Main() {
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };


  // routs............

  const getRouts = () =>
    routes.map((val, index) =>

      <Route key={index} path={val.path} element={val.Element} />

    )


  const logOut = () => {
    localStorage.removeItem('login');
    window.location.reload();

  }



  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />

      <AppBar position="fixed" open={open} sx={{ backgroundColor: '#0D47A1' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            sx={[{
              marginRight: 5,
            }, open && { display: 'none' }]}
          >
            <MenuIcon />
          </IconButton>

          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1, color: '#BBDEFB' }}>
            Riyapola Admin Dashboard
          </Typography>

          <Box sx={{ display: 'flex' }}>
            <Button
              variant="contained"
              onClick={() => logOut()}
              sx={{
                color: '#FFFFFF', 
                backgroundColor: '#C51162', 
                '&:hover': {
                  backgroundColor: '#D81B60',
                },
              }}>
              LogOut
            </Button>
          </Box>

        </Toolbar>
      </AppBar>

      <Drawer variant="permanent" open={open} sx={{ backgroundColor: '#E3F2FD' }}>
        <DrawerHeader sx={{ backgroundColor: '#BBDEFB' }}>
          <IconButton
            onClick={handleDrawerClose}
            sx={{ color: '#000000' }}>
            {theme.direction === 'rtl' ? <ChevronRightIcon /> : <ChevronLeftIcon />}
          </IconButton>
        </DrawerHeader>

        <Divider sx={{ backgroundColor: '#0D47A1' }} />


        <List>
          {routes.map((val, index) => (
            <Link key={index} to={val.path} style={{ textDecoration: 'none' }}>
              <ListItem disablePadding sx={{ display: 'block',marginBottom:1}}>
                <ListItemButton
                  sx={[
                    {
                      minHeight: 48,
                      px: 2.5,
                      borderRadius: '8px', 
                      backgroundColor: open ? '#E3F2FD' : 'transparent',
                      color: '#0D47A1',
                      '&:hover': {
                        backgroundColor: '#BBDEFB',
                        color: '#880e4f',
                      },
                    },
                    open
                      ? {
                        justifyContent: 'initial',
                      }
                      : {
                        justifyContent: 'center',
                      },
                  ]}
                >
                  <ListItemIcon
                    sx={[
                      {
                        minWidth: 0,
                        justifyContent: 'center',
                        color: 'inherit',
                      },
                      open
                        ? {
                          mr: 3,
                        }
                        : {
                          mr: 'auto',
                        },
                    ]}
                  >
                    {val.icon}
                  </ListItemIcon>
                  <ListItemText
                    primary={val.text}
                    sx={[
                      open
                        ? {
                          opacity: 1,
                          color: 'inherit',
                          fontWeight: 'bold',
                        }
                        : {
                          opacity: 0,
                        },
    
                    ]}
                  />
                </ListItemButton>
              </ListItem>
            </Link>
          ))}
        </List>

        <Divider sx={{ backgroundColor: '#0D47A1' }} />
      </Drawer>

      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <DrawerHeader />
        <Routes>
          {getRouts()}
        </Routes>
      </Box>
    </Box>

  );

}