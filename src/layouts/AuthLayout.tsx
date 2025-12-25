import { Box, Grid } from '@mui/material';
import backgroundLogin from '/assets/login/background-login.png';
import { Outlet } from 'react-router';

function AuthLayout() {
  return (
    <Grid
      container
      sx={{
        height: '100vh',
        width: '100vw',
        overflow: 'hidden',
        m: 0,
        p: 0,
      }}
    >
      <Grid size={{ xs: 12, md: 6 }}>
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Grid>
      <Grid size={{ xs: 12, md: 6 }}>
        <Box
          component="img"
          src={backgroundLogin}
          alt="background-login"
          sx={{
            width: '100%',
            height: '100dvh',
            objectFit: 'cover',
          }}
        />
      </Grid>
    </Grid>
  );
}

export default AuthLayout;
