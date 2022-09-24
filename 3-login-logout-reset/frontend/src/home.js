import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = (props) => {
  const [user, setUser] = useState();

  const {token} = props

  useEffect(() => {
    axios
      .get("http://localhost:8080/user", {
        headers: {
          Authorization: "Bearer " + token,
        },
      })
      .then((res) => {
        setUser(res.data.user);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);

  return (
    <div className="home-page">
      <h1>Home page</h1>
      {user ? (
        <div>
          <h2>My name : <span>{user.name}</span></h2>
          <h2>My name : <span>{user.email}</span></h2>
        </div>
      ) : null}
      <button onClick={props.logout} className="logout-btn">logout</button>
    </div>
  );
};

export default Home;
