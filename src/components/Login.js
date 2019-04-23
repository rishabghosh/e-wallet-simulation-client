import React from "react";
import { Link } from "react-router-dom";
import { useInput, useAction } from "../customHooks";
import FetchRequest from "../fetchRequest";

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

export default Login;
