import React, { useState } from "react";
import {
  BrowserRouter as Router,
  Route,
  Link,
  Redirect
} from "react-router-dom";
import "../styles/home.css";
import Login from "./Login";
import SignUp from "./SignUp";

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
