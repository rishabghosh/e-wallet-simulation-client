import React from "react";
import { Link } from "react-router-dom";
import { useInput, useAction } from "../customHooks";
import FetchRequest from "../fetchRequest";
import { ERROR_MESSAGE, EMPTY_STRING } from "../constants";

const Profile = function(props) {
  const [addedAmount, handleAddedAmount, resetAddedAmount] = useInput(0);
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

  return (
    <div>
      <Link to="/">signout</Link>
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
