import React, { useEffect } from 'react';
import { Modal, Typography, Button, Box, Grid, CircularProgress, useMediaQuery, Rating, ButtonGroup } from '@mui/material';
import { Movie as MovieIcon, Theaters, Language, PlusOne, Favorite, FavoriteBorderOutlined, Remove, ArrowBack, HeartBroken } from '@mui/icons-material';
import { Link, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { display } from '@mui/system';
import genreIcons from '../../assets/genres';
import { userSelector } from '../../features/auth';

import { useGetRecommendationsQuery, useGetMovieQuery, useGetUserListsQuery } from '../../services/TMDB';
import { selectGenreOrCategory } from '../../features/currentGenreOrCategory';
import { MovieList } from '..';

import useStyles from './styles';

function MovieInformation() {
  const api_key = process.env.REACT_APP_TMDB_KEY;

  const { user } = useSelector(userSelector);

  const dispatch = useDispatch();
  const classes = useStyles();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: recommendations, isFetching: isRecommendationsFetching } = useGetRecommendationsQuery({ list: '/recommendations', movie_id: id });
  const { data: favoriteMovies } = useGetUserListsQuery({ listName: 'favorite/movies', accountId: user?.id, sessionId: localStorage.getItem('session_id'), page: 1 });
  const { data: watchlistMovies } = useGetUserListsQuery({ listName: 'watchlist/movies', accountId: user?.id, sessionId: localStorage.getItem('session_id'), page: 1 });

  const [isMovieFavorite, setIsMovieFavorite] = React.useState(false);

  const [isMovieWatchListed, setIsMovieWatchListed] = React.useState(false);

  useEffect(() => {
    setIsMovieFavorite(!!favoriteMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [favoriteMovies, data]);

  useEffect(() => {
    setIsMovieWatchListed(!!watchlistMovies?.results?.find((movie) => movie?.id === data?.id));
  }, [watchlistMovies, data]);

  const [open, setOpen] = React.useState(false);

  const searchIndexTrailer = data?.videos.results.findIndex((video) => (video.type === 'Trailer' || video.type === 'Teaser' || video.type === 'Clip'));

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${api_key}&session_id=${localStorage.getItem('session_id')}`,
      {
        media_type: 'movie', media_id: id, favorite: !isMovieFavorite },
    );

    setIsMovieFavorite((prev) => !prev);
  };

  const addToWatchList = async () => {
    await axios.post(`https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${api_key}&session_id=${localStorage.getItem('session_id')}`, {
      media_type: 'movie', media_id: id, watchlist: !isMovieWatchListed });

    setIsMovieWatchListed((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <Link to="/">Something has gone wrong - Go back</Link>
      </Box>
    );
  }

  return (
    <Grid container className={classes.containerSpaceAround}>
      <Grid item sm={12} lg={4} style={{ display: 'flex', width: '300px', marginBottom: '30px' }}>
        <img
          className={classes.poster}
          src={`https://image.tmdb.org/t/p/w500${data?.poster_path}`}
          alt={data?.title}
        />
      </Grid>
      <Grid item container direction="column" lg={7}>
        <Typography variant="h3" align="center" gutterBottom>
          {data?.title} ({data.release_date.split('-')[0]})
        </Typography>
        <Typography variant="h5" align="center" gutterBottom>
          {data?.tagline}
        </Typography>
        <Grid item className={classes.containerSpaceAround}>
          <Box display="flex" align="center">
            <Rating readOnly value={data.vote_average / 2} />
            <Typography variant="subtitle1" gutterBottom style={{ marginLeft: '10px' }}>
              {data?.vote_average} / 10
            </Typography>
          </Box>
          <Typography variant="h6" align="center" gutterBottom>
            {data?.runtime}min | Language: {data?.spoken_languages[0].name}
          </Typography>
        </Grid>
        <Grid item className={classes.genresContainer}>
          {data?.genres?.map((genre, i) => (
            <Link
              key={genre.name}
              className={classes.link}
              to="/"
              onClick={() => dispatch(selectGenreOrCategory(genre.id))}
            >
              <img src={genreIcons[genre.name.toLowerCase()]} className={classes.genreimage} height={30} alt={genre.name} />
              <Typography variant="subtitle1" color="textPrimary">
                {genre?.name}
              </Typography>
            </Link>
          ))}
        </Grid>
        <Typography variant="h5" gutterBottom style={{ marginTop: '10px' }}>
          Overview
        </Typography>
        <Typography style={{ marginBottom: '2rem' }}>
          {data?.overview}
        </Typography>
        <Typography variant="h5" gutterBottom>
          Top Cast
        </Typography>
        <Grid item container spacing={2}>
          {data?.credits?.cast?.slice(0, 6).map((cast) => (
            <Grid
              item
              key={cast.id}
              xs={4}
              md={2}
              component={Link}
              to={`/actors/${cast.id}`}
              style={{ textDecoration: 'none' }}
            >
              <img className={classes.castImage} src={`https://image.tmdb.org/t/p/w500${cast?.profile_path}`} alt={cast?.name} />
              <Typography color="textPrimary" textAlign="center">
                {cast?.name}
              </Typography>
              <Typography color="textSecondary" textAlign="center">
                {cast?.character.split('/')[0]}
              </Typography>
            </Grid>
          ))}
        </Grid>
        <Grid item container style={{ marginTop: '2rem' }}>
          <div className={classes.buttonsContainer}>
            <Grid item xs={12} sd={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button target="_blank" rel="noopener noreferrer" href={data?.homepage} endIcon={<Language />}>Website</Button>
                <Button target="_blank" rel="noopener noreferrer" href={`https://www.imdb.com/title/${data?.imdb_id}`} endIcon={<MovieIcon />}>IMDB</Button>
                <Button onClick={() => setOpen(true)} href="#" endIcon={<Theaters />}>TRAILER</Button>
              </ButtonGroup>
            </Grid>
            <Grid item xs={12} sd={6} className={classes.buttonsContainer}>
              <ButtonGroup size="medium" variant="outlined">
                <Button
                  onClick={addToFavorites}
                  endIcon={isMovieFavorite ? <HeartBroken /> : <FavoriteBorderOutlined />}
                >
                  {isMovieFavorite ? 'Remove from favorites' : 'Add to favorites'}
                </Button>
                <Button
                  onClick={addToWatchList}
                  endIcon={isMovieWatchListed ? <Remove /> : <PlusOne />}
                >
                  WatchList
                </Button>
                <Button endIcon={<ArrowBack />} sx={{ borderColor: 'primary.main' }}>
                  <Typography style={{ textDecoration: 'none' }} component={Link} to="/" variant="subtitle12" color="inherit">Back
                  </Typography>
                </Button>
              </ButtonGroup>
            </Grid>
          </div>
        </Grid>
      </Grid>
      <Box marginTop="5rem" width="100%">
        <Typography variant="h3" gutterBottom align="center">
          You might also like
        </Typography>
        {recommendations
          ? <MovieList movies={recommendations} numberOfMovies={12} />
          : <Box>Sorry, nothing was found</Box>}
      </Box>
      <Modal
        closeAfterTransition
        className={classes.modal}
        open={open}
        onClose={() => setOpen(false)}
      >
        {data?.videos?.results?.length > 0 && (
        <iframe
          autoPlay
          className={classes.video}
          frameBorder="0"
          title="Trailer"
          src={`https://www.youtube.com/embed/${data.videos.results[searchIndexTrailer].key}`}
          allow="autoplay"
          allowFullScreen
        />
        )}
      </Modal>
    </Grid>
  );
}

export default MovieInformation;
