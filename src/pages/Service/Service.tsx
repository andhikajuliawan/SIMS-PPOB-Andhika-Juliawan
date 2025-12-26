import ProfileCard from '../../components/Home/ProfileCard.tsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { informationService } from '../../services/information.service.ts';
import { useParams } from 'react-router';
import { Button, CircularProgress, InputAdornment } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { useAppSelector } from '../../features/hooks.ts';
import { selectUser } from '../../features/user/userSlice.ts';
import { transactionService } from '../../services/transaction.service.ts';
import { enqueueSnackbar } from 'notistack';
import type { AxiosError } from 'axios';
import type { FormEvent } from 'react';

function Service() {
  const { service_name } = useParams();
  const { balance } = useAppSelector(selectUser);
  const queryClient = useQueryClient();
  const { data: servicesData, isLoading: serviceLoading } = useQuery({
    queryKey: ['services'],
    queryFn: informationService.getServices,
  });
  const { mutate, isPending } = useMutation({
    mutationFn: transactionService.transaction,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['balance'] });
      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
    },
    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error.response?.data.message, {
        variant: 'error',
        autoHideDuration: 5000,
      });
    },
  });
  const service =
    servicesData?.data.find(
      (service) => service.service_code === service_name
    ) || null;

  const onSubmit = (e: FormEvent) => {
    e.preventDefault();
    mutate({ service_code: service?.service_code || '' });
  };

  return (
    <Box
      sx={{
        minHeight: 'calc(100dvh - 65px)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'start',
        paddingY: 4,
        paddingX: { xs: 2, sm: 4, md: 12 },
      }}
    >
      <ProfileCard />
      <Box sx={{ mt: 4, width: '100%' }}>
        <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
          Pembayaran
        </Typography>
        <Box
          sx={{
            display: 'flex',
            gap: '.5rem',
            mt: 1,
            mb: 4,
            alignItems: 'center',
          }}
        >
          <Box
            component="img"
            src={service?.service_icon}
            alt={service?.service_name}
            sx={{
              width: 40,
              height: 40,
              objectFit: 'contain',
            }}
          />
          <Typography variant="h6" sx={{ fontWeight: '500' }}>
            {service?.service_name}
          </Typography>
        </Box>
        <Box component="form" onSubmit={(e) => onSubmit(e)}>
          <TextField
            fullWidth
            value={service?.service_tariff.toLocaleString('id-ID')}
            disabled
            size="small"
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <PaymentIcon />
                  </InputAdornment>
                ),
              },
            }}
          />
          {(service?.service_tariff ?? 0) > balance && !serviceLoading && (
            <Typography
              variant="caption"
              sx={{ color: 'error.main', mt: 1, fontWeight: '400' }}
            >
              Saldo tidak Mencukupi
            </Typography>
          )}
          <Button
            type="submit"
            variant="contained"
            disabled={
              ((service?.service_tariff ?? 0) > balance && !serviceLoading) ||
              isPending
            }
            fullWidth
            sx={{ mt: 3 }}
          >
            {isPending ? (
              <CircularProgress size={24} color="inherit" />
            ) : (
              'Bayar'
            )}
          </Button>
        </Box>
      </Box>

      {!service && !serviceLoading && (
        <Box
          sx={{
            width: '100%',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: 300,
          }}
        >
          <Typography variant="h6">Service tidak ditemukan</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Service;
