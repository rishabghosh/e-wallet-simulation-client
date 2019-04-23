import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import { useInput, useAction } from "../customHooks";
import FetchRequest from "../fetchRequest";
import "../styles/login.css";

/**
 * should be a object message with keys like this
 */
const EMPTY_STRING = "";
const INCORRECT_CREDENTIAL_MESSAGE = "Incorrect username or password";
const USERNAME_EXISTS_MESSAGE = "Username already exists. Plz try another";
const FIELDS_EMPTY_MESSAGE = "Fields cannot be empty";

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

const SignUp = function(props) {
  const [username, handleUsernameChange] = useInput(EMPTY_STRING);
  const [password, handlePasswordChange] = useInput(EMPTY_STRING);
  const [name, handleNameChange] = useInput(EMPTY_STRING);

  const runOnChangeOf = [username, password, name];
  const [errorMessage, setErrorMessage] = useAction(
    EMPTY_STRING,
    runOnChangeOf
  );

  const handleNotification = function(json) {
    if (json.duplicateUsername) {
      setErrorMessage(USERNAME_EXISTS_MESSAGE);
      return;
    }
    props.setValidData(true);
    setErrorMessage(
      "Account created successfully. Plz go back to the login page"
    );
  };

  const handleSubmit = function() {
    if (username && password && name) {
      const fetchRequest = new FetchRequest("/signupCredentials");
      fetchRequest.postJson({ username, password, name }, handleNotification);
      return;
    }
    setErrorMessage(FIELDS_EMPTY_MESSAGE);
  };

  return (
    <div>
      <div className="signup-form">
        <div>
          <strong>Sign Up</strong>
        </div>

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

        <div className="error">{errorMessage}</div>
        <Link to="/">Click here to login</Link>
      </div>
    </div>
  );
};

const signedUp = function() {
  return (
    <div>
      <p>account created successfully.. plz go back to login page</p>
      <span>Goto: </span>
      <Link to="/">Login page</Link>
    </div>
  );
};

const Home = function(props) {
  const [validData, setValidData] = useState(false);
  const signUpProps = { setValidData };

  const redirectOnSignUp = function() {
    if (validData) {
      return <Redirect to="signedUp" />;
    }
  };

  return (
    <main>
      <Router>
        <Route path="/" exact render={() => <Login {...props} />} />
        <Route path="/signup" exact render={redirectOnSignUp} />
        <Route
          path="/signup"
          exact
          render={() => <SignUp {...signUpProps} />}
        />
        <Route path="/signedUp" exact render={signedUp} />
      </Router>
    </main>
  );
};

export default Home;
