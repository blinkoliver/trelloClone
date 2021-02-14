import React from "react";
import LoginForm from "./LoginForm";
import Avatar from "@material-ui/core/Avatar";
import Paper from "@material-ui/core/Paper";
import { NavLink, Route, useHistory } from "react-router-dom";
import Registration from "../Registration/Registration";
import { useSelector } from "react-redux";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import { DashboardRootState } from "../../redux/store";
import CssBaseline from "@material-ui/core/CssBaseline";
import Grid from "@material-ui/core/Grid";
import useStyles from "./LoginClasses";

const Login = () => {
  const history = useHistory();
  const loginClasses = useStyles();
  const userInfo = useSelector<DashboardRootState, any>(
    (state) => state.userInfo
  );
  if (userInfo.statusCode === 200) {
    history.push("/dashboard");
  }

  return (
    <Grid container className={loginClasses.root}>
      <CssBaseline />
      <Grid item xs={false} sm={4} md={7} className={loginClasses.image} />
      <Grid item xs={12} sm={8} md={5} component={Paper} elevation={6} square>
        <div className={loginClasses.paper}>
          <Avatar className={loginClasses.avatar}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h2" variant="h5">
            Don't have an account?{" "}
            <NavLink className={loginClasses.link} to={"/registration"}>
              Registration
            </NavLink>
          </Typography>
          <LoginForm />
        </div>
      </Grid>
      <Route color="inherit" path={"/registration"} component={Registration} />
    </Grid>
  );
};

export default Login;
