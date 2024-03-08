import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./SignUp.scss";
const SignIn = () => {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({});
  //Handle All inputs:
  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  //Submit Form:
  let handleSubmit = async (e) => {
    e.preventDefault();
    let res = await fetch("http://localhost:5001/api/auth/signin", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });
    await res.json();
    setTimeout(()=>{
      navigate("/");
    },2000)
  };

  return (
    <div className="signup_container">
      <div className="signup_title">
        <h4>Sign In</h4>
      </div>

      <div className="signUp_container">
        <form action="" onSubmit={handleSubmit}>
          <div className="form_group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              name="email"
              id="email"
              placeholder="Enter Unique Email Address"
              onChange={handleChange}
            />
          </div>
          <div className="form_group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              name="password"
              id="password"
              placeholder="Enter Strong password"
              onChange={handleChange}
            />
          </div>

          <div className="form_submit">
            <button type="submit">SignIn</button>
          </div>
        </form>
        <div className="signin_link">
          <p>
            Create New Account ? <Link to="/signUp">SignUp</Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default SignIn;
