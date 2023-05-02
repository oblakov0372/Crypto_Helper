import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./Registration.module.scss";
import { useDispatch } from "react-redux";
import LoadingSpinner from "../../components/loadingSpinner/LoadingSpinner";
import { anonymRequest, toErrorMessage } from "../../utils/Request";

type registerType = {
  email: string;
  password: string;
};

const Registration = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [isSubmiting, setIsSubmiting] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [errorMessage, setErrorMessage] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [repeatedPassword, setRepeatedPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    const data: registerType = {
      email: email,
      password: password,
    };

    if (password != repeatedPassword) {
      setErrorMessage("Password mismatch");
      setIsError(true);
      return;
    }

    try {
      setIsSubmiting(true);
      const response = await anonymRequest(
        "User/registration",
        { method: "post" },
        data
      );
      setIsSubmiting(false);
      setIsError(false);
      navigate("/login");
    } catch (error: any) {
      setIsError(true);
      if (error.code === "ERR_NETWORK" || error.response.status === 401) {
        setErrorMessage(toErrorMessage(error));
      } else if (error.response.status === 400) {
        setErrorMessage("User with this email already registered");
      }
      setIsSubmiting(false);
    }
  };

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
            Register
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

export default Registration;
