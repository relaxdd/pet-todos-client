import { useRef } from "react";
import Todos from "./Todos.jsx";
import Auth from "./Auth.jsx";

export const lsAuthKey = "_auth_mysql_is_ready";
export const apiUrl = "http://localhost:5000/api";

function getIsAuth() {
  return Boolean(window.localStorage.getItem(lsAuthKey));
}

function App() {
  const isAuth = useRef(getIsAuth());
  return isAuth.current ? <Todos /> : <Auth />;
}

export default App;
