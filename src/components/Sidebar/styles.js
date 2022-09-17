import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  imageLink: {
    display: 'flex',
    justifyContent: 'center',
    padding: '10% 0',
  },
  image: {
    width: '40%',
  },
  links: {
    color: theme.palette.text.primary,
    textDecoration: 'none',
  },
  genreimage: {
    filter: theme.palette.mode === 'light' ? 'invert(0)' : 'invert(1)',
  },
}));
