import React, { useState } from "react";
import { Link } from "react-router-dom";

const Signup = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");
  const [name, setName] = useState("");

  return (
    <div className="login-page">
      <form
        onSubmit={(e) => props.onSignup(e, { email, password, name })}
        className="login-form"
      >
        {props.error ? <div className="error-message">{props.error}</div> : null}
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter Email"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">Signup</button>
      </form>
      <div className="login-fail__link">
        <Link to="/login">Login Account?</Link>
      </div>
    </div>
  );
};

export default Signup;
