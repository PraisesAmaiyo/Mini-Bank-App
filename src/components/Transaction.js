export default function Transaction({ transaction }) {
  return (
    <li className="list">
      {transaction.type === 'send' ? (
        <h3>
          ➖ You sent {transaction.name} a total of $
          {transaction.amount || transaction.onAmount} 💳
        </h3>
      ) : transaction.type === 'receive' ? (
        <h3>
          ➕ You received a total of $
          {transaction.amount || transaction.onAmount} from {transaction.name}💵
        </h3>
      ) : (
        <h3>
          ❌ Insufficient balance for a $
          {transaction.amount || transaction.onAmount} transaction.😏
        </h3>
      )}
    </li>
  );
}
