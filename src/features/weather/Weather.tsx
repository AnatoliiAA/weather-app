import { useAppSelector, useAppDispatch } from '../../app/hooks';
import { CircularProgress } from '@mui/material';
import { useEffect, useState } from 'react';
import {
  capitalizeFirstLetter,
  deleteCityFromLocalStorage,
  getLocalStorageCities,
} from '../../helpres/helpres';
import { WeatherCard } from './WeatherCard';
import { WeatherSearchbar } from './WeatherSearchbar';
import {
  selectCities,
  fetchCityByName,
  selectStatus,
  setStatus,
  fetchSeveralByName,
  deleteByName,
} from './weatherSlice';
import { ContentWrapper } from '../../components/layout/ContentWrapper';
import { CenteredGrid } from '../../components/layout/CenteredGrid';
import { Notification } from '../../components/notification/Notification';

export const Weather = () => {
  const cities = useAppSelector(selectCities);
  const status = useAppSelector(selectStatus);
  const dispatch = useAppDispatch();
  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    let savedCities = getLocalStorageCities();
    if (savedCities.length) {
      dispatch(fetchSeveralByName(savedCities));
    }
  }, [dispatch]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const capitalizedInput = capitalizeFirstLetter(e.target.value);
    setInputValue(capitalizedInput);
  };

  const handleSearch = async () => {
    if (!inputValue) {
      return;
    }
    dispatch(fetchCityByName(inputValue));
    setInputValue('');
  };

  const handleCloseNotification = () => {
    dispatch(setStatus('idle'));
  };

  const handleDelete = (cityName: string) => {
    deleteCityFromLocalStorage(cityName);
    dispatch(deleteByName(cityName));
  };

  const handleUpdate = (cityName: string) => {
    dispatch(fetchCityByName(cityName));
  };

  return (
    <ContentWrapper data-testid="weather-component">
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
            <CenteredGrid item xs={6} md={3} key={cities[city].id}>
              <WeatherCard
                title={city}
                temp={cities[city].temp}
                weatherIcon={cities[city].weatherIcon}
                weatherDescr={cities[city].weatherDescr}
                handleDelete={() => handleDelete(city)}
                handleUpdate={() => handleUpdate(city)}
              ></WeatherCard>
            </CenteredGrid>
          );
        })}

        {status === 'loading' && Object.keys(cities).length === 0 ? (
          <CenteredGrid item xs={6} md={4}>
            <CircularProgress />
          </CenteredGrid>
        ) : null}

        {status === 'failed' ? (
          <Notification
            open={status === 'failed'}
            onClose={handleCloseNotification}
            autoHideDuration={6000}
            severity="error"
            text="Failed to load weather for this city"
          />
        ) : null}
      </CenteredGrid>
    </ContentWrapper>
  );
};
