import { Grid, Typography } from "@mui/material";

const Welcome = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Welcome to Job Portal</Typography>
      </Grid>
    </Grid>
  );
};

export const ErrorPage = (props) => {
  return (
    <Grid
      container
      item
      direction="column"
      alignItems="center"
      justifyContent="center"
      sx={{ padding: "30px", minHeight: "93vh" }}
    >
      <Grid item>
        <Typography variant="h2">Error 404</Typography>
      </Grid>
    </Grid>
  );
};

export default Welcome;
