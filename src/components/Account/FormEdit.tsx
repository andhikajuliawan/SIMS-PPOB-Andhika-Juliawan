import { useForm } from 'react-hook-form';
import type { UserRequest } from '../../intefaces/user.interface.ts';
import { logout } from '../../features/auth/authSlice.ts';
import { useEffect, useState } from 'react';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { userService } from '../../services/user.service.ts';
import { enqueueSnackbar } from 'notistack';
import type { AxiosError } from 'axios';
import { useNavigate } from 'react-router';
import { useAppDispatch, useAppSelector } from '../../features/hooks.ts';
import { selectUser } from '../../features/user/userSlice.ts';
import AlternateEmailIcon from '@mui/icons-material/AlternateEmail';
import PersonIcon from '@mui/icons-material/Person';
import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Skeleton,
  TextField,
} from '@mui/material';

function FormEdit() {
  const dispatch = useAppDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const { email, first_name, last_name, isLoading } =
    useAppSelector(selectUser);
  const { mutate, isPending } = useMutation({
    mutationFn: userService.putUser,
    onSuccess: (data) => {
      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      setIsEdit(false);
      void queryClient.invalidateQueries({ queryKey: ['profile'] });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error.response?.data.message, {
        variant: 'error',
        autoHideDuration: 5000,
      });
    },
  });
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isValid },
  } = useForm<UserRequest>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const onSubmit = (formData: UserRequest) => {
    mutate(formData);
  };

  const handleLogout = () => {
    dispatch(logout());
    navigate('/');
  };

  useEffect(() => {
    reset({
      email,
      first_name,
      last_name,
    });
  }, [email, first_name, isLoading, last_name, reset]);
  return (
    <>
      <Box
        component="form"
        onSubmit={handleSubmit(onSubmit)}
        sx={{
          display: 'flex',
          flexDirection: 'column',
          gap: '1.5rem',
        }}
      >
        {isLoading ? (
          <Skeleton variant="rounded" height={40} />
        ) : (
          <TextField
            placeholder="masukkan email anda"
            fullWidth
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: { value: /^\S+@\S+$/i, message: 'Format email salah' },
            })}
            autoComplete="email"
            size="small"
            disabled
            error={!!errors.email}
            helperText={errors.email?.message?.toString() || ''}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {isLoading ? (
          <Skeleton variant="rounded" height={40} />
        ) : (
          <TextField
            placeholder="masukkan nama depan anda"
            fullWidth
            {...register('first_name', {
              required: 'Nama depan wajib diisi',
            })}
            autoComplete="first_name"
            size="small"
            disabled={!isEdit}
            error={!!errors.first_name}
            helperText={errors.first_name?.message?.toString() || ''}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {isLoading ? (
          <Skeleton variant="rounded" height={40} />
        ) : (
          <TextField
            placeholder="masukkan nama belakang anda"
            fullWidth
            {...register('last_name', {
              required: 'Nama belakang wajib diisi',
            })}
            autoComplete="last_name"
            size="small"
            disabled={!isEdit}
            error={!!errors.last_name}
            helperText={errors.last_name?.message?.toString() || ''}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PersonIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
        )}

        {isEdit && (
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={!isValid || isPending || isLoading}
            sx={{
              paddingY: '.4rem',
              mt: '1rem',
            }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Simpan'
            )}
          </Button>
        )}
      </Box>
      {!isEdit && (
        <>
          <Button
            variant="outlined"
            fullWidth
            disabled={isLoading}
            sx={{
              paddingY: '.4rem',
              mt: '1.5rem',
            }}
            onClick={() => setIsEdit(!isEdit)}
          >
            Edit Profile
          </Button>
          <Button
            variant="contained"
            fullWidth
            disabled={isLoading}
            sx={{
              paddingY: '.4rem',
              mt: '1rem',
            }}
            onClick={() => handleLogout()}
          >
            Logout
          </Button>
        </>
      )}
    </>
  );
}

export default FormEdit;
