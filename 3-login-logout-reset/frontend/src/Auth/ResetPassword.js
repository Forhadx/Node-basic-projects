import React, { useState } from "react";
import { withRouter } from 'react-router-dom'

const ResetPassword = (props) => {
  const [password, setpassword] = useState("");

  let token = props.match.params.rId;
  return (
    <div className="login-page">
      <form
        onSubmit={(e) => props.onNewPassword(e, { password, token })}
        className="login-form"
      >
        {props.error ? <div className="error-message">{props.error}</div> : null}
        <input
          type="password"
          value={password}
          onChange={(e) => setpassword(e.target.value)}
          placeholder="Enter new  password"
        />
        <button type="submit">
          Add new password
        </button>
      </form>
    </div>
  );
};

export default withRouter(ResetPassword);
