import { useRef, useState } from "react";
import "../assets/style.css";
import { apiUrl, lsAuthKey } from "./App.jsx";

/**
 * @param {FormData} data
 * @return {object}
 */
function formDataToObject(data) {
  return [...data.entries()].reduce((acc, it) => {
    acc[it[0]] = it[1];
    return acc;
  }, {});
}

const Auth = () => {
  const [isLoading, setLoading] = useState(false);
  const [isSuccess, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const formRef = useRef(null);

  async function onSubmitHandler(ev) {
    ev.preventDefault();

    const formData = new FormData(formRef.current);

    const options = {
      method: "POST",
      body: JSON.stringify(formDataToObject(formData)),
      headers: { "Content-Type": "application/json; charset=utf-8" },
    };

    setError(null);
    setSuccess(false);
    setLoading(true);

    try {
      const response = await fetch(`${apiUrl}/auth/login`, options);
      const respData = await response.json();

      if (!response.ok) {
        setError(respData.error);
      } else {
        console.log(respData);
        setSuccess(true);

        setTimeout(() => {
          window.localStorage.setItem(lsAuthKey, respData.id);
          window.location.reload();
        }, 500);
      }
    } catch (e) {
      setError("Во время выполнения запроса произошла ошибка");
      console.error(e);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <h1>Авторизация</h1>

      <form id="login-form" onSubmit={onSubmitHandler} ref={formRef}>
        <div className="test-form">
          <label>
            <span style={{ marginRight: "8px" }}>Логин</span>
            <input type="text" name="user_login" autoComplete="username" />
          </label>

          <label>
            <span style={{ marginRight: "8px" }}>Пароль</span>
            <input type="password" name="user_password" autoComplete="current_password" />
          </label>
        </div>

        <input
          type="submit"
          value="Отправить"
          disabled={isLoading}
          {...(isLoading ? { style: { cursor: "progress" } } : {})}
        />

        {error && (<p className="form-error">{error}</p>)}
        {isSuccess && (<p className="form-success">Авторизация прошла успешно</p>)}
      </form>
    </>
  );
};

export default Auth;
