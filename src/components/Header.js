import { useState } from 'react';
import Button from './Button';

export default function Header({
  onSetShowForm,
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
