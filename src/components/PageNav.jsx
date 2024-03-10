import { NavLink, Link } from "react-router-dom";
import styles from "./PageNav.module.css"
import Logo from "./Logo";
import { useAuth } from "../AuthProvider";
import { useState } from "react";

function PageNav() {
    const { isAuthenticated, username, logout } = useAuth();
    const [showDropdown, setShowDropdown] = useState(false);

    const handleDropdownToggle = () => {
        setShowDropdown(!showDropdown);
    };

    return (
        <nav className={styles.nav}>
            <Logo />
            <ul>
                <li>
                    <NavLink to="/products">products</NavLink>
                </li>
                <li>
                    <NavLink to="/pricing">Pricing</NavLink>
                </li>
                <li>
                    {!isAuthenticated && (
                        <>
                            <Link to="/signup" className="cta">Sign Up</Link>
                            <NavLink to="/login" style={{ padding: "1rem 2rem" }}>Login</NavLink>
                        </>
                    )}
                    {isAuthenticated && (
                        <div className={styles.dropdownContainer}>
                            <div className={styles.username} onClick={handleDropdownToggle}>
                                {username}
                            </div>
                            {showDropdown && (
                                <div className={styles.dropdownContent}>
                                    <button onClick={logout}>Logout</button>
                                </div>
                            )}
                        </div>
                    )}
                </li>
            </ul>
        </nav>
    );
}

export default PageNav;