export default function TransactionBtn({ children, onClick }) {
  return (
    <button className="transaction-button" onClick={onClick}>
      {children}
    </button>
  );
}
