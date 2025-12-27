import { type ReactNode } from 'react';
import { closeSnackbar, SnackbarProvider } from 'notistack';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

function Snackbar({ children }: { children: ReactNode }) {
  return (
    <SnackbarProvider
      hideIconVariant
      preventDuplicate
      action={(snackbarId) => (
        <IconButton
          size="small"
          aria-label="close"
          color="inherit"
          onClick={() => closeSnackbar(snackbarId)}
        >
          <CloseIcon fontSize="small" />
        </IconButton>
      )}
    >
      {children}
    </SnackbarProvider>
  );
}

export default Snackbar;
