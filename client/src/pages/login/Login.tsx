import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Login.module.scss";

const Login = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

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
          <button className={styles.button}>Log in</button>
        </form>
      </div>
    </div>
  );
};

export default Login;
