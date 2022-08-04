import { IconButton } from "@mui/material";
import { Update } from "@mui/icons-material/";

interface UpdateButtonProps {
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const UpdateButton = ({ handleUpdate }: UpdateButtonProps) => {
  return (
    <IconButton
      size="medium"
      aria-label="close"
      color="inherit"
      onClick={handleUpdate}
    >
      <Update fontSize="medium" />
    </IconButton>
  );
};
