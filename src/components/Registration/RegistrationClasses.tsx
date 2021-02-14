import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  paper: {
    paddingTop: theme.spacing(8),
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },
  avatar: {
    margin: theme.spacing(1),
    backgroundColor: theme.palette.secondary.main,
  },
  link: {
    textDecoration: "underline",
    padding: 0,
  },
  container: {
    backgroundColor: "rgba(255, 255, 255, 0.6)",
    color: "#333",
    backdropFilter: "blur(3px)",
    boxShadow: "2px 2px 10px 1px rgba(0, 0, 0, 0.75)",
  },
}));

export default useStyles;
