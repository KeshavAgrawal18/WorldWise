/* eslint react/prop-types: 0 */
import styles from './Button.module.css'

function Button({ children, onClick, type, disabled }) {
    if (disabled)
        return (
            <button onClick={onClick} className={`${styles.btn} ${styles[type]}`} disabled={disabled}>
                {children}
            </button>
        );
    return (
        <button onClick={onClick} className={`${styles.btn} ${styles[type]}`}>
            {children}
        </button>
    );
}

export default Button;