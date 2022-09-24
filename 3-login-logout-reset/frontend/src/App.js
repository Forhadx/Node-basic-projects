import React, { useEffect, useState } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router";
import "./App.css";

import Axios from "axios";

import Login from "./Auth/login";
import Signup from "./Auth/signup";
import Reset from './Auth/reset';
import ResetPassword from './Auth/ResetPassword';

import Home from "./home";

const App = (props) => {
  const [token, setToken] = useState("");
  const [userId, setUserId] = useState("");
  const [errMsg, setErrMsg] = useState("");
  const [resetErr, setResetErr] = useState('');
  const [isAuth, setIsAuth] = useState(false);
  const [msgSend, setMsgSend] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const userId = localStorage.getItem("userId");
    const expiryDate = localStorage.getItem("expiryDate");
    if (!token || !expiryDate) return;
    if (new Date(expiryDate) <= new Date()) return;
    const remainingMilliseconds =
      new Date(expiryDate).getTime() - new Date().getTime();
    setIsAuth(true);
    setToken(token);
    setUserId(userId);
    setAutoLogout(remainingMilliseconds);
  }, []);


  const loginHandler = (event, authData) => {
    event.preventDefault();
    const data = {
      email: authData.email,
      password: authData.password,
    };
    Axios.post("http://localhost:8080/login", data)
      .then((res) => {
        setToken(res.data.token);
        setUserId(res.data.userId);
        setErrMsg("");
        setIsAuth(true);
        localStorage.setItem("token", res.data.token);
        localStorage.setItem("userId", res.data.userId);
        const milliseconds = 60 * 60 * 1000;
        const expiryDate = new Date(new Date().getTime() + milliseconds);
        localStorage.setItem("expiryDate", expiryDate);
        setAutoLogout(milliseconds);
        props.history.replace("/");
      })
      .catch((error) => {
        if (error.response) {
          setErrMsg(error.response.data.message);
        }
        setIsAuth(false);
      });
  };


  const SignupHandler = (event, authData) => {
    event.preventDefault();
    const data = {
      email: authData.email,
      password: authData.password,
      name: authData.name,
    };
    Axios.post("http://localhost:8080/signup", data)
      .then((res) => {
        setIsAuth(false);
        props.history.replace("/login");
      })
      .catch((err) => {
        if (err.response) {
          setErrMsg(err.response.data.message);
        }
        setIsAuth(false);
      });
  };


  const logoutHandler = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("expiryDate");
    setIsAuth(false);
  };


  const setAutoLogout = (milliseconds) => {
    setTimeout(() => {
      logoutHandler();
    }, milliseconds);
  };


  const ResetHandler = (event, authData) =>{
    event.preventDefault();
    Axios.post('http://localhost:8080/reset', {email: authData.email})
      .then(res =>{
        setResetErr('');
        setMsgSend(true);
      })
      .catch(err =>{
        setMsgSend(false);
        setResetErr(err.response.data.message);
      })
  }


  const newPasswordHandler = (event, authData) =>{
    event.preventDefault();
    Axios.post(`http://localhost:8080/reset/${authData.token}`, {password: authData.password})
      .then(res =>{
        props.history.replace("/login");
      })
      .catch(err =>{
        console.log(err);
      })
  }


  let routes = null;

  if (!isAuth) {
    console.log("xx");
    routes = (
      <Switch>
        <Route
          path="/login"
          render={(props) => (
            <Login {...props} onLogin={loginHandler} error={errMsg} />
          )}
        />
        <Route
          path="/signup"
          render={(props) => (
            <Signup {...props} onSignup={SignupHandler} error={errMsg} />
          )}
        />
        <Route
          path="/reset/:rId"
          render={props =>(
            <ResetPassword {...props} onNewPassword={newPasswordHandler} />
          )}
        />
        <Route
          path="/reset"
          render={props =>(
            <Reset {...props} onReset={ResetHandler} resetErr={resetErr}
            msgSend={msgSend} />
          )}
        />
        <Redirect to="/login" />
      </Switch>
    );
  }

  if (isAuth) {
    console.log("auth:", isAuth);
    routes = (
      <Switch>
        <Route
          path="/"
          render={(props) => (
            <Home
              {...props}
              logout={logoutHandler}
              token={token}
              userId={userId}
            />
          )}
        />
        <Redirect to="/" />
      </Switch>
    );
  }

  return <div className="App">{routes}</div>;
};

export default withRouter(App);
