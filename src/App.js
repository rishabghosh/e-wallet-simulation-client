import React, { useState } from "react";

import "./App.css";

const extractDetails = function(data) {
  const name = data[0].name;
  const amount = data[0].amount;
  return { name, amount };
};

const Home = function(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = function() {
    console.log("should handle submit");
    // setUsername("");
    // setPassword("");
    fetch("/loginCredentials", {
      method: "POST",
      body: JSON.stringify({ username, password })
    })
      .then(res => res.json())
      .then(json => extractDetails(json))
      .then(data => {
        props.setName(data.name);
        props.setAmount(data.amount);
      });
  };

  return (
    <div>
      <input
        placeholder="username"
        value={username}
        onChange={handleUsernameChange}
      />
      <input
        placeholder="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>login</button>
    </div>
  );
};

const App = function() {
  const [name, setName] = useState("No user");
  const [amount, setAmount] = useState(0);

  return (
    <div className="App">
      <Home setName={setName} setAmount={setAmount} />
      <div>
        <p>name: {name}</p>
        <p>amount: {amount}</p>
      </div>
    </div>
  );
};

export default App;
