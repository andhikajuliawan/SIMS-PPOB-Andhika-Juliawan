import Box from '@mui/material/Box';
import Profile from '../../components/Account/Profile.tsx';
import FormEdit from '../../components/Account/FormEdit.tsx';

function Account() {
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
