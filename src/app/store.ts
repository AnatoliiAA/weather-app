import {
  combineReducers,
  configureStore,
  ThunkAction,
  Action,
  PreloadedState,
} from "@reduxjs/toolkit";
import weatherReducer from "../features/weather/weatherSlice";
import weatherForecastReducer from "../features/weather-forecast/weatherForecastSlice";

const rootReducer = combineReducers({
  weather: weatherReducer,
  weatherForecast: weatherForecastReducer,
});

export function setupStore(preloadedState?: PreloadedState<RootState>) {
  return configureStore({
    reducer: rootReducer,
    preloadedState,
  });
}

export type RootState = ReturnType<typeof rootReducer>;
export type AppStore = ReturnType<typeof setupStore>;
export type AppDispatch = AppStore["dispatch"];
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
