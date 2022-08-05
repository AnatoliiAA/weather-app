import { Grid, styled } from '@mui/material';

export const CenteredGrid = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
})) as typeof Grid;
