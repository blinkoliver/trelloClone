import { combineReducers, createStore, applyMiddleware } from "redux";
import { todolistsReducer } from "./todolists-reducer";
import { authReducer } from "./auth-reducer";
import thunk from "redux-thunk";

const rootReducer = combineReducers({
  userInfo: authReducer,
  todolists: todolistsReducer,
});

export type DashboardRootState = ReturnType<typeof rootReducer>;
export const store = createStore(rootReducer, applyMiddleware(thunk));

// @ts-ignore
window.store = store;
