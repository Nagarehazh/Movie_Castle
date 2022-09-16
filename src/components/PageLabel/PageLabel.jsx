import React from 'react';
import { Typography, Button } from '@mui/material';
import useStyles from './styles';

function PageLabel({ currentPage, setPage, totalPage }) {
  const classes = useStyles();

  if (totalPage === 0) return null;

  const handlePrev = () => {
    if (currentPage !== 1) {
      setPage(currentPage - 1);
    }
  };

  const handleNext = () => {
    if (currentPage !== totalPage) {
      setPage((prev) => prev + 1);
    }
  };

  return (
    <div className={classes.container}>
      <Button onClick={handlePrev} className={classes.button} variant="contained" color="primary" type="button">Prev</Button>
      <Typography className={classes.pageNumber} variant="h4">{currentPage}</Typography>
      <Button onClick={handleNext} className={classes.button} variant="contained" color="primary" type="button">Next</Button>
    </div>
  );
}

export default PageLabel;
