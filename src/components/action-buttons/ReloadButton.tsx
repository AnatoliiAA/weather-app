import { IconButton } from '@mui/material';
import { Update } from '@mui/icons-material/';

interface UpdateButtonProps {
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dataTestid?: string;
}

export const UpdateButton = ({ handleUpdate, dataTestid }: UpdateButtonProps) => {
  return (
    <IconButton
      size="medium"
      aria-label="close"
      color="inherit"
      onClick={handleUpdate}
      data-testid={dataTestid}
    >
      <Update fontSize="medium" />
    </IconButton>
  );
};
