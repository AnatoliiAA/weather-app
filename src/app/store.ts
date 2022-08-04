import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";
import weatherForecastReducer from "../features/weather-forecast/weatherForecastSlice";

export const store = configureStore({
  reducer: {
    weather: weatherReducer,
    weatherForecast: weatherForecastReducer,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
