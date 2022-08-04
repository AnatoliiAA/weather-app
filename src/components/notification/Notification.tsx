import { Alert, Snackbar } from "@mui/material";
import { SyntheticEvent } from "react";

interface NotificationProps {
  onClose: (event: React.SyntheticEvent<any> | Event, reason?: string) => void;
  severity: "error" | "warning" | "info" | "success";
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
        onClose={(e) => onClose(e)}
        severity={severity}
        sx={{ width: "100%" }}
      >
        {text}
      </Alert>
    </Snackbar>
  );
};
