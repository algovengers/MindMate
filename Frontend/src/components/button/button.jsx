import styles from "./button.module.css";

function Button({ text, type, handleClick, style }) {
  return (
    <div className={styles.buttonContainer}>
      <button
        type={type}
        onClick={(e) => {
          handleClick(e);
        }}
        style={style ? style : {}}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
