import { IconButton } from "@mui/material";
import { Delete } from "@mui/icons-material/";

interface DeleteButtonProps {
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const DeleteButton = ({ handleDelete }: DeleteButtonProps) => {
  return (
    <IconButton
      size="medium"
      aria-label="close"
      color="inherit"
      onClick={handleDelete}
    >
      <Delete fontSize="medium" />
    </IconButton>
  );
};
