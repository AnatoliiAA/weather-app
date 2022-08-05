import { Box, styled } from '@mui/material';

export const ContentWrapper = styled(Box)(({ theme }) => ({
  boxSizing: 'border-box',
  maxWidth: '1400px',
  margin: '0 auto',
  padding: theme.spacing(0, 2, 0, 2),
})) as typeof Box;
