import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  menu: {
    display: "flex",
    flexDirection: "column",
    paddingTop: "15%",
    position: "absolute",
    height: "100vh",
    width: "60vw",
    maxWidth: "300px",
    minWidth: "300px",
    top: 0,
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    color: "#333",
    zIndex: 1201,
    backdropFilter: "blur(3px)",
    boxShadow: "2px 2px 10px 1px rgba(0, 0, 0, 0.75)",
  },
  link: {
    textDecoration: "none",
  },
}));

export default useStyles;
