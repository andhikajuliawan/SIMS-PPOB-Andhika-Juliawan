import Box from '@mui/material/Box';
import { useAppDispatch } from '../../features/hooks.ts';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../services/user.service.ts';
import { useEffect } from 'react';
import Profile from '../../components/Account/Profile.tsx';
import { setUser, setUserLoading } from '../../features/user/userSlice.ts';
import FormEdit from '../../components/Account/FormEdit.tsx';

function Account() {
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
    <Box
      sx={{
        minHeight: 'calc(100dvh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <Box sx={{ maxWidth: '500px', width: '50%', minWidth: '300px' }}>
        <Profile />
        <FormEdit />
      </Box>
    </Box>
  );
}

export default Account;
