import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { fetchForecastByName } from "../../api/weatherAPI";

type StatusType = "idle" | "loading" | "failed";

type Forecast = { [name: string]: number };

export interface CitiesWeatherState {
  status: StatusType;
  forecast: Forecast;
}

const initialState: CitiesWeatherState = {
  status: "idle",
  forecast: {
    time: 0,
  },
};

export const fetchForecast = createAsyncThunk(
  "weather/fetchForecastByName",
  async (cityName: string) => {
    const data = await fetchForecastByName(cityName);
    console.log(data);
    const forecast: Forecast = {};
    data.list.forEach((element: any) => {
      const date = new Date(element.dt_txt);
      const hours = `${date.getHours()}:00`;
      forecast[hours] = element.main.temp;
    });
    return forecast;
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
        state.forecast = { ...action.payload };
      })
      .addCase(fetchForecast.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const selectForecast = (state: RootState) =>
  state.weatherForecast.forecast;
export const selectStatus = (state: RootState) => state.weatherForecast.status;

export default weatherForecastSlice.reducer;
