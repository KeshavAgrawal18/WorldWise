import { useEffect, useState } from "react";
import styles from "./Login.module.css";
import PageNav from "../components/PageNav";
import { useAuth } from "../AuthProvider";
import { useNavigate } from "react-router-dom";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate("/app", { replace: true })

  }, [isAuthenticated]);
  function handleSubmit(e) {
    e.preventDefault();
    if (!email || !password)
      return;
    login(email, password);
  }

  return (
    <>
      <main className={styles.login}>
        <PageNav />
        <form className={styles.form}>
          <h2>Login</h2>
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
              onChange={(e) => setPassword(e.target.value)}
              placeholder={"qwerty"}
              value={password}
            />
          </div>

          <div>
            <Button type="primary" onClick={handleSubmit}>Login</Button>
          </div>
        </form>
      </main>
    </>
  );
}
