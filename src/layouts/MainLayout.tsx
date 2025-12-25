import { Box, Divider, Grid } from '@mui/material';
import { Outlet } from 'react-router';

function MainLayout() {
  return (
    <Grid
      container
      sx={{
        minHeight: '100vh',
        width: '100%',
        m: 0,
        p: 0,
      }}
    >
      <Grid size={{ md: 12 }}>
        <Box
          sx={{
            width: '100%',
            height: '100px',
            objectFit: 'cover',

          }}
        />
      </Grid>
      <Divider />
      <Grid size={{ md: 12 }}>
        <Box sx={{ width: '100%' }}>
          <Outlet />
        </Box>
      </Grid>
    </Grid>
  );
}

export default MainLayout;
