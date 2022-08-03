import { IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

interface CloseButtonProps {
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const CloseButton = ({ handleClose }: CloseButtonProps) => {
  return (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};
