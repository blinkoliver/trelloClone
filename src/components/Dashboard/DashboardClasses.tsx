import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  dashboard: {
    backgroundImage: "url(https://source.unsplash.com/random)",
    backgroundRepeat: "no-repeat",
    backgroundColor:
      theme.palette.type === "light"
        ? theme.palette.grey[50]
        : theme.palette.grey[900],
    backgroundSize: "cover",
    backgroundPosition: "center",
    width: "100%",
  },
  addForm: {
    padding: "20px",
    display: "flex",
    justifyContent: "center",
  },
  cards: {
    width: "100%",
    display: "flex",
    justifyContent: "space-around",
    margin: 0,
  },
  typography: {
    textAlign: "center",
    paddingTop: "5vh",
    textShadow: "3px 4px 2px rgba(147, 147, 147, 1)",
    color: "white",
  },
}));
export default useStyles;
