import React from "react";
import useStyles from "./MenuClasses";
import { NavLink } from "react-router-dom";
import { Typography, Container } from "@material-ui/core";

type MenuPropsType = {
  handleClose: () => void;
};

const Menu: React.FC<MenuPropsType> = (props) => {
  const { handleClose } = props;
    const menuClasses = useStyles();
    
  return (
    <Container className={menuClasses.menu}>
      <NavLink to={"/home"} className={menuClasses.link} onClick={handleClose}>
        <Typography variant="h6">rsCloneTrello</Typography>
      </NavLink>
      <NavLink
        className={menuClasses.link}
        to={"/dashboard"}
        onClick={handleClose}
      >
        Dashboard
      </NavLink>
    </Container>
  );
};
export default Menu;
