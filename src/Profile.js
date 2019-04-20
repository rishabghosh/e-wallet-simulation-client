import React, { useState } from "react";
import { useInput, useAction } from "./customHooks";

const Profile = function(props) {
  const [addedAmount, handleAddedAmount, resetAddedAmount] = useInput(0);
  const renderOnChangeOf = [addedAmount];
  const [notification, setNotification] = useAction("", renderOnChangeOf);

  const updateAmount = function() {
    if (!(+addedAmount >= 0)) {
      setNotification("Invalid amount");
      return;
    }
    const newAmount = props.amount + +addedAmount;
    props.setAmount(newAmount);
    resetAddedAmount();

    fetch("/updateAmount", {
      method: "POST",
      body: JSON.stringify({ newAmount, username: props.username })
    });
  };

  return (
    <div>
      <p>name: {props.name}</p>
      <p>amount: {props.amount}</p>
      <input
        placeholder="amount"
        value={addedAmount}
        onChange={handleAddedAmount}
      />
      <button onClick={updateAmount}>add</button>
      <div>{notification}</div>
    </div>
  );
};

export default Profile;
