import React, { useState, useEffect } from "react";


/**
 * should be a object message with keys like this
 */
const EMPTY_STRING = "";
const INCORRECT_CREDENTIAL_MESSAGE = "incorrect username or password";
const BLANK_CREDENTIAL_MESSAGE = "username or password cannot be blank";

const extractDetails = function(data) {
  const name = data[0].name;
  const amount = data[0].amount;
  return { name, amount };
};

const sendLoginCredentials = function(username, password, handleSetters) {
  fetch("/loginCredentials", {
    method: "POST",
    body: JSON.stringify({ username, password })
  })
    .then(res => res.json())
    .then(json => {
      handleSetters(json);
    });
};

/**
 * whenever name or password is changed
 * plz clear the notification
 * useEffect on change clear notification
 */
const Home = function(props) {
  const [password, setPassword] = useState(EMPTY_STRING);
  const [notification, setNotification] = useState(EMPTY_STRING);

  const handleUsernameChange = event => props.setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSetters = function(json) {
    if (json.incorrectCredentials) {
      setNotification(INCORRECT_CREDENTIAL_MESSAGE);
      return;
    }
    const data = extractDetails(json);
    props.setName(data.name);
    props.setAmount(data.amount);
    // setNotification("correct credentials");
    props.setCorrectCredentials(true);
  };

  const handleSubmit = function() {
    if (props.username && password) {
      sendLoginCredentials(props.username, password, handleSetters);
      return;
    }
    setNotification(BLANK_CREDENTIAL_MESSAGE);
  };

  useEffect(() => {
    setNotification(EMPTY_STRING);
  }, [props.username, password]);

  return (
    <div>
      <input
        placeholder="username"
        type="text"
        value={props.username}
        onChange={handleUsernameChange}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>login</button>
      <div>{notification}</div>
    </div>
  );
};

export default Home;
