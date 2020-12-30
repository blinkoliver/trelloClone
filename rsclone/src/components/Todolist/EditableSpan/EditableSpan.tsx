import React, {ChangeEvent, useState} from "react";

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

  return (
    editMode
      ? <input onBlur={activateViewMod}
               onChange={onChangeHandler}
               value={title} autoFocus
      />
      : <span onDoubleClick={activateEditMode}>{props.title}</span>
  )
}