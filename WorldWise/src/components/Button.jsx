import styles from "./Button.module.css";
function Button({ type, onClick, children }) {
  return (
    <button className={`${styles[type]} ${styles.btn}`} onClick={onClick}>
      {children}
    </button>
  );
}

export default Button;
