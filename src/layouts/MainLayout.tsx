import { Box, Typography } from '@mui/material';
import { NavLink, Outlet, useNavigate } from 'react-router';
import logo from '/Logo.png';

function MainLayout() {
  const navigate = useNavigate();
  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <Box
        component="header"
        sx={{
          px: 8,
          py: 2,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          borderBottom: '1px solid',
          borderColor: 'divider',
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
        <Box sx={{ display: 'flex', gap: '2rem' }}>
          <NavLink to="/account" style={{ textDecoration: 'none' }}>
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
                Akun
              </Typography>
            )}
          </NavLink>
        </Box>
      </Box>

      <Box component="main" sx={{ flexGrow: 1, width: '100%', p: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
