import { Grid, styled } from '@mui/material';
import { Link } from 'react-router-dom';
import { ContentWrapper } from '../layout/ContentWrapper';

const HeaderContent = styled(Grid)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  height: 100,
  borderRadius: ' 0 0 20px 20px',
  boxShadow: theme.shadows[4],
  marginBottom: theme.spacing(2),
})) as typeof Grid;

const CustomLink = styled(Link)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  width: '100px',
  height: '50px',
  fontSize: '20px',
  textDecoration: 'none',
  color: 'black',
  borderBottom: '1px solid black',
  borderRadius: '10px',
  '&:hover': {
    boxShadow: theme.shadows[4],
  },
}));

export const Header = () => {
  return (
    <ContentWrapper>
      <HeaderContent container>
        <Grid item>
          <CustomLink to="/">Home</CustomLink>
        </Grid>
      </HeaderContent>
    </ContentWrapper>
  );
};
