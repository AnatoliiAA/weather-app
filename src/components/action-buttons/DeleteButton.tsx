import { IconButton } from '@mui/material';
import { DeleteOutline } from '@mui/icons-material/';

interface DeleteButtonProps {
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  dataTestid?: string;
}

export const DeleteButton = ({ handleDelete, dataTestid }: DeleteButtonProps) => {
  return (
    <IconButton
      size="medium"
      aria-label="close"
      color="inherit"
      onClick={handleDelete}
      data-testid={dataTestid}
    >
      <DeleteOutline fontSize="medium" color="primary" />
    </IconButton>
  );
};
