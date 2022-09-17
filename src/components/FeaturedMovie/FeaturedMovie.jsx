import React from 'react';
import { Box, Typography, Card, CardContent, CardMedia, CircularProgress } from '@mui/material';
import { Link, useParams } from 'react-router-dom';
import useStyles from './styles';
import { useGetMovieQuery } from '../../services/TMDB';

function FeaturedMovie({ movie }) {
  const classes = useStyles();

  const { data, isFetching, error } = useGetMovieQuery(movie?.id);
  const searchIndexTrailer = data?.videos.results.findIndex((video) => (video.type === 'Trailer' || video.type === 'Teaser' || video.type === 'Clip'));

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

  if (!movie) {
    return null;
  }

  return (
    <Box component={Link} to={`/movie/${movie.id}`} className={classes.featuredCardContainer}>
      <Card className={classes.card} classes={{ root: classes.cardRoot }}>
        <CardMedia
          media="picture"
          alt={movie.title}
          image={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
          title={movie.title}
          className={classes.cardMedia}
        />
        <Box padding="20px" className={classes.boxContentCard}>
          <CardContent className={classes.cardContent} classes={{ root: classes.cardContentRoot }}>
            <Typography variant="h5" gutterBottom>
              {movie.title}
            </Typography>
            <Typography variant="body2">
              {movie.overview}
            </Typography>
          </CardContent>
        </Box>

        {data?.videos?.results?.length > 0 && (
          <iframe
            className={classes.video}
            title="Trailer"
            src={`https://www.youtube.com/embed/${data.videos.results[searchIndexTrailer].key}`}
            allow="autoplay"
            allowFullScreen

          />
        )}
      </Card>
    </Box>
  );
}

export default FeaturedMovie;

