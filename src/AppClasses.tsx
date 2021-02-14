import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    height: "100vh",
  },
  header: {
    height: "10%",
  },
  main: {
    padding: 0,
    margin: 0,
    maxWidth: "2048px",
    minHeight: "79%",
    display: "flex",
    flexGrow: 1,
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
  },
  footer: {
    padding: 0,
    height: "initial",
    backgroundColor: theme.palette.primary.main,
  },
  backdrop: {
    zIndex: theme.zIndex.drawer + 1,
    color: "#fff",
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
  },
  footerContainer: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  link: {
    alignSelf: "center",
    textDecoration: "none",
  },
}));
export default useStyles;
