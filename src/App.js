import React, { useState } from "react";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import Home from "./Home";
import Profile from "./Profile";
import { useInput } from "./customHooks";
import "./App.css";


/**
 * can name, amount and correctCredentials converted into custom hooks ???
 */
const App = function() {
  const [username, handleUsernameChange] = useInput("");
  const [name, setName] = useState("No user");
  const [amount, setAmount] = useState(0);
  const [correctCredentials, setCorrectCredentials] = useState(false);

  const homeProperties = {
    setName,
    setAmount,
    setCorrectCredentials,
    username,
    handleUsernameChange
  };

  const profileProperties = { name, amount, setAmount, username };

  const redirectToUser = function() {
    if (correctCredentials) return <Redirect to="/user" />;
  };

  return (
    <div className="App">
      <Router>
        <Route path="/" exact render={() => <Home {...homeProperties} />} />
        <Route path="/" exact render={redirectToUser} />
        <Route
          path="/user"
          exact
          render={() => <Profile {...profileProperties} />}
        />
      </Router>
    </div>
  );
};

export default App;
