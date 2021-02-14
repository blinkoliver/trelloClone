import React, { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { httpPost } from "../../utils";
import { setUserInfoAC } from "../../redux/auth-reducer";
import Preloader from "../Preloader/Preloader";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import TextField from "@material-ui/core/TextField";

type FormValues = {
  username: string;
  email: string;
  password: string;
};

const RegistrationForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(false);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [message, setMessage] = useState("");
  const { handleSubmit, errors, control } = useForm<FormValues>();

  const useStyles = makeStyles((theme) => ({
    form: {
      width: "100%", // Fix IE 11 issue.
      marginTop: theme.spacing(3),
      display: "flex",
      flexDirection: "column",
    },
    submit: {
      margin: theme.spacing(3, 0, 2),
    },
  }));
  const classes = useStyles();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateData: FormValues = {
      username: data.username,
      email: data.email,
      password: data.password,
    };
    setIsFetching(true);
    httpPost(`/auth/registration`, updateData)
      .then((post) => {
        dispatch(setUserInfoAC(post));
        if (post.statusCode === 200) {
          localStorage.setItem("token", post.token);
          history.push("/dashboard");
          setFetchError(false);
        } else {
          setMessage(post.reason);
          setFetchError(true);
        }
        console.log(post);
      })
      .catch(() => setFetchError(true))
      .finally(() => setIsFetching(false));
  };
  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
      <Controller
        as={TextField}
        type="text"
        name="username"
        control={control}
        defaultValue=""
        placeholder="Username"
        rules={{ required: true }}
      />
      {errors.username && errors.username.type === "required" && (
        <Typography variant="h6">Required field</Typography>
      )}
      <Controller
        as={TextField}
        type="email"
        name="email"
        control={control}
        defaultValue=""
        placeholder="Email"
        rules={{ required: true, pattern: /^\S+@\S+$/i }}
      />
      {errors.email && errors.email.type === "required" && (
        <Typography variant="h6">required</Typography>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <Typography variant="h6">Incorect email</Typography>
      )}
      <Controller
        as={TextField}
        type="password"
        name="password"
        control={control}
        defaultValue=""
        placeholder="Password"
        rules={{
          minLength: {
            value: 3,
            message: "password must been more then 3 char",
          },
          required: "error message",
        }}
      />
      {errors.password && errors.password.type === "required" && (
        <Typography variant="h6">Required field</Typography>
      )}
      {errors.password?.type === "minLength" && "Your input exceed minLength"}
      <Typography variant="h6">{message}</Typography>
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Registration
      </Button>
      {isFetching ? <Preloader /> : <></>}
      {fetchError ? <Typography variant="h6">Name busy</Typography> : <></>}
    </form>
  );
};

export default RegistrationForm;
