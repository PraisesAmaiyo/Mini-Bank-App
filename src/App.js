import { useState } from 'react';

const transactions = [
  {
    type: 'received',
    number: 933372,
    name: 'Sarah',
    amount: 1500,
  },
  {
    type: 'send',
    number: 118836,
    name: 'Clark',
    amount: 300,
  },
  {
    type: 'send',
    number: 499476,
    name: 'Anthony',
    amount: 200,
  },
];

function Button({ children, onClick, disabled }) {
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

function TransactionBtn({ children, onClick }) {
  return (
    <button className="transaction-button" onClick={onClick}>
      {children}
    </button>
  );
}

export default function App() {
  const [transactionList, setTransactionList] = useState(transactions);
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState('receive');
  const [showForm, setShowForm] = useState(true);
  const [fullStatement, setFullStatement] = useState(false);

  function handleNewTransaction(transaction) {
    setTransactionList((transactionList) => [...transactionList, transaction]);
  }

  // function handleBalance(value) {
  //   if (balance <= 0) {
  //     return;
  //   }

  //   selected === 'send'
  //     ? setBalance((balance) => Number(balance - value))
  //     : setBalance((balance) => Number(balance + value));
  // }

  function handleBalance(value) {
    if (balance <= 0) {
      return;
    }

    if (selected === 'send') {
      const newBalance = balance - value;
      if (newBalance >= 0) {
        setBalance(newBalance);
      }
    } else {
      setBalance(balance + value);
    }
  }

  return (
    <div className="app">
      <Dashboard
        balance={balance}
        onAmount={amount}
        onHandleBalance={handleBalance}
      />
      <Header
        onSetShowForm={setShowForm}
        onSetFullStatement={setFullStatement}
        onSetSelected={setSelected}
        onSelected={selected}
      />
      <div className="info">
        {showForm && (
          <SendForm
            onNewTransaction={handleNewTransaction}
            onAmount={amount}
            onSetAmount={setAmount}
            onHandleBalance={handleBalance}
            onSelected={selected}
            onSetSelected={setSelected}
            balance={balance}
          />
        )}

        {showForm && (
          <Statement
            onTransactionList={transactionList}
            onAmount={amount}
            onSelected={selected}
            onSetSelected={setSelected}
          />
        )}
      </div>

      {fullStatement && (
        <FullStatement
          onTransactionList={transactionList}
          onAmount={amount}
          onSelected={selected}
          onSetSelected={setSelected}
        />
      )}
    </div>
  );
}

function Dashboard({ balance, onAmount, onHandleBalance }) {
  return (
    <div>
      <h1 className="header">Hello Praises 🙂</h1>
      <p className="sub-header">Your balance is ${balance}</p>
    </div>
  );
}

function Header({
  onSetShowForm,
  onSelected,
  onSetSelected,
  onSetFullStatement,
}) {
  const [sendEnabled, setSendEnabled] = useState(true);
  const [receiveEnabled, setReceiveEnabled] = useState(true);

  function handleSend() {
    // onSetShowForm((show) => !show);
    onSetSelected('send');
    setSendEnabled(false);
    setReceiveEnabled(true);
    // onSetFullStatement((show) => !show);
  }

  function handleReceive() {
    // onSetShowForm((show) => !show);
    onSetSelected('receive');
    setReceiveEnabled(false);
    setSendEnabled(true);
    // onSetFullStatement((show) => !show);
  }
  function handleStatement() {
    onSetShowForm((show) => !show);
    onSetFullStatement((show) => !show);
    onSetSelected('send');
  }

  return (
    <div className="buttons">
      <Button onClick={handleSend} disabled={!sendEnabled}>
        📤👆Send
      </Button>

      <Button onClick={handleReceive} disabled={!receiveEnabled}>
        📤👇Receive
      </Button>

      <Button onClick={handleStatement}>📜🤑Statement</Button>
    </div>
  );
}

function SendForm({
  onNewTransaction,
  onAmount,
  onSetAmount,
  onHandleBalance,
  onSelected,
  onSetSelected,
  balance,
}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    // if (!name || !number || !onAmount) return;

    const newTransaction = {
      name,
      number,
      onAmount,
      type: onSelected,
    };

    onNewTransaction(newTransaction);
    onHandleBalance(newTransaction.onAmount);

    onSetSelected('send');
    setName('');
    setNumber('');
    onSetAmount('');
  }

  return (
    <form onSubmit={handleSubmit} className="card">
      <h2> {onSelected === 'send' ? 'Debit' : 'Credit'} Transaction</h2>
      <select
        value={onSelected}
        onChange={(e) => onSetSelected(e.target.value)}
        disabled
        className="transaction-select"
      >
        <option value={'send'}>SENDING</option>
        <option value={'receive'}>RECEIVING</option>
      </select>

      <p>
        You are carrying out {onSelected === 'send' ? 'Debit' : 'Credit'}{' '}
        transaction
      </p>

      <p>
        Account Name
        <input
          className="input-field"
          type="text"
          placeholder="Account name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </p>

      <p>
        Account Number
        <input
          className="input-field"
          type="text"
          placeholder="Account number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        />
      </p>

      <p>
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
  );
}

function Statement({ onTransactionList, onAmount, onSelected, onSetSelected }) {
  return (
    <div className="scrollable-card">
      {onTransactionList.map((transaction) => (
        <Transaction
          onAmount={onAmount}
          transaction={transaction}
          key={transaction.number}
          onSelected={onSelected}
        />
      ))}
    </div>
  );
}

function FullStatement({
  onTransactionList,
  onAmount,
  onSelected,
  onSetSelected,
}) {
  return (
    <div className="scrollable-card full-scrollable-card">
      {onTransactionList.map((transaction) => (
        <Transaction
          onAmount={onAmount}
          transaction={transaction}
          key={transaction.number}
          onSelected={onSelected}
        />
      ))}
    </div>
  );
}

function Transaction({ transaction, onSelected }) {
  return (
    <li>
      {transaction.type === 'send' ? (
        <h3>
          💔 You sent {transaction.name} a total of $
          {transaction.amount || transaction.onAmount}
        </h3>
      ) : (
        <h3>
          💚 You received a total of $
          {transaction.amount || transaction.onAmount} from {transaction.name}
        </h3>
      )}
    </li>
  );
}
