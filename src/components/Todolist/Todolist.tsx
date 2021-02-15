// @ts-nocheck
import React from "react";
import s from "./todolist.module.css";
import { FilterValuesType } from "../Dashboard/Dashboard";
import { AddItemForm } from "../AddItemForm/AddItemForm";
import { EditableSpan } from "./EditableSpan/EditableSpan";
import { Button, Checkbox, IconButton } from "@material-ui/core";
import { Delete } from "@material-ui/icons";
import { green } from "@material-ui/core/colors";
import { v1 } from "uuid";
import UploadImg from "../UploadImg/UploadImg";

export type TasksType = {
  task_id: string;
  title: string;
  isDone: boolean;
};
export type TodolistPropsType = {
  todo_id: string;
  title: string;
  tasks: any;
  filter: FilterValuesType;
  removeTodolist: (todo_id: string) => void;
  changeTodolist: (todo_id: string, newTitle: string) => void;
};

const Todolist: React.FC<TodolistPropsType> = (props) => {
  const {
    todo_id,
    title,
    filter,
    tasks,
    changeTodolist,
    removeTodolist,
  } = props;
  let tasksArr: Array<TasksType> = JSON.parse(tasks);
  let renderTasks = [];
  switch (filter) {
    case "active":
      renderTasks = tasksArr.filter((element) => element.isDone === false);
      break;
    case "completed":
      renderTasks = tasksArr.filter((element) => element.isDone === true);
      break;
    default:
      renderTasks = tasksArr;
      break;
  }

  const addNewTask = (newTask: string) => {
    const createdTask = [
      ...tasksArr,
      { title: newTask, task_id: v1(), isDone: false, img: null },
    ];
    // @ts-ignore
    changeTodolist(todo_id, { tasks: JSON.stringify(createdTask) });
  };

  const removeTask = (task_id: string) => {
    const tasksWitoutDeleted = tasksArr.filter(
      (element) => element.task_id !== task_id
    );
    // @ts-ignore
    changeTodolist(todo_id, { tasks: JSON.stringify(tasksWitoutDeleted) });
  };

  const changeDoneStatus = (task_id: string, status: boolean) => {
    const updatedTasks = tasksArr.map((element) => {
      if (element.task_id === task_id) {
        element.isDone = status;
        return element;
      } else {
        return element;
      }
    });
    // @ts-ignore
    changeTodolist(todo_id, { tasks: JSON.stringify(updatedTasks) });
  };

  const changeFilter = (newFilter: string) => {
    // @ts-ignore
    changeTodolist(todo_id, { filter: newFilter });
  };

  const changeTitle = (newTitle: any) => {
    changeTodolist(todo_id, { title: newTitle });
  };

  return (
    <div>
      <h3>
        <EditableSpan title={title} onChange={changeTitle} />
        <IconButton aria-label="delete" onClick={() => removeTodolist(todo_id)}>
          <Delete fontSize="small" />
        </IconButton>
      </h3>
      <AddItemForm addItem={addNewTask} />
      <div>
        {renderTasks.map((t) => {
          let tag;
          if (t.img !== null) {
            tag = (
              <>
                <br />
                <img
                  src={t.img}
                  alt="img"
                  style={{ width: "100%", maxWidth: "270px" }}
                />
                <br />
                <hr />
              </>
            );
          } else if (t.isDone === false) {
            tag = (
              <>
                <br />
                <UploadImg
                  todo_id={todo_id}
                  changeTodolist={changeTodolist}
                  tasks={renderTasks}
                  task_id={t.task_id}
                />
                <br />
                <hr />
              </>
            );
          } else {
            tag = <></>;
          }
          return (
            <div key={t.task_id} className={t.isDone ? `${s.isDone}` : ""}>
              <Checkbox
                color="secondary"
                checked={t.isDone}
                onClick={() => changeDoneStatus(t.task_id, !t.isDone)}
              />
              <EditableSpan title={t.title} onChange={changeTitle} />
              <IconButton
                aria-label="delete"
                onClick={() => removeTask(t.task_id)}
              >
                <Delete fontSize="small" style={{ color: green[500] }} />
              </IconButton>
              {tag}
            </div>
          );
        })}
      </div>
      <div>
        <Button
          variant={filter === "all" ? `contained` : "text"}
          onClick={() => changeFilter("all")}
        >
          All
        </Button>
        <Button
          color={"primary"}
          variant={filter === "active" ? `contained` : "text"}
          onClick={() => changeFilter("active")}
        >
          Active
        </Button>
        <Button
          color={"secondary"}
          variant={filter === "completed" ? `contained` : "text"}
          onClick={() => changeFilter("completed")}
        >
          Completed
        </Button>
      </div>
    </div>
  );
};
export default Todolist;
