import { Box } from '@mui/material';
import { Outlet } from 'react-router';
import { useAppDispatch } from '../features/hooks.ts';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/user.service.ts';
import { useEffect } from 'react';
import { setUser, setUserLoading } from '../features/user/userSlice.ts';
import NavBar from '../components/Navigation/NavBar.tsx';

function MainLayout() {
  const dispatch = useAppDispatch();

  const { data, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: userService.getUser,
  });

  useEffect(() => {
    if (!isLoading && data) {
      dispatch(
        setUser({
          ...data.data,
        })
      );
    }
    dispatch(setUserLoading(isLoading));
  }, [data, dispatch, isLoading]);

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>

        <NavBar />
      <Box height="65px">
      </Box>
      <Box component="main" sx={{ flexGrow: 1, width: '100%', p: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
