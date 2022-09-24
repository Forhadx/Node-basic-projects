import React, { useState } from "react";

const Reset = (props) => {
  const [email, setEmail] = useState("");

  return (
    <div className="login-page">
      {props.resetErr ? (
        <div className="error-message">{props.resetErr}</div>
      ) : null}
      {props.msgSend ? (
        <div className="send-message">Check your Email</div>
      ) : null}
      <form
        onSubmit={(e) => {
          props.onReset(e, { email });
          setEmail("");
        }}
        className="login-form"
      >
        {props.error ? (
          <div className="error-message">{props.error}</div>
        ) : null}
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter email address"
        />
        <button type="submit">reset</button>
      </form>
    </div>
  );
};

export default Reset;
