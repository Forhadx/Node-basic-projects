import React, { useState } from "react";
import axios from "axios";

import "./App.css";
import Image from "./Image";

const App = () => {
  const [title, setTitle] = useState("");
  const [price, setPrice] = useState("");
  const [image, setImage] = useState("");

  const submitHandler = (event) => {
    event.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("price", price);
    formData.append("image", image);
    console.log("f: ", formData);

    axios
      .post("http://localhost:5000/add", formData)
      .then((res) => {
        console.log("res: ", res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div className="App">
      <form onSubmit={submitHandler}>
        <input
          type="text"
          placeholder="name"
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          type="number"
          placeholder="price"
          y
          onChange={(e) => setPrice(e.target.value)}
        />
        <Image onInput={(e) => setImage(e)} />
        <button type="submit">Done</button>
      </form>
    </div>
  );
};

export default App;
