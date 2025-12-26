import styles from "./Button.module.css";

function ButtonBack({ onClick }) {
  return (
    <button className={styles.btn} onClick={onClick}>
      &larr;
    </button>
  );
}

export default ButtonBack;
