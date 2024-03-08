import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.scss";
import image from "../../assets/login_register/6.svg";
import signup from "../../assets/login_register/signup.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignIn = () => {

  let [formToggle, setFormToggle] = useState(false);
  //Sign Up :
  let [signUpformData, setSignUpFormData] = useState({});
  //Handle All inputs:
  let handleSignUpChange = (e) => {
    setSignUpFormData({ ...signUpformData, [e.target.id]: e.target.value });
  };
  //Submit Form:
  let handleSignUpSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5001/api/auth/signup", signUpformData)
      .then((responce) => {
        toast.success(responce.data.message);
        setTimeout(() => {
          setFormToggle(false);
        }, 2000);
      })
      .catch((error) => {
        toast.error(error.response.data.message)
 
        setFormToggle(true);
      });
  };
  //Sign In :
  let [signInformData, setSignInFormData] = useState({});
  //Handle All inputs:
  let handleSignInChange = (e) => {
    setSignInFormData({ ...signInformData, [e.target.id]: e.target.value });
  };
  //Submit Form:
  let handleSignInSubmit = async (e) => {
    e.preventDefault();
    await axios
      .post("http://localhost:5001/api/auth/signin", signInformData)
      .then((responce) => {
        toast.success(responce.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
      });
  };
  return (
    <>
      <div className="signin_container">
        <ToastContainer
          position="top-center"
          autoClose={2000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
          transition:Bounce
        />
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
              <form action="" onSubmit={handleSignUpSubmit}>
                <div className="form_group">
                  <label htmlFor="username">UserName</label>
                  <input
                    type="text"
                    placeholder="Give Unique userName"
                    name="username"
                    id="username"
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Eg : abc@gmail.com"
                    name="email"
                    id="email"
                    onChange={handleSignUpChange}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="email">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={handleSignUpChange}
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
              <form action="" onSubmit={handleSignInSubmit}>
                <div className="form_group">
                  <label htmlFor="email">Email</label>
                  <input
                    type="text"
                    placeholder="Eg : abc@gmail.com"
                    name="email"
                    id="email"
                    onChange={handleSignInChange}
                  />
                </div>
                <div className="form_group">
                  <label htmlFor="password">Password</label>
                  <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    id="password"
                    onChange={handleSignInChange}
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
