import Box from '@mui/material/Box';
import { Button } from '@mui/material';
import { useAppDispatch } from '../../hooks.ts';
import { logout } from '../../features/auth/authSlice.ts';
import { useNavigate } from 'react-router';

function Account() {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  }
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
      <Box sx={{ width: '50%' }}>
        <Button
          variant="contained"
          type="submit"
          fullWidth
          sx={{
            paddingY: '.4rem',
          }}
          onClick={() => handleLogout()}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
}

export default Account;
