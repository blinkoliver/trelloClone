import { IconButton, TextField } from "@material-ui/core";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import { ControlPoint } from "@material-ui/icons";
import useStyles from "./AddItemFormClasses";

type AddItemFormPropsTYpe = {
  addItem: (title: string) => void;
};

export const AddItemForm: React.FC<AddItemFormPropsTYpe> = (props) => {
  const { addItem } = props;
  const [newTaskTitle, setNewTaskTitle] = useState("");
  const [error, setError] = useState<string | null>(null);
  const addItemFormClasses = useStyles();
  const onNewTitleChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    if (newTaskTitle.trim() === "") {
    }
    setNewTaskTitle(e.currentTarget.value);
    setError(null);
  };
  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Enter") {
      addItem(newTaskTitle);
      setNewTaskTitle("");
    }
  };
  const addTaskHandler = () => {
    if (newTaskTitle.trim() === "") {
      setError("Title is required");
      return;
    }
    addItem(newTaskTitle.trim());
    setNewTaskTitle("");
  };
  return (
    <div>
      <TextField
        className={addItemFormClasses.textField}
        variant={"outlined"}
        label="Type Value"
        multiline
        rowsMax={4}
        value={newTaskTitle}
        onChange={onNewTitleChangeHandler}
        onKeyPress={onKeyPressHandler}
        error={!!error}
        helperText={error}
      />
      <IconButton onClick={addTaskHandler}>
        <ControlPoint color="primary" />
      </IconButton>
    </div>
  );
};
