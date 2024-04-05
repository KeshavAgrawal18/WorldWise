import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../providers/AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated, error, clearError, isLoading: isLoadingUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true })

  }, [isAuthenticated, navigate]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!username || !password)
      return;
    login(username, password);
  }

  return (
    <>
      <main className={styles.login}>
        <PageNav />
        <form className={styles.form} style={{ opacity: isLoadingUser ? 0.7 : 1, pointerEvents: isLoadingUser ? "none" : 'auto' }}>
          <h2>Login</h2>
          <div className={styles.row}>
            <label htmlFor="username">Username</label>
            <input
              type="username"
              id="username"
              onChange={(e) => {
                setUsername(e.target.value)
                clearError();
              }}
              placeholder={"jack@example.com"}
              value={username}
            />
          </div>

          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => {
                setPassword(e.target.value)
                clearError();
              }}
              placeholder={"qwerty"}
              value={password}
            />
          </div>
          <div className={`${styles.row} ${styles.big}`}>
            {error}
          </div>
          <div>
            <Button type="primary" onClick={handleSubmit} disabled={isLoadingUser}>{isLoadingUser ? 'Logging...' : 'Login'}</Button>
          </div>
        </form>
      </main >
    </>
  );
}
