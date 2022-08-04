import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../../app/store";
import { setLocalStorageCities } from "../../helpres/helpres";
import { fetchByName, fetchForecastByName } from "../../api/weatherAPI";

type StatusType = "idle" | "loading" | "failed";

type Forecast = { [name: string]: number };

export interface CityWeather {
  [name: string]: {
    temp: number;
    id: number;
  };
}

export interface CitiesWeatherState {
  status: StatusType;
  cities: CityWeather;
}

const initialState: CitiesWeatherState = {
  status: "idle",
  cities: {},
};

export const fetchCityByName = createAsyncThunk(
  "weather/fetchByName",
  async (cityName: string) => {
    const data = await fetchByName(cityName);
    if (data) {
      setLocalStorageCities(data.name);
    }
    const cityData: CityWeather = {
      [data.name]: { temp: data.main.temp, id: data.id },
    };
    return cityData;
  }
);

export const fetchSeveralByName = createAsyncThunk(
  "weather/fetchSeveralByName",
  async (cityNames: string[]) => {
    let allCitiesData: CityWeather = {};
    await Promise.all(
      cityNames.map(async (cityName) => {
        const data = await fetchByName(cityName);
        allCitiesData[cityName] = { temp: data.main.temp, id: data.id };
      })
    );
    return allCitiesData;
  }
);

export const weatherSlice = createSlice({
  name: "weather",
  initialState,
  reducers: {
    setStatus: (state, action: PayloadAction<StatusType>) => {
      state.status = action.payload;
    },
    deleteByName: (state, action: PayloadAction<string>) => {
      delete state.cities[action.payload];
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCityByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCityByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.cities = { ...state.cities, ...action.payload };
      })
      .addCase(fetchCityByName.rejected, (state) => {
        state.status = "failed";
      })
      .addCase(fetchSeveralByName.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchSeveralByName.fulfilled, (state, action) => {
        state.status = "idle";
        state.cities = { ...state.cities, ...action.payload };
      })
      .addCase(fetchSeveralByName.rejected, (state) => {
        state.status = "failed";
      });
  },
});

export const { setStatus, deleteByName } = weatherSlice.actions;
export const selectCities = (state: RootState) => state.weather.cities;
export const selectStatus = (state: RootState) => state.weather.status;

export default weatherSlice.reducer;
