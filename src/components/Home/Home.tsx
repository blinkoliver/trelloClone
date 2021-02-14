import React from "react";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import useStyles from "./HomeClasses";

const Home = () => {
  const homeClasses = useStyles();

  return (
    <Grid container className={homeClasses.root}>
      <Grid item xs={12} sm={12} md={12} className={homeClasses.image}>
        <div className={homeClasses.title}>
          <Typography component="h1" variant="h3" className = {homeClasses.typography}>
            CloneTaskade: organize anything!
          </Typography>
          <Typography component="h4" variant="h6" className = {homeClasses.typography}>
            Infinitely flexible. Incredibly easy to use. It's free.
            CloneTaskade keeps track of everything, from the big picture to the
            minute details.
          </Typography>
        </div>
      </Grid>
    </Grid>
  );
};

export default Home;
