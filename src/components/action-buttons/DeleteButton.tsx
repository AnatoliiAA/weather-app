import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material/";

interface DeleteButtonProps {
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DeleteButton = ({ handleDelete }: DeleteButtonProps) => {
  return (
    <IconButton
      size="small"
      aria-label="close"
      color="inherit"
      onClick={handleDelete}
    >
      <Delete fontSize="small" />
    </IconButton>
  );
};
