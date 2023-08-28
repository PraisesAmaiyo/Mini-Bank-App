export default function Button({ children, onClick, disabled }) {
  return (
    <button
      className={`action-button ${disabled ? 'disabled-button' : ''}`}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
