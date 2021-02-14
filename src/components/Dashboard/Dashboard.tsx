// @ts-nocheck
import React, { useState, useEffect } from "react";
import { TasksType } from "../Todolist/Todolist";
import Todolist from "../Todolist/Todolist";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { Grid, Paper } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUserAC } from "../../redux/auth-reducer";
import Preloader from "../Preloader/Preloader";
import useStyles from "./DashboardClasses";
import Typography from "@material-ui/core/Typography";
import { DashboardRootState } from "../../redux/store";
import { UserInfoStateType } from "../../App";
import { useSelector } from "react-redux";

import {
  httpGet,
  httpPost,
  httpPut,
  httpDelete,
  mergeArrays,
} from "../../utils";

export type FilterValuesType = "all" | "completed" | "active";
export type TodolistsType = {
  todo_id: string;
  title: string;
  isDone: boolean;
  tasks: any;
  filter: FilterValuesType;
};
export type TasksStateType = {
  [key: string]: Array<TasksType>;
};

const Dashboard = () => {
  const [todolists, setTodolists] = useState<Array<TodolistsType>>([]);
  const [isFetching, setIsFetching] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const userInfo = useSelector<DashboardRootState, UserInfoStateType>(
    (state) => state.userInfo
  );
  const dispatch = useDispatch();
  const history = useHistory();
  const dashboardClasses = useStyles();

  const addTodolist = (title: string) => {
    setIsFetching(true);
    httpPost(`/todos`, { title: title })
      .then((post) => {
        //@ts-ignore
        setTodolists([...todolists, post]);
      })
      .catch((error) => {
        //@ts-ignore
        if (error.statusCode === 403) {
          setMessage("Login or Registrate for use dashboard");
          dispatch(logoutUserAC());
        } else {
          setMessage("Server error, please try later");
        }
      })
      //@ts-ignore
      .finally(() => setIsFetching(false));
  };
  const changeTodolist = (todo_id: string, updatedProps: any) => {
    const changedElement = todolists.filter((el) => el.todo_id === todo_id);
    //@ts-ignore
    changedElement[0][`${Object.keys(updatedProps)}`] = Object.values(
      updatedProps
    ).toString();
    setIsFetching(true);
    httpPut(`/todos/${todo_id}`, updatedProps)
      .then(() => {
        setTodolists(mergeArrays(todolists, changedElement));
      })
      .catch((error) => {
        //@ts-ignore
        if (error.statusCode === 403) {
          setMessage("Login or Registrate for use dashboard");
          dispatch(logoutUserAC());
        } else {
          setMessage("Server error, please try later");
        }
      })
      //@ts-ignore
      .finally(() => setIsFetching(false));
  };
  const removeTodolist = (todo_id: string) => {
    setIsFetching(true);
    httpDelete(`/todos/${todo_id}`)
      .then(() => {
        setTodolists(todolists.filter((el) => el.todo_id !== todo_id));
      })
      .catch((error) => {
        //@ts-ignore
        if (error.statusCode === 403) {
          setMessage("Login or Registrate for use dashboard");
          dispatch(logoutUserAC());
        } else {
          setMessage("Server error, please try later");
        }
      })
      //@ts-ignore
      .finally(setIsFetching(false));
  };
  useEffect(() => {
    setIsFetching(true);
    httpGet("/todos")
      .then((post) => {
        setTodolists(post);
      })
      .catch((error) => {
        if (error.statusCode === 403) {
          setMessage("Login or Registrate for use dashboard");
          dispatch(logoutUserAC());
        } else {
          setMessage("Server error, please try later");
        }
      })
      .finally(() => setIsFetching(false));
  }, [history, dispatch]);

  return isFetching ? (
    <Preloader />
  ) : (
    <div className={dashboardClasses.dashboard}>
      {userInfo.userInfo.statusCode === 200 ? (
        <Grid className={dashboardClasses.addForm} container>
          <AddItemForm addItem={addTodolist} />
        </Grid>
      ) : (
        <Typography
          className={dashboardClasses.typography}
          component="h2"
          variant="h3"
        >
          {message}
        </Typography>
      )}
      <Grid className={dashboardClasses.cards} container spacing={3}>
        {todolists.map((tl) => {
          return (
            <Grid key={tl.todo_id} item>
              <Paper key={tl.todo_id} style={{ padding: "10px" }}>
                <Todolist
                  key={tl.todo_id}
                  todo_id={tl.todo_id}
                  title={tl.title}
                  filter={tl.filter}
                  tasks={tl.tasks}
                  removeTodolist={removeTodolist}
                  changeTodolist={changeTodolist}
                />
              </Paper>
            </Grid>
          );
        })}
      </Grid>
    </div>
  );
};
export default Dashboard;
