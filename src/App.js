import { useState } from 'react';

const transactions = [
  {
    type: 'send',
    number: 118836,
    name: 'Clark',
    amount: 500,
  },
  {
    type: 'received',
    number: 933372,
    name: 'Sarah',
    amount: 200,
  },
  {
    type: 'send',
    number: 499476,
    name: 'Anthony',
    amount: 800,
  },
];

function Button({ children }) {
  return <button>{children}</button>;
}

export default function App() {
  const [transactionList, setTransactionList] = useState(transactions);
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState('send');

  function handleNewTransaction(transaction) {
    setTransactionList((transactionList) => [...transactionList, transaction]);

    console.log(transactionList);
  }

  function handleBalance(value) {
    selected === 'send'
      ? setBalance((balance) => Number(balance - value))
      : setBalance((balance) => Number(balance + value));
  }

  return (
    <div
      style={{
        margin: '5rem auto',
        textAlign: 'center',
        display: 'grid',
        justifyContent: 'center',
        alignContent: 'center',
      }}
    >
      <Dashboard
        balance={balance}
        onAmount={amount}
        onHandleBalance={handleBalance}
      />
      <Header />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr',
          gridTemplateRows: '1fr',
          gap: '2rem',
        }}
      >
        <SendForm
          onNewTransaction={handleNewTransaction}
          onAmount={amount}
          onSetAmount={setAmount}
          onHandleBalance={handleBalance}
          onSelected={selected}
          onSetSelected={setSelected}
        />
        <Statement
          onTransactionList={transactionList}
          onAmount={amount}
          onSelected={selected}
          onSetSelected={setSelected}
        />
      </div>
    </div>
  );
}

function Dashboard({ balance, onAmount, onHandleBalance }) {
  return (
    <div>
      <div>Hello Praises 🙂</div>
      <div>Your balance is ${balance}</div>
    </div>
  );
}

function Header() {
  return (
    <div
      style={{
        margin: '3rem',
        display: 'flex',
        justifyContent: 'space-between',
        // textAlign: 'center',
      }}
    >
      <Button>📤👆Send</Button>
      <Button>📤👇Receive</Button>
      <Button>📜🤑Statement</Button>
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
}) {
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !number || !onAmount) return;

    const newTransaction = {
      name,
      number,
      onAmount,
      type: onSelected,
    };
    console.log(newTransaction);

    onNewTransaction(newTransaction);
    onHandleBalance(newTransaction.onAmount);

    onSetSelected('send');
    setName('');
    setNumber('');
    onSetAmount('');
  }

  return (
    <form
      onSubmit={handleSubmit}
      style={{
        width: '20rem',
        height: '15rem',
        border: '3px solid blue',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
      <select
        value={onSelected}
        onChange={(e) => onSetSelected(e.target.value)}
      >
        <option value={'send'}>Send</option>
        <option value={'receive'}>Receive</option>
      </select>

      <p>Carrying out XXX transaction</p>

      <p>
        Account Name
        <input
          type="text"
          placeholder="Account name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </p>

      <p>
        Account Number
        <input
          type="text"
          placeholder="Account number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        ></input>
      </p>

      <p>
        Amount
        <input
          type="text"
          placeholder="Amount"
          value={onAmount}
          onChange={(e) => onSetAmount(Number(e.target.value))}
        ></input>
      </p>

      <Button>{onSelected === 'send' ? 'Send' : 'Receive'}</Button>
    </form>
  );
}

function Statement({ onTransactionList, onAmount, onSelected, onSetSelected }) {
  return (
    <div
      style={{
        listStyle: 'none',
        width: '20rem',
        height: '15rem',
        border: '3px solid green',
        textAlign: 'center',
        padding: '2rem',
      }}
    >
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
