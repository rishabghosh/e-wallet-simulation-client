import React from "react";
import { Link } from "react-router-dom";
import { useInput, useAction } from "../customHooks";
import FetchRequest from "../fetchRequest";
import { ERROR_MESSAGE, EMPTY_STRING } from "../constants";
import "../styles/profile.css";

const Profile = function(props) {
  const [addedAmount, handleAddedAmount, resetAddedAmount] = useInput(0);
  const [usernameOfReceiver, handleUsernameOfReceiver] = useInput("");
  const [payAmount, handlePayAmount] = useInput(0);

  const renderOnChangeOf = [addedAmount];
  const [notification, setNotification] = useAction(
    EMPTY_STRING,
    renderOnChangeOf
  );

  const displayAmount = function(json) {
    props.setAmount(json.amount);
  };

  const updateNewAmountToDB = function(oldAmount) {
    const newAmount = oldAmount + +addedAmount;
    const fetchRequest = new FetchRequest("/updateAmount");
    fetchRequest.postJson(
      { newAmount, username: props.username },
      displayAmount
    );
  };

  const manageAmountInDB = function() {
    const fetchRequest = new FetchRequest("/getCurrentAmount");
    fetchRequest.postJson({ username: props.username }, json => {
      updateNewAmountToDB(json.amount);
    });
  };

  const updateAmount = function() {
    if (!(+addedAmount >= 0)) {
      setNotification(ERROR_MESSAGE.invalidAmount);
      return;
    }
    manageAmountInDB();
    resetAddedAmount();
  };

  const handlePayment = function() {
    console.log("pay button is")
    const pay = new FetchRequest("/pay");
    pay.postJson({ payAmount, usernameOfReceiver });
  };

  return (
    <main>
      <header>
        <div>WalletX</div>
        <div className="user-info">
          <span>{props.amount}</span>
          <span>{props.name}</span>
          <Link to="/">logout</Link>
        </div>
      </header>

      <section>
        <Link to="/">logout</Link>
        <p>name: {props.name}</p>
        <p>amount: {props.amount}</p>
        <input value={addedAmount} onChange={handleAddedAmount} />
        <button onClick={updateAmount}>add</button>
        <div>{notification}</div>
      </section>
      <section>
        <span>username</span>
        <input value={usernameOfReceiver} onChange={handleUsernameOfReceiver} />
        <span>amount</span>
        <input value={payAmount} onChange={handlePayAmount} />
        <button onClick={handlePayment}>Pay</button>
      </section>

      <footer />
    </main>
  );
};

export default Profile;
