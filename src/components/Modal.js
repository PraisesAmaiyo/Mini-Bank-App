import Button from './Button';

export default function Modal({
  Overlay,
  showOverlay,
  setShowOverlay,
  success,
  setSuccess,
  setIsBlurred,
  onNewTransaction,
  onAmount,
  onSetAmount,
  onHandleBalance,
  onSelected,
  onSetSelected,
  balance,
  onTransactionList,
  showConfirmationModal,
  setShowConfirmationModal,
  name,
  setName,
  number,
  setNumber,
}) {
  function handleCancel() {
    setShowConfirmationModal(false);
    setShowOverlay(false); // Add this line to hide the overlay
  }

  function handleConfirmDuplicateNumber() {
    setShowConfirmationModal(false);
    setShowOverlay(!showOverlay);
    // setIsBlurred(false);
    const newTransaction = {
      id: crypto.randomUUID(),
      name,
      number,
      onAmount,
      type: onSelected,
    };

    onNewTransaction(newTransaction);
    onHandleBalance(newTransaction.onAmount);

    onSetSelected(onSelected);
    setName('');
    setNumber('');
    onSetAmount('');
  }

  function handleSuccess() {
    setSuccess(false);
    // setIsBlurred(false);
    setShowOverlay(!showOverlay);
  }

  return (
    <>
      {showOverlay && <Overlay />}

      <div className="modal">
        {success && (
          <div className="success-overlay">
            <div className="success-modal">
              <div className="icon">✅</div>
              <p>Transaction succesful</p>
              <div className="buttons">
                <Button onClick={handleSuccess}>OKAY</Button>
              </div>
            </div>
          </div>
        )}
      </div>
      <Overlay showOverlay={showOverlay} />
      {showConfirmationModal && (
        <div className="confirm-overlay">
          <div className="confirm-modal">
            <div className="icon">🤔</div>
            <p>
              There is an account with the Account Number {number}. <br /> Do
              you still want to proceed?
            </p>
            <div className="buttons">
              <Button onClick={handleCancel}>Cancel</Button>
              <Button onClick={handleConfirmDuplicateNumber}>Proceed</Button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
