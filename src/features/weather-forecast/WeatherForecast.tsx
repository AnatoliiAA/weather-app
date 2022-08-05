import { Grid, styled, Typography } from '@mui/material';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../app/hooks';
import { CenteredGrid } from '../../components/layout/CenteredGrid';
import { ContentWrapper } from '../../components/layout/ContentWrapper';
import { fetchForecast, selectForecast } from './weatherForecastSlice';

const TimeWrapper = styled(Grid)({
  display: 'flex',
  justifyContent: 'space-between',
  borderLeft: '1px solid black',
  borderRight: '1px solid black',
}) as typeof Grid;

const TempWrapper = styled(TimeWrapper)({
  height: '200px',
}) as typeof Grid;

const TimeCard = styled(Grid)({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '12.5%',
  height: '50px',
}) as typeof Grid;

const TempCard = styled(TimeCard)({
  position: 'relative',
}) as typeof Grid;

const ForecastTitle = styled(Typography)({
  display: 'flex',
  fontSize: 40,
  margin: '20px 0',
}) as typeof Typography;

export const WeatherForecast = () => {
  const forecast = useAppSelector(selectForecast);
  const { cityName } = useParams() as { cityName: string };
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchForecast(cityName));
  }, []);

  const maxTemp = Math.max(...Object.values(forecast));

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
                {time}
              </TimeCard>
            );
          })}
        </TimeWrapper>

        <TempWrapper item container xs={12}>
          {Object.values(forecast).map((temp, id) => {
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
      </CenteredGrid>
    </ContentWrapper>
  );
};
