import { Card, CardContent, CardHeader, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { DeleteButton } from "../../components/action-buttons/DeleteButton";

interface WeatherCardProps {
  title: string;
  temp: number;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomCard = styled(Card)(({ theme }) => ({
  width: "100%",
  cursor: "pointer",
  "&:hover": {
    boxShadow: theme.shadows[4],
  },
})) as typeof Card;

export const WeatherCard = ({
  title,
  temp,
  handleDelete,
}: WeatherCardProps) => {
  return (
    <CustomCard>
      <CardHeader
        title={title}
        action={<DeleteButton handleDelete={handleDelete} />}
      />
      <CardContent>
        <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
          {temp > 0 ? `+${temp}` : `-${temp}`}
        </Typography>
      </CardContent>
    </CustomCard>
  );
};
