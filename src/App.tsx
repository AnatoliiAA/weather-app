import { Weather } from "./features/weather/Weather";
import { WeatherForecast } from "./features/weather-forecast/WeatherForecast";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Header } from "./components/header/Header";
import { CssBaseline } from "@mui/material";

function App() {
  return (
    <>
      <CssBaseline />
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Weather />} />
          <Route path="/forecast/:cityName" element={<WeatherForecast />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
