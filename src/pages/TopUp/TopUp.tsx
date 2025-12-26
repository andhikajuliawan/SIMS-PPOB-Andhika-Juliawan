import Box from '@mui/material/Box';
import ProfileCard from '../../components/Home/ProfileCard.tsx';
import Typography from '@mui/material/Typography';
import TextField from '@mui/material/TextField';
import { Button, CircularProgress, InputAdornment } from '@mui/material';
import PaymentIcon from '@mui/icons-material/Payment';
import { Controller, useForm } from 'react-hook-form';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { enqueueSnackbar } from 'notistack';
import type { AxiosError } from 'axios';
import { transactionService } from '../../services/transaction.service.ts';
import { formatRupiah, rupiahToNumber } from '../../utils/formatCurrency.ts';
import type { TopUpForm } from '../../intefaces/transaction.interface.ts';

function TopUp() {
  const queryClient = useQueryClient();
  const topUpOptions: number[] = [10000, 20000, 50000, 10000, 250000, 500000];
  const { mutate, isPending } = useMutation({
    mutationFn: transactionService.topUp,
    onSuccess: (data) => {
      void queryClient.invalidateQueries({ queryKey: ['balance'] });
      enqueueSnackbar(data.message, {
        variant: 'success',
        autoHideDuration: 2000,
      });
      reset()
    },
    onError: (error: AxiosError<{ message: string }>) => {
      enqueueSnackbar(error.response?.data.message, {
        variant: 'error',
        autoHideDuration: 5000,
      });
    },
  });

  const {
    control,
    handleSubmit,
    setValue,
    reset,
    formState: { errors, isValid },
  } = useForm<TopUpForm>({
    mode: 'onChange',
    defaultValues: { top_up_amount: '' },
  });

  const onSubmit = (data: TopUpForm) => {
    mutate({ top_up_amount: rupiahToNumber(data.top_up_amount) });
  };

  const handleQuickSelect = (amount: number) => {
    setValue('top_up_amount', formatRupiah(String(amount)), {
      shouldValidate: true,
      shouldDirty: true,
    });
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
      <Box sx={{ width: '100%', mt: 4 }}>
        <Typography variant="subtitle1" sx={{ fontWeight: '500' }}>
          Silahkan Masukan
        </Typography>
        <Typography variant="h5" sx={{ fontWeight: '600' }}>
          Nominal Top Up
        </Typography>

        <Box
          sx={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1rem',
            alignItems: 'flex-start',
            mt: 4,
          }}
        >
          <Box
            component="form"
            onSubmit={handleSubmit(onSubmit)}
            sx={{ width: { xs: '100%', md: '60%' } }}
          >
            <Controller
              name="top_up_amount"
              control={control}
              rules={{
                required: 'Top Up wajib diisi',
                min: { value: 1, message: 'Nominal tidak boleh 0' },
              }}
              render={({ field: { onChange, value } }) => (
                <TextField
                  fullWidth
                  size="small"
                  value={value}
                  onChange={(e) => {
                    const formatted = formatRupiah(e.target.value);
                    onChange(formatted);
                  }}
                  error={!!errors.top_up_amount}
                  helperText={errors.top_up_amount?.message}
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
              )}
            />

            <Button
              type="submit"
              variant="contained"
              disabled={!isValid || isPending}
              fullWidth
              sx={{ mt: '1rem', minHeight: '40px' }}
            >
              {isPending ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                'Top Up'
              )}
            </Button>
          </Box>
          <Box
            sx={{
              flex: 1,
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '1rem',
            }}
          >
            {topUpOptions.map((option, index) => (
              <Button
                variant="outlined"
                color="secondary"
                key={index}
                onClick={() => handleQuickSelect(option)}
                sx={{ minHeight: '40px' }}
              >
                Rp {option.toLocaleString('id-ID')}
              </Button>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

export default TopUp;
