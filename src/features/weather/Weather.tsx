import { useAppSelector, useAppDispatch } from "../../app/hooks";
import {
  Alert,
  Box,
  CircularProgress,
  Grid,
  Snackbar,
  styled,
} from "@mui/material";
import { useEffect, useState } from "react";
import {
  capitalizeFirstLetter,
  deleteCityFromLocalStorage,
  getLocalStorageCities,
} from "../../helpres/helpres";
import { WeatherCard } from "./WeatherCard";
import { WeatherSearchbar } from "./WeatherSearchbar";
import {
  selectCities,
  fetchCityByName,
  selectStatus,
  setStatus,
  fetchSeveralByName,
  deleteByName,
} from "./weatherSlice";

const ContentWrapper = styled(Box)(({ theme }) => ({
  boxSizing: "border-box",
  maxWidth: "1400px",
  margin: "0 auto",
  marginTop: theme.spacing(2),
  padding: theme.spacing(0, 2, 0, 2),
})) as typeof Box;

const CenteredGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
})) as typeof Grid;

export const Weather = () => {
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    let savedCities = getLocalStorageCities();
    if (savedCities.length) {
      dispatch(fetchSeveralByName(savedCities));
    }
  }, []);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const capitalizedInput = capitalizeFirstLetter(e.target.value);
    setInputValue(capitalizedInput);
  };

  const handleSearch = async () => {
    if (!inputValue) {
      return;
    }
    setInputValue("");
    dispatch(fetchCityByName(inputValue));
  };

  const handleCloseNotification = () => {
    dispatch(setStatus("idle"));
  };

  const handleDelete = (cityName: string) => {
    deleteCityFromLocalStorage(cityName);
    dispatch(deleteByName(cityName));
  };

  return (
    <ContentWrapper>
      <CenteredGrid container spacing={2}>
        <CenteredGrid item xs={12}>
          <WeatherSearchbar
            value={inputValue}
            handleInput={handleInput}
            handleSearch={handleSearch}
          />
        </CenteredGrid>

        {Object.keys(cities).map((city) => {
          return (
            <CenteredGrid item xs={6} md={4} key={cities[city].id}>
              <WeatherCard
                title={city}
                temp={cities[city].temp}
                handleDelete={() => handleDelete(city)}
              ></WeatherCard>
            </CenteredGrid>
          );
        })}

        {status === "loading" ? (
          <CenteredGrid item xs={6} md={4}>
            <CircularProgress />
          </CenteredGrid>
        ) : null}

        {status === "failed" ? (
          <Snackbar
            open={status === "failed"}
            onClose={handleCloseNotification}
            autoHideDuration={6000}
          >
            <Alert
              onClose={handleCloseNotification}
              severity="error"
              sx={{ width: "100%" }}
            >
              Failed to load weather for this city
            </Alert>
          </Snackbar>
        ) : null}
      </CenteredGrid>
    </ContentWrapper>
  );
};
