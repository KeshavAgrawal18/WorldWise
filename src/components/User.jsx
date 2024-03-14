import { useNavigate } from "react-router-dom";
import { useAuth } from "../providers/AuthProvider";
import styles from "./User.module.css";

function User() {
  const { username, avatar, logout } = useAuth();
  const navigate = useNavigate();

  function handleClick() {
    logout();
    navigate("/");
  }

  return (
    <div className={styles.user}>
      <img src={avatar} alt={username} />
      <span>Welcome, {username}</span>
      <button onClick={handleClick}>Logout</button>
    </div>
  );
}

export default User;