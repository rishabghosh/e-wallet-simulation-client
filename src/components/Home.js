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
import Login from "./Login";
import SignUp from "./SignUp";

/**
 * should be a object message with keys like this
 */
const EMPTY_STRING = "";
const INCORRECT_CREDENTIAL_MESSAGE = "Incorrect username or password";
const USERNAME_EXISTS_MESSAGE = "Username already exists. Plz try another";
const FIELDS_EMPTY_MESSAGE = "Fields cannot be empty";

/* ========= LOGIN ========== */

/* =========== SIGNUP ========== */

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
