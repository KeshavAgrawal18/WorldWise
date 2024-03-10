import styles from "./Sidebar.module.css"

function Footer() {
    return (
        <footer className={styles.footer}>
            <p className={styles.copyright}>&copy; CopyRight {new Date().getFullYear()} by WorldWise</p>
        </footer>
    );
}

export default Footer;