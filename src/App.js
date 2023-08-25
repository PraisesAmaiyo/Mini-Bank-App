import { useState } from 'react';

const transactions = [
  {
    number: 118836,
    name: 'Clark',
    amount: 500,
  },
  {
    number: 933372,
    name: 'Sarah',
    amount: 200,
  },
  {
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

  function handleNewTransaction(transaction) {
    setTransactionList((transactionList) => [...transactionList, transaction]);
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
      <Dashboard />
      <Header />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, 1fr',
          gridTemplateRows: '1fr',
          gap: '2rem',
        }}
      >
        <SendForm onNewTransaction={handleNewTransaction} />
        <Statement onTransactionList={transactionList} />
      </div>
    </div>
  );
}

function Dashboard() {
  const [balance, setBalance] = useState(1000);
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

function SendForm({ onNewTransaction }) {
  const [selected, setSelected] = useState('send');
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');
  const [amount, setAmount] = useState('');

  function handleSubmit(e) {
    e.preventDefault();

    if (!name || !number || !amount) return;

    const newTransaction = {
      name,
      number,
      amount,
    };

    onNewTransaction(newTransaction);

    setSelected('');
    setName('');
    setNumber('');
    setAmount('');
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
      <select value={selected} onChange={(e) => setSelected(e.target.value)}>
        <option value={'send'}>Send</option>
        <option value={'receive'}>Receive</option>
      </select>

      <p>Carrying out XXX transaction</p>

      <p>
        Account Name{' '}
        <input
          type="text"
          placeholder="Account name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        ></input>
      </p>

      <p>
        Account Number{' '}
        <input
          type="text"
          placeholder="Account number"
          value={number}
          onChange={(e) => setNumber(e.target.value)}
        ></input>
      </p>

      <p>
        Amount{' '}
        <input
          type="text"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        ></input>
      </p>
      <Button>Send or Receive</Button>
    </form>
  );
}

function Statement({ onTransactionList }) {
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
        <Transaction transaction={transaction} key={transaction.number} />
      ))}
    </div>
  );
}

function Transaction({ transaction }) {
  return (
    <li>
      <h3>
        You sent {transaction.name} a total of ${transaction.amount}
      </h3>
    </li>
  );
}
