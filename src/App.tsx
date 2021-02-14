// @ts-nocheck
import React, { useEffect } from "react";
import Login from "./components/Login/Login";
import Registration from "./components/Registration/Registration";
import Home from "./components/Home/Home";
import Dashboard from "./components/Dashboard/Dashboard";
import { NavLink, Route, useHistory } from "react-router-dom";
import MenuIcon from "@material-ui/icons/Menu";
import { useDispatch, useSelector } from "react-redux";
import { authUserAC, logoutUserAC, UserInfoType } from "./redux/auth-reducer";
import { DashboardRootState } from "./redux/store";
import useStyles from "./AppClasses";
import {
  AppBar,
  IconButton,
  Toolbar,
  Container,
  Backdrop,
  useMediaQuery,
} from "@material-ui/core";
import Copyright from "./components/Copyright/Copiright";
import Menu from "./components/Menu/Menu";
import "./App.css";
import logo from "./assets/images/logo.svg";

export type UserInfoStateType = {
  [key: string]: Array<UserInfoType>;
};

const App = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const appClasses = useStyles();
  const [open, setOpen] = React.useState(false);
  const matches = useMediaQuery("(min-width:600px)");
  const userInfo = useSelector<DashboardRootState, UserInfoStateType>(
    (state) => state.userInfo
  );

  const logout = () => {
    dispatch(logoutUserAC());
    localStorage.removeItem("token");
    history.push("/home");
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleToggle = () => {
    setOpen(!open);
  };

  useEffect(() => {
    dispatch(authUserAC());
    if (userInfo.statusCode === 200) {
      history.push("/home");
    }
  }, [dispatch, history, userInfo.statusCode]);

  return (
    <div className={appClasses.root}>
      <AppBar className={appClasses.header} position="static">
        <Toolbar className={appClasses.toolbar}>
          <div className="left-menu">
            {!matches ? (
              <IconButton
                edge="start"
                color="inherit"
                aria-label="menu"
                className={appClasses.menuButton}
                onClick={handleToggle}
              >
                <MenuIcon />
              </IconButton>
            ) : (
              <></>
            )}
            {matches ? (
              <>
                <NavLink to={"/home"} className={appClasses.link}>
                  <img src={logo} alt="logo" />
                </NavLink>

                <NavLink className={appClasses.link} to={"/dashboard"}>
                  Dashboard
                </NavLink>
              </>
            ) : (
              <></>
            )}
          </div>
          <div className="right-menu">
            {userInfo.userInfo.statusCode !== 200 ? (
              <NavLink to={"/login"}>Login</NavLink>
            ) : (
              userInfo.userInfo.username
            )}
            {userInfo.userInfo.statusCode !== 200 ? (
              <NavLink to={"/registration"}>Registration</NavLink>
            ) : (
              <NavLink to={"/home"} onClick={() => logout()}>
                Logout
              </NavLink>
            )}
          </div>
        </Toolbar>
      </AppBar>
      <Container className={appClasses.main} component="main">
        <Route color="inherit" path={"/login"} component={Login} />
        <Route color="inherit" path={"/dashboard"} component={Dashboard} />
        <Route color="inherit" path={"/home"} component={Home} />
        <Route
          color="inherit"
          path={"/registration"}
          component={Registration}
        />
      </Container>
      <footer className={appClasses.footer}>
        <Container className={appClasses.footerContainer} maxWidth="sm">
          {matches ? (
            <a href="https://rs.school/js/">
              <img
                className="footer__logo-img"
                src="https://rs.school/images/rs_school_js.svg"
                alt="Rolling Scopes"
              />
            </a>
          ) : (
            <></>
          )}
          <Copyright></Copyright>
          <div className="footer__authors">
            <p>Created by:</p>
            <ul className="footer__authors-list">
              <li className="footer__authors-link">
                <a href="https://github.com/blinkoliver">blinkoliver</a>
              </li>
              <li className="footer__authors-link">
                <a href="https://github.com/maximLomako">maximlomako</a>
              </li>
              <li className="footer__authors-link">
                <a href="https://github.com/antipea">antipea</a>
              </li>
            </ul>
          </div>
        </Container>
      </footer>
      <Backdrop
        className={appClasses.backdrop}
        open={open}
        onClick={handleClose}
      />
      {open ? <Menu handleClose={handleClose}></Menu> : <></>}
    </div>
  );
};
export default App;
