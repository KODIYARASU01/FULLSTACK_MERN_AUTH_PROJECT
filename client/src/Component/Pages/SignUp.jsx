import React, { useState } from "react";
import '../styles/SignUp.scss'
import { Link, useNavigate } from "react-router-dom";
const SignUp = () => {
  let navigate = useNavigate();
  let [formData, setFormData] = useState({});
  //Handle All inputs:
  let handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  //Submit Form:
  let handleSubmit = async (e) => {
    e.preventDefault();

    let res = await fetch("http://localhost:5001/api/auth/signup", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    });

    let data = await res.json();
    console.log(data);
    setTimeout(()=>{
      navigate("/signIn");
    },2000)

  };

  return (
    <>
      <div className="signup_container">
        <div className="signup_title">
          <h4>Sign Up</h4>
        </div>

        <div className="signUp_container">
          <form action="" onSubmit={handleSubmit}>
            <div className="form_group">
              <label htmlFor="userName">UserName</label>
              <input
                type="text"
                name="userName"
                id="userName"
                placeholder="Enter Unique UserName"
                onChange={handleChange}
              />
            </div>
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
              <button type="submit">SignUp</button>
            </div>
          </form>
          <div className="signin_link">
            <p>
              Already u have on account ? <Link to="/signIn">SignIn</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
