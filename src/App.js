import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";

import "./App.css";

const extractDetails = function(data) {
  const name = data[0].name;
  const amount = data[0].amount;
  return { name, amount };
};

const Home = function(props) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [notification, setNotification] = useState("");

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = function() {
    if (username && password) {
      setNotification("");
      sendLoginCredentials();
      // setUsername("");
      // setPassword("");
      return;
    }
    setNotification("username or password cannot be blank");
  };

  const sendLoginCredentials = function() {
    console.log("should handle submit");

    fetch("/loginCredentials", {
      method: "POST",
      body: JSON.stringify({ username, password })
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
        value={username}
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

const Profile = function(props) {
  console.log("rendering profile");
  return (
    <div>
      <p>name: {props.name}</p>
      <p>amount: {props.amount}</p>
    </div>
  );
};

const App = function() {
  const [name, setName] = useState("No user");
  const [amount, setAmount] = useState(0);
  const [correctCredentials, setCorrectCredentials] = useState(false);

  return (
    <div className="App">
      <Router>
        <Route
          path="/"
          exact
          render={() => (
            <Home
              setName={setName}
              setAmount={setAmount}
              setCorrectCredentials={setCorrectCredentials}
            />
          )}
        />
        <Route
          path="/"
          exact
          render={() => {
            if (correctCredentials) {
              return <Redirect to="/user" />;
            }
            console.log("wrong input");
          }}
        />
        <Route
          path="/user"
          exact
          render={() => <Profile name={name} amount={amount} />}
        />
      </Router>
    </div>
  );
};

export default App;
