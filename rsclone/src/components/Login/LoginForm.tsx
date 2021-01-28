import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { httpPost } from "../../utils";
import { useDispatch } from "react-redux";
import { setUserInfoAC } from "../../redux/auth-reducer";
import { useHistory } from "react-router-dom";

type FormValues = {
  email: string;
  password: string;
};

const LoginForm = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const [fetchError, setFetchError] = useState(false);
  const { register, handleSubmit, errors } = useForm<FormValues>();

  const onSubmit: SubmitHandler<FormValues> = async (data) => {
    const updateData: FormValues = {
      email: data.email,
      password: data.password,
    };
    httpPost(`/auth/login`, updateData)
      .then((post) => {
        dispatch(setUserInfoAC(post));
        if (post.statusCode === 200) {
          localStorage.setItem("token", post.token);
          history.push("/");
          setFetchError(false);
        } else {
          setFetchError(true);
        }
        console.log(post);
      })
      .catch(() => setFetchError(true));
  };

  return (
    <form className="login-form" onSubmit={handleSubmit(onSubmit)}>
      <input
        type="email"
        placeholder="Email"
        name="email"
        ref={register({ required: true, pattern: /^\S+@\S+$/i })}
      />
      {errors.email && errors.email.type === "required" && (
        <p>Required field</p>
      )}
      {errors.email && errors.email.type === "pattern" && (
        <p>Invalid email</p>
      )}
      <input
        type="password"
        placeholder="Password"
        name="password"
        ref={register({
          minLength: {
            value: 3,
            message: "password must been more then 3 char",
          },
          required: "error message",
        })}
      />
      {errors.password && errors.password.type === "required" && (
        <p>Required field</p>
      )}
      {errors.password?.type === "minLength" && "Your input exceed minLength"}
      <button className="login-submit" type="submit">
        Login
      </button>
      {fetchError ? <p>Invalid email or password</p> : <></>}
    </form>
  );
};

export default LoginForm;
