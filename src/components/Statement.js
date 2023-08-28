import Transaction from './Transaction';

export default function Statement({
  onTransactionList,
  onAmount,
  onSelected,
  onSetSelected,
}) {
  return (
    <div className="scrollable-card">
      <p className="sub-header">Transaction History 💸</p>
      {onTransactionList.map((transaction) => (
        <Transaction
          onAmount={onAmount}
          transaction={transaction}
          key={transaction.id}
          onSelected={onSelected}
        />
      ))}
    </div>
  );
}
