import {
  Box,
  Button,
  CircularProgress,
  InputAdornment,
  Link,
  TextField,
  Typography,
  IconButton
} from '@mui/material';
import { grey } from '@mui/material/colors';
import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import HttpsOutlinedIcon from '@mui/icons-material/HttpsOutlined';
import RemoveRedEyeOutlinedIcon from '@mui/icons-material/RemoveRedEyeOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import logo from '/Logo.png';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import type { LoginRequest } from '../../intefaces/auth.interface.ts';
import { useMutation } from '@tanstack/react-query';
import { authService } from '../../services/authService.ts';
import type { AxiosError } from 'axios';
import { useDispatch } from 'react-redux';
import { setToken } from '../../features/auth/authSlice.ts';
import { useNavigate } from 'react-router';
import { enqueueSnackbar } from 'notistack';

function Login() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { mutate, isPending } = useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      dispatch(setToken(data.data.token));
      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      navigate('/');
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
    formState: { errors, isValid },
  } = useForm<LoginRequest>({
    mode: 'onTouched',
    reValidateMode: 'onChange',
  });

  const [isPasswordVisible, setIsPasswordVisible] = useState<boolean>(false);

  const onSubmit = (data: LoginRequest) => {
    mutate(data);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100dvh',
        position: 'relative',
      }}
    >
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
          width: '50%',
          minWidth: '300px',
          gap: '1rem',
        }}
      >
        <Box sx={{ display: 'flex', gap: '.5rem', alignItems: 'center' }}>
          <Box
            component="img"
            src={logo}
            alt={'logo'}
            sx={{ width: '1.5rem', height: '1.5rem' }}
          />
          <Typography
            variant="h6"
            sx={{
              fontWeight: '600',
            }}
          >
            SIMS PPOB
          </Typography>
        </Box>
        <Typography
          variant="h5"
          sx={{
            fontWeight: '600',
            textAlign: 'center',
          }}
        >
          Masuk atau buat akun <br />
          untuk memulai
        </Typography>

        <Box
          component="form"
          onSubmit={handleSubmit(onSubmit)}
          sx={{
            width: '100%',
            display: 'flex',
            flexDirection: 'column',
            gap: '1rem',
            my: '1rem',
          }}
        >
          <TextField
            placeholder="masukkan email anda"
            fullWidth
            {...register('email', {
              required: 'Email wajib diisi',
              pattern: { value: /^\S+@\S+$/i, message: 'Format email salah' },
            })}
            autoComplete="email"
            size="small"
            error={!!errors.email}
            helperText={errors.email?.message?.toString() || ''}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <AlternateEmailOutlinedIcon />
                  </InputAdornment>
                ),
              },
            }}
          />

          <TextField
            placeholder="masukkan password anda"
            fullWidth
            type={isPasswordVisible ? 'text' : 'password'}
            {...register('password', {
              required: 'Password tidak boleh kosong',
              minLength: { value: 8, message: 'Minimal 8 karakter' },
            })}
            autoComplete="current-password"
            size="small"
            error={!!errors.password}
            helperText={errors.password?.message?.toString() || ''}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <HttpsOutlinedIcon />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      onClick={() => setIsPasswordVisible(!isPasswordVisible)}
                      edge="end"
                    >
                      {isPasswordVisible ? (
                        <RemoveRedEyeOutlinedIcon />
                      ) : (
                        <VisibilityOffOutlinedIcon />
                      )}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
          />
          <Button
            variant="contained"
            type="submit"
            fullWidth
            disabled={!isValid || isPending}
            sx={{
              paddingY: '.4rem',
              mt: '1rem',
            }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Masuk'
            )}
          </Button>
        </Box>
        <Typography
          sx={{
            display: 'flex',
            gap: '5px',
            alignItems: 'center',
            color: grey[500],
          }}
          variant="subtitle2"
        >
          Belum punya akun? Regristrasi
          <Link
            sx={{ textDecoration: 'none', cursor: 'pointer' }}
            onClick={() => navigate('/register')}
          >
            disini
          </Link>
        </Typography>
      </Box>
    </Box>
  );
}

export default Login;
