import React, { useState } from "react";

const Profile = function(props) {
  const [addedAmount, setAddedAmount] = useState(0);
  const handleAmount = event => setAddedAmount(event.target.value);

  const updateAmount = function() {
    const newAmount = +props.amount + +addedAmount;
    props.setAmount(newAmount);

    fetch("/updateAmount", {
      method: "POST",
      body: JSON.stringify({ newAmount, username: props.username })
    });
  };

  return (
    <div>
      <p>name: {props.name}</p>
      <p>amount: {props.amount}</p>
      <input placeholder="amount" value={addedAmount} onChange={handleAmount} />
      <button onClick={updateAmount}>add</button>
    </div>
  );
};

  export default Profile;
