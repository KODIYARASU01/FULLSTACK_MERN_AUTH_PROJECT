import React from "react";
import "./SignUp.scss";
const SignUp = () => {
  return (
    <>
      <div className="signup_container">
        <div className="signup_title">
          <h4>Sign Up</h4>
        </div>

        <div className="signUp_container">
          <form action="">
            <div className="form_group">
              <label htmlFor="userName">UserName</label>
              <input
                type="text"
                name="userName"
                id="UserName"
                placeholder="Enter Unique UserName"
              />
            </div>
            <div className="form_group">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter Unique Email Address"
              />
            </div>
            <div className="form_group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter Strong password"
              />
            </div>

            <div className="form_submit">
              <button type="submit">SignUp</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
};

export default SignUp;
