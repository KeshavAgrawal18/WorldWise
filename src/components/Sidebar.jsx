import { Outlet } from "react-router-dom";
import AppNav from "./AppNav";
import Footer from "./Footer";
import Logo from "./Logo";
import styles from "./sidebar.module.css"
function Sidebar() {
    return (
        <div className={styles.sidebar}>
            <Logo />
            <AppNav />
            <Outlet />
            {/* <p>List of cities</p> */}
            <Footer />

        </div>
    );
}

export default Sidebar;