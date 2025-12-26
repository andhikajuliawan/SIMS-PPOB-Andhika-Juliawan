import { Box, Typography } from '@mui/material';
import { NavLink, Outlet, useNavigate } from 'react-router';
import logo from '/Logo.png';
import { useAppDispatch } from '../features/hooks.ts';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../services/user.service.ts';
import { useEffect } from 'react';
import { setUser, setUserLoading } from '../features/user/userSlice.ts';
import SideBar from '../components/SideBar.tsx';

interface NavProps {
  title: string;
  path: string;
}

function MainLayout() {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const listNavigation: NavProps[] = [
    { title: 'Top Up', path: '/top-up' },
    { title: 'Transaction', path: '/transaction' },
    { title: 'Akun', path: '/account' },
  ];

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
      <Box
        component="header"
        sx={{
          px: { xs: 2, sm: 4, md: 12 },
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

      <Box component="main" sx={{ flexGrow: 1, width: '100%', p: 0 }}>
        <Outlet />
      </Box>
    </Box>
  );
}

export default MainLayout;
