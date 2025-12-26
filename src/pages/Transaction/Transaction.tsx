import ProfileCard from '../../components/Home/ProfileCard.tsx';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Card from '@mui/material/Card';
import Button from '@mui/material/Button';
import { useInfiniteQuery, useQueryClient } from '@tanstack/react-query';
import { transactionService } from '../../services/transaction.service.ts';
import { CircularProgress } from '@mui/material';
import { useEffect } from 'react';

function Transaction() {
  const queryClient = useQueryClient();
  const limit = 5;

  const { data, fetchNextPage, hasNextPage, isFetchingNextPage, isLoading } =
    useInfiniteQuery({
      queryKey: ['history-transaction'],
      queryFn: ({ pageParam = 0 }) =>
        transactionService.getHistoryTransaction(limit, pageParam),
      initialPageParam: 0,
      getNextPageParam: (lastPage, allPages) => {
        const records = lastPage?.data?.records || [];
        if (records.length < limit) {
          return undefined;
        }
        return allPages.length * limit;
      },
    });

  const histories = data?.pages.flatMap((page) => page.data.records) || [];

  useEffect(() => {
    return () => {
      queryClient.removeQueries({ queryKey: ['history-transaction'] });
    };
  },[queryClient]);

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
          Semua Transaksi
        </Typography>

        {histories?.map((history) => (
          <Card
            variant="outlined"
            key={history.invoice_number}
            sx={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '100%',
              mb: 1,
              px: 2,
              py: 0.8,
              mt: 1,
            }}
          >
            <Box>
              {history.transaction_type == 'TOPUP' ? (
                <Typography
                  color="success"
                  variant="subtitle2"
                  sx={{ fontWeight: 600 }}
                >
                  + Rp.{history.total_amount.toLocaleString('id-ID')}
                </Typography>
              ) : (
                <Typography
                  color="error"
                  variant="subtitle2"
                  sx={{ fontWeight: 600 }}
                >
                  - Rp.{history.total_amount.toLocaleString('id-ID')}
                </Typography>
              )}
              <Typography color="secondary" variant="caption">
                {history.created_on}
              </Typography>
            </Box>
            <Typography variant="body2">{history.description}</Typography>
          </Card>
        ))}

        {hasNextPage && (
          <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
            <Button
              onClick={() => fetchNextPage()}
              disabled={isFetchingNextPage}
            >
              {isFetchingNextPage ? <CircularProgress /> : 'Show more'}
            </Button>
          </Box>
        )}

        {isLoading && (
          <Box sx={{ display: 'flex', justifyContent: 'center', mt: 5 }}>
            <CircularProgress />
          </Box>
        )}
      </Box>
    </Box>
  );
}
export default Transaction;
