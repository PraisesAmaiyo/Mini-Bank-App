import Transaction from './Transaction';

export default function FullStatement({
  onTransactionList,
  onAmount,
  onSelected,
}) {
  return (
    <div className="scrollable-card full-scrollable-card">
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
