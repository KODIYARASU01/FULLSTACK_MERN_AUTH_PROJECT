import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignIn.scss";
import image from "../../assets/login_register/6.svg";
import signup from '../../assets/login_register/signup.svg'
const SignIn = () => {
  let [formToggle, setFormToggle] = useState(false);
  console.log(formToggle);
  // let navigate = useNavigate();
  // let [formData, setFormData] = useState({});
  // //Handle All inputs:
  // let handleChange = (e) => {
  //   setFormData({ ...formData, [e.target.id]: e.target.value });
  // };
  // //Submit Form:
  // let handleSubmit = async (e) => {
  //   e.preventDefault();
  //   let res = await fetch("http://localhost:5001/api/auth/signin", {
  //     method: "POST",
  //     headers: { "Content-Type": "application/json" },
  //     body: JSON.stringify(formData),
  //   });
  //   await res.json();
  //   setTimeout(()=>{
  //     navigate("/");
  //   },2000)
  // };

  return (
    <>
      <div className="signin_container">
        <div className="box_container">
          {!formToggle ? (
            <div className="left_image">
              <img src={image} alt="image" />
            </div>
          ) : (
            <div className="right_form">
              <div className="form_title">
                <h4>Welcome to AristosTech Digital Card Creator!</h4>
                <p>Create your new Account</p>
              </div>
              <form action="">
              <div className="form_group">
                  <label htmlFor="username">UserName</label>
                  <input
                    type="text"
                    placeholder="Give Unique userName"
                    name="username"
                    id="username"
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Eg : abc@gmail.com"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="email">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                  />
                </div>
                {/* <div className="forgot_password">
                  <Link>
                    <p>Forget Password ?</p>
                  </Link>
                </div> */}
                <div className="form_submit">
                  <button type="submit">Sign Up</button>
                </div>
                <div className="or">
                  <p>or Continue</p>
                </div>
              </form>

              <div className="google_signin">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/google-logo.png"
                  alt="google-logo"
                />
                <p>Sign Up With Google</p>
              </div>
              <div className="signup_link">
                <p>
                  Already have an Account ?{" "}
                  <Link onClick={() => setFormToggle(false)}>Sign In</Link>
                </p>
              </div>
            </div>
          )}

          {!formToggle ? (
            <div className="right_form">
              <div className="form_title">
                <h4>Welcome Back!</h4>
                <p>Please enter login details below</p>
              </div>
              <form action="">
                <div className="form_group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Eg : abc@gmail.com"
                    name="email"
                    id="email"
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="email">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                  />
                </div>
                <div className="forgot_password">
                  <Link>
                    <p>Forget Password ?</p>
                  </Link>
                </div>
                <div className="form_submit">
                  <button type="submit">Sign In</button>
                </div>
                <div className="or">
                  <p>or Continue</p>
                </div>
              </form>

              <div className="google_signin">
                <img
                  width="48"
                  height="48"
                  src="https://img.icons8.com/fluency/48/google-logo.png"
                  alt="google-logo"
                />
                <p>Log In With Google</p>
              </div>
              <div className="signup_link">
                <p>
                  Don't have an account ?{" "}
                  <Link onClick={() => setFormToggle(true)}>Sign Up</Link>
                </p>
              </div>
            </div>
          ) : (
            <div className="left_image">
              <img src={signup} alt="signup" />
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default SignIn;
