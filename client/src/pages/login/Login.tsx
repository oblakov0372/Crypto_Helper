import React, { FormEventHandler, MouseEvent, useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { anonymRequest } from "../../utils/Request";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { toErrorMessage } from "../../utils/Error";
type loginType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data: loginType = {
      email: email,
      password: password,
    };

    try {
      setIsSubmiting(true);
      const response = await anonymRequest(
        "User/login",
        { method: "post" },
        data
      );
      dispatch(login(response.data));
      setIsSubmiting(false);
      setIsError(false);
      navigate("/");
    } catch (error: any) {
      setIsError(true);
      if (error.code === "ERR_NETWORK" || error.response.status === 401) {
        setErrorMessage(toErrorMessage(error));
      } else if (error.response.status === 400) {
        setErrorMessage("Invalid email or password");
      }
      setIsSubmiting(false);
    }
  };

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div>
          <h1>Registration for new user</h1>
          <p>If you don't have an account yet, please register.</p>
        </div>
        <button>
          <Link to={"/registration"}>Registration</Link>
        </button>
      </div>
      <div className={styles.login}>
        <h1 className={styles.title}>Log in</h1>
        <form onSubmit={handleSubmit} className={styles.form}>
          <div className={styles.inputWrapper}>
            <input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className={styles.input}
              placeholder="Email"
              required
            />
          </div>
          <div className={styles.inputWrapper}>
            <input
              id="password"
              type={showPassword ? "text" : "password"}
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className={styles.input}
              placeholder="Password"
              required
            />
          </div>
          {isError && (
            <h2 className="text-red-600 mb-3 font-extrabold">{errorMessage}</h2>
          )}
          <div className={styles.inputWrapper}>
            <input
              id="show-password"
              type="checkbox"
              checked={showPassword}
              onChange={() => setShowPassword((prev: boolean) => !prev)}
            />
            <label className="ml-2" htmlFor="show-password">
              Show Password
            </label>{" "}
          </div>
          <button type="submit" className={styles.button}>
            Log in
          </button>
        </form>
      </div>
      {isSubmiting && (
        <div className={styles.submitingWrapper}>
          <div className={styles.loadingSpinner}>
            <LoadingSpinner />
          </div>
        </div>
      )}
    </div>
  );
};

export default Login;
