import { Box, Typography } from '@mui/material';
import logo from '/Logo.png';
import { NavLink, useNavigate } from 'react-router';
import SideBar from './SideBar.tsx';

interface NavProps {
  title: string;
  path: string;
}

function NavBar() {
  const navigate = useNavigate();

  const listNavigation: NavProps[] = [
    { title: 'Top Up', path: '/top-up' },
    { title: 'Transaction', path: '/transaction' },
    { title: 'Akun', path: '/account' },
  ];
  return (
    <Box
      sx={{
        px: { xs: 2, sm: 4, md: 12 },
        py: 2,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundColor: 'white',
        zIndex: 1,
        borderBottom: '1px solid',
        borderColor: 'divider',
        position: 'fixed',
        left: 0,
        right: 0,
        top: 0,
      }}
    >
      <Box
        sx={{
          display: 'flex',
          gap: '.5rem',
          alignItems: 'center',
          cursor: 'pointer',
        }}
        onClick={() => navigate('/')}
      >
        <Box
          component="img"
          src={logo}
          alt="logo"
          sx={{ width: '1.5rem', height: '1.5rem' }}
        />
        <Typography variant="h6" sx={{ fontWeight: '600' }}>
          SIMS PPOB
        </Typography>
      </Box>
      <Box
        sx={{
          display: { xs: 'none', md: 'flex' },
          gap: '2rem',
        }}
      >
        {listNavigation.map((item, index) => (
          <NavLink
            to={item.path}
            style={{ textDecoration: 'none' }}
            key={index}
          >
            {({ isActive }) => (
              <Typography
                variant="subtitle1"
                sx={{
                  fontWeight: isActive ? '600' : '500',
                  color: isActive ? 'primary.main' : 'black',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    color: 'primary.main',
                    cursor: 'pointer',
                  },
                }}
              >
                {item.title}
              </Typography>
            )}
          </NavLink>
        ))}
      </Box>
      <Box
        sx={{
          display: { xs: 'block', md: 'none' },
        }}
      >
        <SideBar />
      </Box>
    </Box>
  );
}

export default NavBar;
