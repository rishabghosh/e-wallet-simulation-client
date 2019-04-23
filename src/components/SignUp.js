import React from "react";
import { Link } from "react-router-dom";
import { useInput, useAction } from "../customHooks";
import FetchRequest from "../fetchRequest";
const EMPTY_STRING = "";
const USERNAME_EXISTS_MESSAGE = "Username already exists. Plz try another";
const FIELDS_EMPTY_MESSAGE = "Fields cannot be empty";

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

export default SignUp;
