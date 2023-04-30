import React, { useState } from "react";
import { Link, Route, useNavigate } from "react-router-dom";
import styles from "./Login.module.scss";
import { anonymRequest } from "../../utils/Request";
import { useDispatch } from "react-redux";
import { login } from "../../redux/slices/auth";
type loginType = {
  email: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const submit = async () => {
    const data: loginType = {
      email: email,
      password: password,
    };

    try {
      const response = await anonymRequest(
        "User/login",
        { method: "post" },
        data
      );
      dispatch(login(response.data));
      navigate("/");
    } catch (error) {
      console.log(error);
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
        <form className={styles.form}>
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
          <button
            type="button"
            onClick={() => submit()}
            className={styles.button}
          >
            Log in
          </button>
        </form>
      </div>
    </div>
  );
};

export default Login;
