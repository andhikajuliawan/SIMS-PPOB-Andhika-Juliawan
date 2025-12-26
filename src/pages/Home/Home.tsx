import Box from '@mui/material/Box';
import ProfileCard from '../../components/Home/ProfileCard.tsx';

function Home() {
  return (
    <Box
      sx={{
        minHeight: 'calc(100dvh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        paddingX: 8,
        paddingY: 4,
      }}
    >
      <ProfileCard />
    </Box>
  );
}

export default Home;
