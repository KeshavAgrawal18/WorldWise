import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../providers/AuthProvider";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signup, isAuthenticated, error, clearError } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true })

  }, [isAuthenticated, navigate]);

  function validateEmail(email) {
    // Regular expression for email validation
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(String(email).toLowerCase());
  }

  function validatePassword(password) {
    // Check if password is between 8 to 16 characters
    const lengthCheck = password.length >= 8 && password.length <= 16;

    // Check if password contains at least one digit
    const containsDigit = /[0-9]/.test(password);

    // Check if password contains at least one uppercase letter
    const containsUpperCase = /[A-Z]/.test(password);

    // Check if password contains at least one lowercase letter
    const containsLowerCase = /[a-z]/.test(password);

    // Check if password contains at least one special character
    const containsSpecialChar = /[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password);

    return (
      lengthCheck &&
      containsDigit &&
      containsUpperCase &&
      containsLowerCase &&
      containsSpecialChar
    );
  }

  function handleSubmit(e) {
    e.preventDefault();
    clearError();
    if (!email || !password || !name || !username) {
      setMessage("All fields are required");
      return;
    }
    if (!validateEmail(email)) {
      setMessage("Invalid email");
      return;
    }
    if (!validatePassword(password)) {
      let passwordError = '';
      if (password.length < 8 || password.length > 16) {
        passwordError = "Password length must be between 8 to 16 characters.";
      } else if (!/[0-9]/.test(password)) {
        passwordError = "Password must contain at least one digit.";
      } else if (!/[A-Z]/.test(password)) {
        passwordError = "Password must contain at least one uppercase letter.";
      } else if (!/[a-z]/.test(password)) {
        passwordError = "Password must contain at least one lowercase letter.";
      } else if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password)) {
        passwordError = "Password must contain at least one special character.";
      }
      setMessage(passwordError);
      return;
    }
    if (password !== confimPassword) {
      setMessage("Password and Confirm Password do not match");
      return;
    }
    setMessage(signup(email, username, password));
  }
  return (
    <>
      <main className={styles.login}>
        <PageNav />
        <form className={styles.form}>
          <h2>Sign Up</h2>
          <div className={styles.row}>
            <label htmlFor="name">Name</label>
            <input
              type="name"
              id="name"
              onChange={(e) => {
                setName(e.target.value)
              }}
              placeholder={"jack"}
              value={name}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="username">Username</label>
            <input
              type="name"
              id="username"
              onChange={(e) => setUsername(e.target.value)}
              placeholder={"max 12 characters allowed"}
              value={username}
              maxLength={12}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="email">Email address</label>
            <input
              type="email"
              id="email"
              onChange={(e) => setEmail(e.target.value)}
              placeholder={"jack@example.com"}
              value={email}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value)
                setMessage('');
              }}
              placeholder={"min 8 to 16 characters"}
              value={password}
              maxLength={16}
              minLength={8}
            />
          </div>
          <div className={styles.row}>
            <label htmlFor="Confirm password">Confirm Password</label>
            <input
              type="password"
              id="confirmPassword"
              onChange={(e) => {
                setConfimPassword(e.target.value)
                setMessage('');
              }}
              placeholder={"min 8 to 16 characters"}
              value={confimPassword}
            />
          </div>

          <div className={`${styles.row} ${styles.big}`}>
            {message}
          </div>
          <div className={`${styles.row} ${styles.big}`}>
            {error}
          </div>

          <div>
            <Button type="primary" onClick={handleSubmit}>Sign Up</Button>
          </div>
        </form>
      </main >
    </>
  );
}
