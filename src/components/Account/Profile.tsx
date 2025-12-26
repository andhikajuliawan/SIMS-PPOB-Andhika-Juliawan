import { Avatar, IconButton, Skeleton, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import Box from '@mui/material/Box';
import { useAppDispatch, useAppSelector } from '../../features/hooks.ts';
import { selectUser, setProfileImage } from '../../features/user/userSlice.ts';
import { type ChangeEvent, useRef } from 'react';
import { enqueueSnackbar } from 'notistack';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../services/user.service.ts';
import type { AxiosError } from 'axios';
import { grey } from '@mui/material/colors';
import { getValidProfileImage } from '../../utils/imageHelper.ts';

function Profile() {
  const dispatch = useAppDispatch();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();
  const { first_name, last_name, profile_image, isLoadingUser } =
    useAppSelector(selectUser);

  const { mutate: updateProfileImage, isPending } = useMutation({
    mutationFn: (formData: FormData) => {
      return userService.updateProfileImage(formData);
    },
    onSuccess: (data) => {
      dispatch(setProfileImage(data.data.profile_image));
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error.response?.data.message, {
        variant: 'error',
        autoHideDuration: 2000,
      });
    },
  });

  const handleEditClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.size > 1024 * 1024) {
        enqueueSnackbar('Ukuran file maksimal 1mb', { variant: 'error' });
        event.target.value = '';
        return;
      } else {
        const formData = new FormData();
        formData.append('file', file);
        console.log(file);
        updateProfileImage(formData);
      }
    }
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
      {isLoadingUser || isPending ? (
        <Skeleton variant="circular" width={120} height={120} />
      ) : (
        <Box sx={{ position: 'relative' }}>
          <Avatar
            alt="avatar"
            src={getValidProfileImage(profile_image)}
            sx={{ width: 120, height: 120 }}
          />
          <IconButton
            size="small"
            sx={{
              position: 'absolute',
              bottom: -5,
              right: 4,
              border: `.5px solid ${grey[400]}`,
              backgroundColor: grey[50],
              '&:hover': {
                backgroundColor: grey[200],
              },
            }}
            onClick={handleEditClick}
          >
            <EditIcon fontSize="inherit" />
          </IconButton>
          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="image/png, image/jpeg"
            style={{ display: 'none' }}
          />
        </Box>
      )}

      <Typography variant="h5" sx={{ fontWeight: 500 }}>
        {isLoadingUser ? (
          <Skeleton width={200} />
        ) : (
          `${first_name}  ${last_name}`
        )}
      </Typography>
    </Box>
  );
}

export default Profile;
