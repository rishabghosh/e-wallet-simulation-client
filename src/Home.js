import React from "react";
import { BrowserRouter as Router, Route, Link } from "react-router-dom";
import { useInput, useAction } from "./customHooks";
import FetchRequest from "./FetchRequest";
import "./Login.css";

/**
 * should be a object message with keys like this
 */
const EMPTY_STRING = "";
const INCORRECT_CREDENTIAL_MESSAGE = "Incorrect username or password";

const extractDetails = function(data) {
  const name = data[0].name;
  const amount = data[0].amount;
  return { name, amount };
};

const sendLoginCredentials = function(username, password, handleSetters) {
  const fetchRequest = new FetchRequest("/loginCredentials");
  fetchRequest.postJson({ username, password }, handleSetters);
};

/* ========= LOGIN ========== */

const Login = function(props) {
  const [password, handlePasswordChange] = useInput(EMPTY_STRING);
  const renderOnChangeOf = [props.username, password];
  const [errorMessage, setErrorMessage] = useAction(
    EMPTY_STRING,
    renderOnChangeOf
  );

  const handleSetters = function(json) {
    if (json.incorrectCredentials) {
      setErrorMessage(INCORRECT_CREDENTIAL_MESSAGE);
      return;
    }
    const data = extractDetails(json);
    props.setName(data.name);
    props.setAmount(data.amount);
    props.setCorrectCredentials(true);
  };

  const handleSubmit = function() {
    if (props.username && password) {
      sendLoginCredentials(props.username, password, handleSetters);
      return;
    }
    setErrorMessage(INCORRECT_CREDENTIAL_MESSAGE);
  };

  return (
    <div className="loginForm">
      <div>
        <strong>User Login</strong>
      </div>

      <input
        placeholder="username"
        type="text"
        value={props.username}
        onChange={props.handleUsernameChange}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>login</button>

      <div className="error"> {errorMessage}</div>

      <Link to="/signup" className="link">
        Click here to signup
      </Link>
    </div>
  );
};

/* =========== SIGNUP ========== */

const SignUp = function() {
  const [username, handleUsernameChange] = useInput(EMPTY_STRING);
  const [password, handlePasswordChange] = useInput(EMPTY_STRING);
  const [name, handleNameChange] = useInput(EMPTY_STRING);

  const runOnChangeOf = [username, password, name];
  const [notification, setNotification] = useAction(
    EMPTY_STRING,
    runOnChangeOf
  );

  const handleNotification = function(json) {
    console.log(json);
    if (json.duplicateUsername) {
      setNotification("username already exists.. plz try another username");
      return;
    }
    setNotification("account created successfully plz go back to login page");
  };

  /** should handle username already exception */
  const handleSubmit = function() {
    if (username && password && name) {
      const fetchRequest = new FetchRequest("/signupCredentials");
      fetchRequest.postJson({ username, password, name }, handleNotification);
      return;
    }
    setNotification("fields cannot be empty");
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
        placeholder="name"
        type="text"
        value={name}
        onChange={handleNameChange}
      />
      <input
        placeholder="password"
        type="password"
        value={password}
        onChange={handlePasswordChange}
      />
      <button onClick={handleSubmit}>signup</button>
      <p>{notification}</p>
      <Link to="/">Click here to login</Link>
    </div>
  );
};

const Home = function(props) {
  return (
    <main>
      <Router>
        <Route path="/" exact render={() => <Login {...props} />} />
        <Route path="/signup" exact render={() => <SignUp />} />
      </Router>
    </main>
  );
};

export default Home;
