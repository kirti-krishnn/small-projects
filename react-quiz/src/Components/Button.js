function Button({ onClick, children }) {
  return (
    <div>
      <button className="btn btn-ui" onClick={onClick}>
        {children}
      </button>
    </div>
  );
}

export default Button;
