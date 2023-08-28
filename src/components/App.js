import { useState } from 'react';
import Dashboard from './Dashboard';
import Header from './Header';
import SendForm from './SendForm';
import Statement from './Statement';
import FullStatement from './FullStatement';
import Modal from './Modal';

const transactions = [
  {
    id: 1111,
    type: 'receive',
    number: 933372,
    name: 'Sarah',
    amount: 1500,
  },
  {
    id: 2222,
    type: 'send',
    number: 118836,
    name: 'Clark',
    amount: 300,
  },
  {
    id: 3333,
    type: 'send',
    number: 499476,
    name: 'Anthony',
    amount: 200,
  },
];

export default function App() {
  const [transactionList, setTransactionList] = useState(transactions);
  const [balance, setBalance] = useState(1000);
  const [amount, setAmount] = useState('');
  const [selected, setSelected] = useState('send');
  const [showForm, setShowForm] = useState(true);
  const [fullStatement, setFullStatement] = useState(false);
  const [isBlurred, setIsBlurred] = useState(false);
  const [showConfirmationModal, setShowConfirmationModal] = useState(false);
  const [success, setSuccess] = useState(false);
  const [showOverlay, setShowOverlay] = useState(false);
  const [name, setName] = useState('');
  const [number, setNumber] = useState('');

  function Overlay({ showOverlay }) {
    return <div className={`overlay ${showOverlay ? 'active' : ''}`} />;
  }

  function handleNewTransaction(transaction) {
    setTransactionList((transactionList) => [transaction, ...transactionList]);
  }

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
    <div className={`app ${isBlurred ? 'blurred' : ''}`}>
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
            onTransactionList={transactionList}
            onNewTransaction={handleNewTransaction}
            onAmount={amount}
            onSetAmount={setAmount}
            onHandleBalance={handleBalance}
            onSelected={selected}
            onSetSelected={setSelected}
            balance={balance}
            setBalance={setBalance}
            setIsBlurred={setIsBlurred}
            showConfirmationModal={showConfirmationModal}
            setShowConfirmationModal={setShowConfirmationModal}
            success={success}
            setSuccess={setSuccess}
            name={name}
            setName={setName}
            number={number}
            setNumber={setNumber}
            showOverlay={showOverlay}
            setShowOverlay={setShowOverlay}
          />
        )}

        {showForm && (
          <Statement
            onTransactionList={transactionList}
            onAmount={amount}
            onSelected={selected}
            onSetSelected={setSelected}
            balance={balance}
          />
        )}
      </div>

      <Modal
        success={success}
        setSuccess={setSuccess}
        setIsBlurred={setIsBlurred}
        onTransactionList={transactionList}
        onNewTransaction={handleNewTransaction}
        onAmount={amount}
        onSetAmount={setAmount}
        onHandleBalance={handleBalance}
        onSelected={selected}
        onSetSelected={setSelected}
        balance={balance}
        setBalance={setBalance}
        showConfirmationModal={showConfirmationModal}
        setShowConfirmationModal={setShowConfirmationModal}
        name={name}
        setName={setName}
        number={number}
        setNumber={setNumber}
        Overlay={Overlay}
        setShowOverlay={setShowOverlay}
        showOverlay={showOverlay}
      />

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
