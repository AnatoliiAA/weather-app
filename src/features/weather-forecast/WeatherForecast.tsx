import { Grid, styled, Typography } from "@mui/material";
import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { CenteredGrid } from "../../components/layout/CenteredGrid";
import { ContentWrapper } from "../../components/layout/ContentWrapper";
import { fetchForecast, selectCitiesForecast } from "./weatherForecastSlice";

const TimeWrapper = styled(Grid)({
  display: "flex",
  justifyContent: "space-between",
  borderLeft: "1px solid black",
  borderRight: "1px solid black",
}) as typeof Grid;

const TempWrapper = styled(TimeWrapper)({
  height: "200px",
}) as typeof Grid;

const TimeCard = styled(Grid)({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  width: "12.5%",
  height: "50px",
}) as typeof Grid;

const TempCard = styled(TimeCard)({
  position: "relative",
}) as typeof Grid;

const ForecastTitle = styled(Typography)({
  display: "flex",
  fontSize: 40,
  margin: "20px 0",
}) as typeof Typography;

export const WeatherForecast = () => {
  const cities = useAppSelector(selectCitiesForecast);
  const { cityName } = useParams() as { cityName: string };
  const dispatch = useAppDispatch();
  let maxTemp =
    cityName in cities ? Math.max(...Object.values(cities[cityName])) : 0;

  useEffect(() => {
    dispatch(fetchForecast(cityName));
  }, []);

  return (
    <ContentWrapper>
      <CenteredGrid container>
        <Grid item xs={12} display="flex" justifyContent="center">
          <ForecastTitle>{cityName} Weather Forecast</ForecastTitle>
        </Grid>
        <TimeWrapper item container xs={12}>
          {Object.keys(cityName in cities ? cities[cityName] : []).map(
            (time) => {
              return <TimeCard item>{time}:00</TimeCard>;
            }
          )}
        </TimeWrapper>

        <TempWrapper item container xs={12}>
          {Object.values(cityName in cities ? cities[cityName] : []).map(
            (temp) => {
              const tempDiff = maxTemp - temp;
              const greenVal = 20 + tempDiff * 15;
              return (
                <TempCard
                  item
                  sx={{
                    top: `${tempDiff * 5}px`,
                    backgroundColor: `rgba(255, ${greenVal}, 0, 0.25)`,
                    borderBottom: `1px solid rgb(255, ${greenVal}, 0)`,
                  }}
                >
                  {temp >= 0 ? "+" : "-"}
                  {temp}
                </TempCard>
              );
            }
          )}
        </TempWrapper>
      </CenteredGrid>
    </ContentWrapper>
  );
};
