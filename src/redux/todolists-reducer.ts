import { TodolistsType } from "../components/Dashboard/Dashboard";
import { v1 } from "uuid";

type RemoveTodolistActionType = {
  type: "REMOVE-TODOLIST";
  todo_id: string;
};
type AddTodolistActionType = {
  type: "ADD-TODOLIST";
  title: string;
  todo_id: string;
};
type ChangeTodolistActionType = {
  type: "CHANGE-TODOLIST";
  todo_id: string;
  updatedProps: any;
};
type ActionsType =
  | RemoveTodolistActionType
  | AddTodolistActionType
  | ChangeTodolistActionType;

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistsType> = [
  {
    todo_id: todolistId1,
    title: "Whats to lear",
    filter: "all",
    isDone: false,
    tasks: [],
  },
  {
    todo_id: todolistId2,
    title: "What to do",
    filter: "all",
    isDone: false,
    tasks: [],
  },
];
export const todolistsReducer = (
  state: Array<TodolistsType> = initialState,
  action: ActionsType
): Array<TodolistsType> => {
  switch (action.type) {
    case "REMOVE-TODOLIST": {
      return state.filter((tl) => tl.todo_id !== action.todo_id);
    }
    case "ADD-TODOLIST": {
      return [
        {
          todo_id: action.todo_id,
          title: action.title,
          filter: "all",
          isDone: false,
          tasks: [],
        },
        ...state,
      ];
    }
    case "CHANGE-TODOLIST": {
      const todolist = state.find((tl) => tl.todo_id === action.todo_id);
      if (todolist) {
        todolist.title = action.updatedProps;
      }
      return [...state];
    }
  }
  return state;
};
export const removeTodolistAC = (
  todolistId: string
): RemoveTodolistActionType => {
  return { type: "REMOVE-TODOLIST", todo_id: todolistId };
};
export const addTodolistAC = (title: string): AddTodolistActionType => {
  return { type: "ADD-TODOLIST", title: title, todo_id: v1() };
};
export const changeTodolistAC = (
  todo_id: string,
  updatedProps: any
): ChangeTodolistActionType => {
  return {
    type: "CHANGE-TODOLIST",
    todo_id: todo_id,
    updatedProps: updatedProps,
  };
};
