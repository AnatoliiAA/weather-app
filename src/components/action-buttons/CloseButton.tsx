import { IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

interface CloseButtonProps {
  handleClose: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dataTestid?: string;
}

export const CloseButton = ({ handleClose, dataTestid }: CloseButtonProps) => {
  return (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleClose}
      data-testid={dataTestid}
    >
      <CloseIcon fontSize="small" />
    </IconButton>
  );
};
