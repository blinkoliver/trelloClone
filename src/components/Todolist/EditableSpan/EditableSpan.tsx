import React, { ChangeEvent, useState, KeyboardEvent } from "react";
import { TextField } from "@material-ui/core"

type EditableSpanPropsType = {
  title: string
  onChange: (newValue: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {
  const [editMode, setEditMode] = useState(false);
  const [title, setTitle] = useState('');
  const activateEditMode = () => {
    setEditMode(true);
    setTitle(props.title)
  };
  const activateViewMod = () => {
    setEditMode(false);
    props.onChange(title);
  };
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => setTitle(e.currentTarget.value)

  const onKeyPressHandler = (e: KeyboardEvent<HTMLInputElement>) => {
    const { key } = e;
    if (key === "Enter") {
      setEditMode(false);
      props.onChange(title);
    }
  };
  return editMode ? (
    <TextField
      onBlur={activateViewMod}
      onChange={onChangeHandler}
      value={title}
      autoFocus
      onKeyPress={onKeyPressHandler}
    />
  ) : (
    <span onDoubleClick={activateEditMode}>{props.title}</span>
  );
}