import React, { useState } from "react";
import { Link } from "react-router-dom";

const Login = (props) => {
  const [email, setEmail] = useState("");
  const [password, setpassword] = useState("");

  return (
    <div className="login-page">
      <form
        onSubmit={(e) => props.onLogin(e, { email, password })}
        className="login-form"
      >
        {props.error ? <div className="error-message">{props.error}</div> : null}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter password"
        />
        <button type="submit">
          Login
        </button>
      </form>
      <div className="login-fail__link">
        <Link to="/reset">Forgotten Account?</Link>
        <Link to="/signup">Sign up</Link>
      </div>
    </div>
  );
};

export default Login;
