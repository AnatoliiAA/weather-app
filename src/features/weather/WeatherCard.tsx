import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { DeleteButton } from "../../components/action-buttons/DeleteButton";
import { UpdateButton } from "../../components/action-buttons/ReloadButton";

interface WeatherCardProps {
  title: string;
  temp: number;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomCard = styled(Card)(({ theme }) => ({
  width: "100%",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
})) as typeof Card;

export const WeatherCard = ({
  title,
  temp,
  handleDelete,
  handleUpdate
}: WeatherCardProps) => {
  const navigate = useNavigate();

  const handleShowForecast = () => {
    navigate(`/forecast/${title}`);
  };

  return (
    <CustomCard>
      <CardHeader
        title={title}
        action={<DeleteButton handleDelete={handleDelete} />}
      />
      <CardContent>
        <Typography sx={{ fontSize: 18 }} color="text.secondary">
          {temp > 0 ? `+${temp}` : `-${temp}`}
        </Typography>
      </CardContent>
      <CardActions sx={{justifyContent: "space-between"}}>
        <Button size="small" variant="outlined" onClick={handleShowForecast}>
          Show Forecast
        </Button>
        <UpdateButton handleUpdate={handleUpdate}/>
      </CardActions>
    </CustomCard>
  );
};
