import { makeStyles } from '@mui/styles';

export default makeStyles((theme) => ({
  featuredCardContainer: {
    marginBottom: '20px',
    display: 'flex',
    justifyContent: 'center',
    height: '490px',
    textDecoration: 'none',
    [theme.breakpoints.down('md')]: {
      flexDirection: 'column',
      height: '500px',

    },
  },
  card: {
    width: '100%',
    display: 'flex',

    // flexDirection: 'column',
    [theme.breakpoints.down('md')]: {
      display: 'inline-block',
    },

  },
  cardRoot: {
    position: 'relative',
    [theme.breakpoints.down('md')]: {
      height: 'inherit',
    },

  },
  cardMedia: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '50%',
    backgroundColor: 'rgba(0, 0, 0, 0.575)',
    backgroundBlendMode: 'darken',
    [theme.breakpoints.down('md')]: {
      width: '100%',
      height: '50%',
      paddingBottom: '20px',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',
      height: '100%',
    },

  },
  cardContent: {
    color: 'white',
    width: '50%',
    zIndex: 100,

    [theme.breakpoints.down('md')]: {
      width: '100%',
      overflow: 'hidden',
    },
    [theme.breakpoints.down('sm')]: {
      height: 'auto',
    },

  },
  cardContentRoot: {
    position: 'relative',
    backgroundColor: 'transparent',

  },
  boxContentCard: {
    display: 'flex',
    alignItems: 'end',
    justifyContent: 'flex-start',
    [theme.breakpoints.down('md')]: {
      display: 'inline-block',
    },
    [theme.breakpoints.down('sm')]: {
      height: '100%',
      display: 'flex',
    },

  },
  video: {
    position: 'absolute',
    border: 'none',
    bottom: 0,
    right: 0,
    height: '100%',
    width: '50%',
    objectFit: 'cover',
    zIndex: 50,
    opacity: 0.9,
    [theme.breakpoints.down('md')]: {
      // display: 'none',
      width: '100%',
      height: '50%',
    },
    [theme.breakpoints.down('sm')]: {
      display: 'none',

    },
  },
}));
