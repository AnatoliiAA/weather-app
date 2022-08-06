import { Grid, styled, Typography } from '@mui/material';
import AirIcon from '@mui/icons-material/Air';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CenteredGrid } from '../../components/layout/CenteredGrid';
import { ContentWrapper } from '../../components/layout/ContentWrapper';
import { fetchForecast, selectForecast } from './weatherForecastSlice';

const TimeWrapper = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
}) as typeof Grid;

const TempWrapper = styled(TimeWrapper)({
  minHeight: '150px',
}) as typeof Grid;

const WindWrapper = TimeWrapper;

const TimeCard = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexWrap: 'wrap',
  width: '12.5%',
  minHeight: '50px',
  margin: '0 0 20px 0',
}) as typeof Grid;

const TempCard = styled(TimeCard)({
  position: 'relative',
  height: '50px',
  transition: 'box-shadow .3s ease',
  '&:hover': {
    boxShadow: 'inset 0 0 5px 5px rgba(255, 255, 255, 0.5)',
  },
}) as typeof Grid;

const WindCard = styled(TimeCard)({
  margin: '20px 0 0 0',
  background: 'linear-gradient(90deg, rgba(182,182,182,0) 0%, rgba(193,193,193,.5) 96%)',
  backgroundSize: '200%',
  transform: 'skew(-20deg)',
  transition: 'all .5s ease',
  '&:hover': {
    backgroundPosition: '100%',
  },
}) as typeof Grid;

const WindText = styled(Typography)({
  transform: 'skew(20deg)',
}) as typeof Typography;

const TimeText = styled(Typography)({
  display: 'block',
  width: '100%',
  fonSize: '16px',
  textAlign: 'center',
}) as typeof Typography;

const ForecastTitle = styled(Typography)({
  display: 'flex',
  fontSize: 40,
  margin: '20px 0 40px 0',
}) as typeof Typography;

const WindSpeedTitle = styled(Typography)({
  display: 'flex',
  gap: '10px',
  fontSize: 18,
  margin: '10px 0',
}) as typeof Typography;

export const WeatherForecast = () => {
  const forecast = useAppSelector(selectForecast);
  const { cityName } = useParams() as { cityName: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchForecast(cityName));
  }, [cityName, dispatch]);

  const maxTemp = Math.max(...Object.values(forecast).map((element) => element.temp));

  return (
    <ContentWrapper data-testid="weather-forecast-component">
      <CenteredGrid container>
        <Grid item xs={12} display="flex" justifyContent="center">
          <ForecastTitle>{cityName} 24 hour Weather Forecast</ForecastTitle>
        </Grid>

        <TimeWrapper item container xs={12}>
          {Object.keys(forecast).map((time) => {
            return (
              <TimeCard item key={time}>
                <TimeText sx={{ fontSize: { md: 16, xs: 12 } }}>{time}</TimeText>
                <img
                  src={`http://openweathermap.org/img/wn/${forecast[time].weatherIcon}.png`}
                  alt={forecast[time].weatherDescr}
                  title={forecast[time].weatherDescr}
                />
              </TimeCard>
            );
          })}
        </TimeWrapper>

        <TempWrapper item container xs={12}>
          {Object.values(forecast).map((hourlyForecast, id) => {
            const temp = hourlyForecast.temp;
            const tempDiff = maxTemp - temp;
            const greenVal = 20 + tempDiff * 15;
            const backgroundColor =
              temp === 0 ? `rgb(255, 255, 255)` : `rgba(255, ${greenVal}, 0, 0.25)`;
            return (
              <TempCard
                item
                sx={{
                  top: `${tempDiff * 5}px`,
                  backgroundColor: backgroundColor,
                  borderBottom: `1px solid rgb(255, ${greenVal}, 0)`,
                }}
                key={id}
              >
                {temp >= 0 ? `+${temp}` : temp}
              </TempCard>
            );
          })}
        </TempWrapper>

        <Grid item xs={12} display="flex" justifyContent="center">
          <WindSpeedTitle>
            <AirIcon />
            Wind speed
          </WindSpeedTitle>
        </Grid>

        <WindWrapper item container xs={12}>
          {Object.values(forecast).map((hourlyForecast, id) => {
            const windSpeed = hourlyForecast.windSpeed;
            return (
              <WindCard item key={id}>
                <WindText>{windSpeed} m/s</WindText>
              </WindCard>
            );
          })}
        </WindWrapper>
      </CenteredGrid>
    </ContentWrapper>
  );
};
