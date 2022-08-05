import { Alert, Snackbar } from '@mui/material';
import { CloseButton } from '../action-buttons/CloseButton';

interface NotificationProps {
  onClose: (event: React.SyntheticEvent<any> | Event, reason?: string) => void;
  severity: 'error' | 'warning' | 'info' | 'success';
  open: boolean;
  text: string;
  autoHideDuration?: number;
}

export const Notification = ({
  onClose,
  severity,
  open,
  text,
  autoHideDuration,
}: NotificationProps) => {
  return (
    <Snackbar open={open} onClose={onClose} autoHideDuration={autoHideDuration}>
      <Alert
        action={<CloseButton handleClose={onClose} dataTestid="notification-close" />}
        severity={severity}
        sx={{ width: '100%' }}
        data-testid={'notification'}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
