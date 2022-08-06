import { Button, Card, CardActions, CardContent, CardHeader, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import { DeleteButton } from '../../components/action-buttons/DeleteButton';
import { UpdateButton } from '../../components/action-buttons/ReloadButton';
import { capitalizeFirstLetter } from '../../helpres/helpres';

interface WeatherCardProps {
  title: string;
  temp: number;
  weatherIcon?: string;
  weatherDescr?: string;
  handleDelete: (e: React.MouseEvent<HTMLButtonElement>) => void;
  handleUpdate: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

const CustomCard = styled(Card)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'space-between',
  width: '100%',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
})) as typeof Card;

const CustomCardContent = styled(CardContent)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  flexWrap: 'wrap',
  gap: '10px',
  padding: '0 16px',
})) as typeof CardContent;

export const WeatherCard = ({
  title,
  temp,
  weatherIcon,
  weatherDescr,
  handleDelete,
  handleUpdate,
}: WeatherCardProps) => {
  const navigate = useNavigate();

  const handleShowForecast = () => {
    navigate(`/forecast/${title}`);
  };

  return (
    <CustomCard data-testid={`card-${title}`}>
      <CardHeader
        title={title}
        action={<DeleteButton handleDelete={handleDelete} dataTestid={`delete-button-${title}`} />}
      />
      <CustomCardContent>
        <Typography
          sx={{ display: 'inline-block', fontSize: 18 }}
          color="text.secondary"
          data-testid={`temp-${title}`}
        >
          {temp > 0 ? `+${temp}` : temp}
        </Typography>
        <img src={`http://openweathermap.org/img/wn/${weatherIcon}.png`} alt={weatherDescr} />
        <Typography sx={{ fontSize: 18 }} color="text.secondary">
          {capitalizeFirstLetter(weatherDescr)}
        </Typography>
      </CustomCardContent>
      <CardActions sx={{ justifyContent: 'space-between' }}>
        <Button
          size="small"
          variant="outlined"
          onClick={handleShowForecast}
          data-testid={`forecast-button-${title}`}
        >
          Show Forecast
        </Button>
        <UpdateButton handleUpdate={handleUpdate} dataTestid={`update-button-${title}`} />
      </CardActions>
    </CustomCard>
  );
};
