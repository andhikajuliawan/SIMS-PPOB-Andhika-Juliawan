import * as React from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import MenuIcon from '@mui/icons-material/Menu';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import { useLocation, useNavigate } from 'react-router';

interface NavProps {
  title: string;
  path: string;
}

function SideBar() {
  const [open, setOpen] = React.useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const listNavigation: NavProps[] = [
    { title: 'Top Up', path: '/top-up' },
    { title: 'Transaction', path: '/transaction' },
    { title: 'Akun', path: '/account' },
  ];

  const toggleDrawer = (newOpen: boolean) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box
      sx={{ width: 250 }}
      role="presentation"
      onClick={toggleDrawer(false)}
    >
      <List>
        {listNavigation.map((navigation, index) => {
          const isActive = location.pathname === navigation.path;

          return (
            <ListItem key={index} disablePadding>
              <ListItemButton
                onClick={() => navigate(navigation.path)}
                selected={isActive}
              >
                <ListItemText>
                  <Typography
                    sx={{
                      fontWeight: isActive ? '600' : '500',
                      color: isActive ? 'primary.main' : 'black',
                    }}
                  >
                    {navigation.title}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );

  return (
    <div>
      <IconButton onClick={toggleDrawer(true)}>
        <MenuIcon />
      </IconButton>
      <Drawer open={open} onClose={toggleDrawer(false)}>
        {DrawerList}
      </Drawer>
    </div>
  );
}

export default SideBar;
