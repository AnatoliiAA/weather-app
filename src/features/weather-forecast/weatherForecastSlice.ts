import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchForecastByName } from "../../api/weatherAPI";

type StatusType = "idle" | "loading" | "failed";

type Forecast = { [name: string]: number };

export interface CitiesWeatherState {
  status: StatusType;
  citiesForecast: { [name: string]: Forecast };
}

const initialState: CitiesWeatherState = {
  status: "idle",
  citiesForecast: {},
};

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecast",
  async (cityName: string) => {
    const data = await fetchForecastByName(cityName);
    const forecast: Forecast = {};
    data.list.forEach((element: any) => {
      const date = new Date(element.dt_txt);
      const hours = date.getHours();
      forecast[hours] = element.main.temp;
    });
    return { name: cityName, forecast: forecast };
  }
);

export const weatherForecastSlice = createSlice({
  name: "weatherForecast",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchForecast.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchForecast.fulfilled, (state, action) => {
        state.status = "idle";
        state.citiesForecast[action.payload.name] = action.payload.forecast;
      })
      .addCase(fetchForecast.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectCitiesForecast = (state: RootState) => state.weatherForecast.citiesForecast;
export const selectStatus = (state: RootState) => state.weather.status;

export default weatherForecastSlice.reducer;
