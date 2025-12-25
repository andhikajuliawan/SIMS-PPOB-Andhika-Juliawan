import { Avatar, Skeleton, Typography } from '@mui/material';
import Box from '@mui/material/Box';
import profilePicture from '/assets/account/profile.png';
import { useAppSelector } from '../../features/hooks.ts';
import { selectUser } from '../../features/user/userSlice.ts';

function Profile() {
  const { first_name, last_name, profile_image, isLoading } =
    useAppSelector(selectUser);
  const getProfileImage = () => {
    const apiImage = profile_image;
    if (!apiImage || apiImage.includes('/null')) {
      return profilePicture;
    }
    return apiImage;
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: '1.5rem',
        gap: '.5rem',
      }}
    >
      {isLoading ? (
        <Skeleton variant="circular" width={100} height={100} />
      ) : (
        <Avatar
          alt="avatar"
          src={getProfileImage()}
          sx={{ width: 100, height: 100 }}
        />
      )}

      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        {isLoading ? <Skeleton width={200} /> : `${first_name}  ${last_name}`}
      </Typography>
    </Box>
  );
}

export default Profile;
