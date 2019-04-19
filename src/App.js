import React, { useState } from "react";
import "./App.css";

const Home = function() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = event => setUsername(event.target.value);
  const handlePasswordChange = event => setPassword(event.target.value);

  const handleSubmit = function() {
    console.log("should handle submit");
    setUsername("");
    setPassword("");
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
  return (
    <div className="App">
      <Home />
    </div>
  );
};

export default App;
