import { TextField, Button, Grid } from "@mui/material";
import React from "react";
import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

// const SearchBarWrapper = styled(Box)({
//   display: "flex",
//   justifyContent: "space-between",
//   width: "100%",
// }) as typeof Box;

// const CustomTextField = styled(TextField)({
//   width: "80%",
// }) as typeof TextField;

const CustomButton = styled(Button)({
  width: "100%",
  height: "100%",
}) as typeof Button;

interface WeatherSearchbarProps {
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const WeatherSearchbar = ({
  value,
  handleInput,
  handleSearch,
}: WeatherSearchbarProps) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={12} sm={10}>
        <TextField
          fullWidth
          id="outlined-basic"
          label="City name"
          variant="outlined"
          value={value}
          onChange={handleInput}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <CustomButton variant="outlined" onClick={handleSearch}>
          Search
        </CustomButton>
      </Grid>
    </Grid>
  );
};
