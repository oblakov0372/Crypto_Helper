import React, { useState } from "react";
import { Link } from "react-router-dom";
import styles from "./Registration.module.scss";

const Registration = () => {
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  return (
    <div className={styles.container}>
      <div className={styles.menu}>
        <div>
          <h1>Do you already have an account?</h1>
          <p>Log in to access all the platform's features.</p>
        </div>
        <button>
          <Link to={"/login"}>Log in</Link>
        </button>
      </div>
      <div className={styles.login}>
        <h1 className={styles.title}>Registration</h1>
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
              id="repeatedPassword"
              type={showPassword ? "text" : "password"}
              value={repeatedPassword}
              onChange={(e) => setRepeatedPassword(e.target.value)}
              className={styles.input}
              placeholder="Repeat Password"
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
          <button className={styles.button}>Register</button>
        </form>
      </div>
    </div>
  );
};

export default Registration;
