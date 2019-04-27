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

  const updateOrNotify = function(json) {
    if (json.failed) {
      setNotification("cant process");
      return;
    }
    displayAmount(json);
  };

  const handlePayment = function() {
    const pay = new FetchRequest("/pay");
    pay.postJson(
      { username: props.username, usernameOfReceiver, payAmount },
      updateOrNotify
    );
  };

  const handleAmountView = function(json) {
    if (json.invalid) {
      setNotification(ERROR_MESSAGE.invalidAmount);
      return;
    }
    displayAmount(json);
    resetAddedAmount();
  };

  const sendAmountToBackend = function() {
    const fetchRequest = new FetchRequest("/add");
    fetchRequest.postJson(
      { username: props.username, addedAmount: +addedAmount },
      handleAmountView
    );
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
        <button onClick={sendAmountToBackend}>add</button>
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
