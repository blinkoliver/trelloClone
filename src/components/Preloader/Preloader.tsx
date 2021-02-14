// @ts-nocheck
import loading from "../../assets/images/loading.svg";

const loaderContainerStyles = {
  display: "flex",
  justifyContent: "center",
  width: "20vh",
  alignSelf: "center",
  margin: "0 auto",
};

const Preloader = () => {
  return (
    <div style={loaderContainerStyles}>
      <img src={loading} alt="logo" />
    </div>
  );
};

export default Preloader;
