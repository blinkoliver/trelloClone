import { useState } from "react";
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { httpPost } from "../../utils";
import { useDispatch } from "react-redux";
import { setUserInfoAC } from "../../redux/auth-reducer";
import { useHistory } from "react-router-dom";
import React from "react";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Checkbox from "@material-ui/core/Checkbox";
import Typography from "@material-ui/core/Typography";
import { makeStyles } from "@material-ui/core/styles";
import Preloader from "../Preloader/Preloader";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState<boolean>(false);
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
      email: data.email,
      password: data.password,
    };
    setIsFetching(true);
    httpPost(`/auth/login`, updateData)
      .then((post) => {
        dispatch(setUserInfoAC(post));
        if (post.statusCode === 200) {
          localStorage.setItem("token", post.token);
          history.push("/dashboard");
          setFetchError(false);
        } else {
          setMessage("Invlid email or password");
          setFetchError(true);
        }
      })
      .catch(() => setFetchError(true))
      //@ts-ignore
      .finally(() => setIsFetching(false));
  };

  return (
    <form className={classes.form} onSubmit={handleSubmit(onSubmit)}>
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
        <Typography variant="h6">Required field</Typography>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <Typography variant="h6">Invalid email</Typography>
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
      <FormControlLabel
        control={<Checkbox value="remember" color="primary" />}
        label="Remember me"
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        className={classes.submit}
      >
        Login
      </Button>
      {isFetching ? <Preloader /> : <></>}
      {fetchError ? (
        <Typography variant="h6">Invalid email or password</Typography>
      ) : (
        <></>
      )}
    </form>
  );
};

export default LoginForm;
