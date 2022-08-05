import { TextField, Button, Grid } from '@mui/material';
import React from 'react';
import { styled } from '@mui/material/styles';

const CustomButton = styled(Button)({
  width: '100%',
  height: '100%',
}) as typeof Button;

interface WeatherSearchbarProps {
  value: string;
  handleInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSearch: (e: React.MouseEvent<HTMLButtonElement>) => void;
}

export const WeatherSearchbar = ({ value, handleInput, handleSearch }: WeatherSearchbarProps) => {
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
          inputProps={{ 'data-testid': 'searchbar' }}
        />
      </Grid>
      <Grid item xs={12} sm={2}>
        <CustomButton variant="outlined" onClick={handleSearch} data-testid="search-button">
          Search
        </CustomButton>
      </Grid>
    </Grid>
  );
};
