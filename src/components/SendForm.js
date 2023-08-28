import TransactionBtn from './TransactionBtn';

export default function SendForm({
  onNewTransaction,
  onAmount,
  onSetAmount,
  onHandleBalance,
  onSelected,
  onSetSelected,
  balance,
  onTransactionList,
  setIsBlurred,
  showConfirmationModal,
  setShowConfirmationModal,
  success,
  setSuccess,
  name,
  setName,
  number,
  setNumber,
  showOverlay,
  setShowOverlay,
}) {
  function handleSubmit(e) {
    const id = crypto.randomUUID();
    e.preventDefault();

    if (!name || !number || !onAmount) return;

    if (onSelected === 'send' && onAmount > balance) {
      const insufficientTransaction = {
        id,
        name,
        number,
        onAmount,
        type: 'insufficient',
      };

      onNewTransaction(insufficientTransaction);
      return;
    }

    const duplicateNumber = onTransactionList.map((transaction) =>
      Number(transaction.number)
    );

    if (duplicateNumber.includes(Number(number))) {
      setShowConfirmationModal(true);
      setShowOverlay(!showOverlay);
      return;
    }
    setShowOverlay(false);
    const newTransaction = {
      id,
      name,
      number,
      onAmount,
      type: onSelected,
    };

    onNewTransaction(newTransaction);
    onHandleBalance(newTransaction.onAmount);

    // Prepend the new transaction to the beginning of the list
    // onTransactionList.unshift(newTransaction);
    onSetSelected(onSelected);
    setName('');
    setNumber('');
    onSetAmount('');

    if (handleSubmit) {
      setSuccess(true);
      setShowOverlay(true); // Show overlay when success occurs
    }
  }

  return (
    <>
      <form onSubmit={handleSubmit} className="card">
        <h2 className={`${onSelected === 'send' ? 'debit' : 'credit'}`}>
          {' '}
          {onSelected === 'send' ? 'Debit' : 'Credit'} Transaction
        </h2>
        <select
          value={onSelected}
          onChange={(e) => onSetSelected(e.target.value)}
          disabled
          className="transaction-select"
        >
          <option value={'send'}>SENDING</option>
          <option value={'receive'}>RECEIVING</option>
          <option value={'insufficient'}>Insufficient</option>
        </select>

        <p className="form-item">
          Account Name
          <input
            className="input-field"
            type="text"
            placeholder="Account name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </p>

        <p className="form-item">
          Account Number
          <input
            className="input-field"
            type="text"
            placeholder="Account number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
        </p>

        <p className="form-item">
          Amount
          <input
            className="input-field"
            type="text"
            placeholder="Amount"
            value={onAmount}
            onChange={(e) => onSetAmount(Number(e.target.value))}
          />
        </p>

        <TransactionBtn className="transaction-button">
          {onSelected === 'send' ? 'Send' : 'Receive'}
        </TransactionBtn>
      </form>
    </>
  );
}
