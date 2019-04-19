import React, { useState } from "react";

const extractDetails = function(data) {
  const name = data[0].name;
  const amount = data[0].amount;
  return { name, amount };
};

const Home = function(props) {
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const handleUsernameChange = event => props.setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = function() {
    if (props.username && password) {
      setNotification("");
      sendLoginCredentials();
      return;
    }
    setNotification("username or password cannot be blank");
  };

  const sendLoginCredentials = function() {
    console.log("should handle submit");

    fetch("/loginCredentials", {
      method: "POST",
      body: JSON.stringify({ username: props.username, password })
    })
      .then(res => res.json())
      .then(json => {
        if (json.incorrectCredentials) {
          setNotification("incorrect username or password");
          return;
        }
        const data = extractDetails(json);
        props.setName(data.name);
        props.setAmount(data.amount);
        setNotification("correct credentials");
        props.setCorrectCredentials(true);
      });
  };

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
      <div />
    </div>
  );
};

export default Home;
