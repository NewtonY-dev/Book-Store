import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Login = () => {
  const [values, setValues] = useState({
    email: "",
    password: "",
  });
  const Navigate = useNavigate();

  const handleChanges = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:4000/auth/login",
        values
      );
      if (response.status === 200) {
        localStorage.setItem("token", response.data.token);
        Navigate("/");
      }
    } catch (error) {
      console.log("error while Login", error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        <div>
          <label htmlFor="email">Email</label> <br />
          <input
            type="text"
            placeholder="Enter Email"
            name="email"
            onChange={handleChanges}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label> <br />
          <input
            type="text"
            placeholder="Enter Password"
            name="password"
            onChange={handleChanges}
          />
        </div>
        <br />
        <button type="submit">Login</button>
      </form>
      <p>
        Don't have an account? <Link to="/register">Signup</Link>
      </p>
    </div>
  );
};

export default Login;
