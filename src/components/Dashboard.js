export default function Dashboard({ balance }) {
  return (
    <div>
      <h1 className="header">Hello Praises 🙂</h1>
      <p className="sub-header">Your balance is ${balance}</p>
      <p className="mini-header">
        Click on the Send or Receive buttons to perform a transaction 🤑💰🤑{' '}
        <br />
        Click on the Statement button to see your transactions so far📜📃
      </p>
    </div>
  );
}
