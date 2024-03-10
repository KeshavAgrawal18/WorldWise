import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../AuthProvider";
import Button from "../components/Button";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confimPassword, setConfimPassword] = useState("");
  const [message, setMessage] = useState("");
  const { signup, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true })

  }, [isAuthenticated]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password || !name || !username)
      return;
    if (password !== confimPassword) {
      setMessage("Password and Confirm Password does not match");
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

          <div className={styles.row}>
            {message}
          </div>

          <div>
            <Button type="primary" onClick={handleSubmit}>Sign Up</Button>
          </div>
        </form>
      </main>
    </>
  );
}
