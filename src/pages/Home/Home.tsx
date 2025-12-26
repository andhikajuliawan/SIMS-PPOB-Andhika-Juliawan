import Box from '@mui/material/Box';
import ProfileCard from '../../components/Home/ProfileCard.tsx';
import { useQuery } from '@tanstack/react-query';
import { informationService } from '../../services/information.service.ts';
import { Skeleton, Typography } from '@mui/material';

function Home() {
  const { data: servicesData, isLoading: serviceLoading } = useQuery({
    queryKey: ['services'],
    queryFn: informationService.getServices,
  });
  const { data: bannersData, isLoading: bannerLoading } = useQuery({
    queryKey: ['banners'],
    queryFn: informationService.getBanners,
  });

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

      <Box
        sx={{
          display: 'flex',
          justifyContent: 'start',
          width: '100%',
          gap: '1rem',
          overflowX: 'auto',
          maxWidth: '100%',
          mt: 4,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {serviceLoading
          ? Array.from(new Array(12)).map((_, index) => (
              <Skeleton variant="rounded" key={index} width={70} height={110} />
            ))
          : servicesData?.data.map((service, index) => (
              <Box
                key={index}
                sx={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  minWidth: '70px',
                  textAlign: 'center',
                  cursor: 'pointer',
                  pb: 2,
                }}
              >
                <Box
                  component="img"
                  src={service.service_icon}
                  alt={service.service_name}
                  sx={{
                    width: 60,
                    height: 60,
                    mb: 1,
                    objectFit: 'contain',
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    lineHeight: 1.2,
                    maxWidth: '80px',
                    fontWeight: '500',
                    textAlign: 'center',
                  }}
                >
                  {service.service_name}
                </Typography>
              </Box>
            ))}
      </Box>

      <Typography
        variant="subtitle1"
        sx={{ mt: 3, fontWeight: '600', textAlign: 'start' }}
      >
        Temukan Promo Menarik
      </Typography>

      <Box
        sx={{
          display: 'flex',
          width: '100%',
          justifyContent: 'start',
          gap: '1rem',
          overflowX: 'auto',
          mt: 1,
          '&::-webkit-scrollbar': { display: 'none' },
        }}
      >
        {bannerLoading
          ? Array.from(new Array(3)).map((_, index) => (
              <Skeleton
                variant="rounded"
                key={index}
                width={300}
                height={120}
              />
            ))
          : bannersData?.data.map((banner, index) => (
              <Box
                key={index}
                component="img"
                src={banner.banner_image}
                alt={banner.banner_name}
                sx={{
                  width: 300,
                  mb: 1,
                  objectFit: 'contain',
                }}
              />
            ))}
      </Box>
    </Box>
  );
}

export default Home;
