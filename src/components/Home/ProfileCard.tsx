import Box from '@mui/material/Box';
import { useQuery } from '@tanstack/react-query';
import { userService } from '../../services/user.service.ts';
import { useEffect } from 'react';
import {
  selectUser,
  setBalance,
  setBalanceLoading,
  setShowBalance,
} from '../../features/user/userSlice.ts';
import { useDispatch } from 'react-redux';
import { Avatar, IconButton, Skeleton, Typography } from '@mui/material';
import backgroundSaldo from '/assets/account/background-saldo.png';
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined';
import VisibilityOffOutlinedIcon from '@mui/icons-material/VisibilityOffOutlined';
import { grey } from '@mui/material/colors';
import { useAppSelector } from '../../features/hooks.ts';
import { getValidProfileImage } from '../../utils/imageHelper.ts';

function ProfileCard() {
  const dispatch = useDispatch();
  const {
    first_name,
    last_name,
    profile_image,
    isLoadingUser,
    balance,
    showBalance,
    isLoadingBalance,
  } = useAppSelector(selectUser);

  const {
    data: balanceData,
    isLoading: balanceLoading,
    isError,
  } = useQuery({
    queryKey: ['balance'],
    queryFn: userService.getUserBalance,
  });

  useEffect(() => {
    if (!balanceLoading && balanceData) {
      dispatch(setBalance(balanceData.data.balance));
    }
    dispatch(setBalanceLoading(balanceLoading));
  }, [balanceData, dispatch, balanceLoading]);
  return (
    <Box
      sx={{ display: 'flex', justifyContent: 'space-between', width: '100%' }}
    >
      <Box
        sx={{
          display: { xs: 'none', sm: 'block' },
        }}
      >
        {isLoadingUser ? (
          <Skeleton variant="circular" width={70} height={70} sx={{ mb: 2 }} />
        ) : (
          <Avatar
            alt="avatar"
            src={getValidProfileImage(profile_image)}
            sx={{ width: 70, height: 70, mb: 2 }}
          />
        )}

        <Typography variant="h6" fontWeight="500">
          Selamat datang,
        </Typography>
        <Typography
          variant="h5"
          fontWeight="600"
          sx={{ textTransform: 'capitalize' }}
        >
          {isLoadingUser ? <Skeleton /> : `${first_name} ${last_name}`}
        </Typography>
      </Box>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundImage: `url(${backgroundSaldo})`,
          px: 3,
          py: 2,
          width: { xs: '100%', sm: '60%', md: '70%' },
          maxWidth: '600px',
          minWidth: '300px',
          borderRadius: 4,
          color: grey[50],
        }}
      >
        <Box>
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
            }}
          >
            <Typography variant="subtitle2" fontWeight="500">
              Saldo Anda
            </Typography>
            <Typography
              variant="subtitle2"
              fontWeight="500"
              sx={{
                textTransform: 'capitalize',
                display: { xs: 'block', sm: 'none' },
              }}
            >
              {isLoadingUser ? <Skeleton /> : `${first_name} ${last_name}`}
            </Typography>
          </Box>
          <Typography variant="h4" fontWeight="600">
            {isLoadingBalance ? (
              <Skeleton width={200} />
            ) : isError ? (
              '-'
            ) : (
              `Rp ${showBalance ? balance.toLocaleString('id-ID') : '•••••••'}`
            )}
          </Typography>
        </Box>
        <Typography
          variant="subtitle2"
          fontWeight="500"
          sx={{ display: 'flex', alignItems: 'center' }}
        >
          {isError ? (
            'Gagal memuat saldo'
          ) : (
            <>
              {showBalance ? 'Tutup saldo' : 'Lihat saldo'}

              <IconButton
                size="small"
                sx={{ color: grey[50], ml: 0.5 }}
                onClick={() => dispatch(setShowBalance(!showBalance))}
              >
                {showBalance ? (
                  <VisibilityOutlinedIcon fontSize="inherit" />
                ) : (
                  <VisibilityOffOutlinedIcon fontSize="inherit" />
                )}
              </IconButton>
            </>
          )}
        </Typography>
      </Box>
    </Box>
  );
}

export default ProfileCard;
