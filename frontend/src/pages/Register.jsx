import React from "react";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Register = () => {
  const [values, setValues] = useState({
    username: "",
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
        "http://localhost:4000/auth/register",
        values
      );
      if(response.status === 201){
        Navigate('/login');
      }
    } catch (error) {
      console.log("error while user registration",error);
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <h1>Register</h1>
        <div>
          <br />
          <label htmlFor="username">Username</label> <br />
          <input
            type="text"
            placeholder="Enter Username"
            name="username"
            onChange={handleChanges}
          />
        </div>

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
        <button type="submit">Register</button>
      </form>
      <p>
        Already have an account? <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
