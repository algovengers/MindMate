import styles from "./button.module.css";

function Button({ text, type, handleClick, style, logging }) {
  return (
    <div
      className={`${
        logging ? styles.loggingButtonContainer : styles.buttonContainer
      } mt-4`}
    >
      <button
        type={type}
        onClick={(e) => {
          handleClick(e);
        }}
        style={style}
      >
        {text}
      </button>
    </div>
  );
}

export default Button;
