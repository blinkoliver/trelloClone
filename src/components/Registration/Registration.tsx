import React from "react";
import RegistrationForm from "./RegistrationForm";
import { NavLink, Route, useHistory } from "react-router-dom";
import Login from "../Login/Login";
import { useSelector } from "react-redux";
import { DashboardRootState } from "../../redux/store";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import useStyles from "./RegistrationClasses";

const Registration = () => {
  const history = useHistory();
  const registrationClasses = useStyles();
  const userInfo = useSelector<DashboardRootState, any>(
    (state) => state.userInfo
  );
  if (userInfo.statusCode === 200) {
    history.push("/dashboard");
  }
  
  return (
    <Container className={registrationClasses.container} maxWidth="xs">
      <CssBaseline />
      <div className={registrationClasses.paper}>
        <Avatar className={registrationClasses.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Аlready registered?{" "}
          <NavLink className={registrationClasses.link} to={"/login"}>
            Login
          </NavLink>
        </Typography>
        <RegistrationForm />
      </div>
      <Route color="inherit" path={"/login"} component={Login} />
    </Container>
  );
};

export default Registration;
