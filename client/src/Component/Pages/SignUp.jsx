import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignUp.scss";
import signup from "../../assets/login_register/codeThinker.svg";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const SignUp = () => {
  let navigate = useNavigate();
  let [loader, setLoader] = useState(false);
  //Sign Up :
  let [signUpformData, setSignUpFormData] = useState({});
  //Handle All inputs:
  let handleSignUpChange = (e) => {
    setSignUpFormData({ ...signUpformData, [e.target.id]: e.target.value });
  };
  //Submit Form:
  let handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoader(true);
      await axios
        .post(
          `https://fullstack-mern-auth-project.onrender.com/api/auth/signup`,
          signUpformData
        )
        .then((responce) => {
          toast.success(responce.data.message, {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
          });
          setLoader(false);
          setTimeout(() => {
            navigate("/");
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
          });
          setLoader(false);
        });
    } catch (err) {
      console.log(err);
      setLoader(false);
    }
  };
  return (
    <>
      <div className="signup_container">
        <ToastContainer
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="box_container">
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
                  placeholder="Enter Unique userName"
                  name="username"
                  id="username"
                  onChange={handleSignUpChange}
                />
                <div className="icon">
                  <i className="bx bxs-user"></i>
                </div>
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
                <div className="icon">
                  <i className="bx bxs-envelope"></i>
                </div>
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
                <div className="icon">
                  <i className="bx bxs-lock"></i>
                </div>
              </div>
              <div className="form_submit">
                <button type="submit">
                  Sign Up
                  {loader ? (
                    <span className="loader"></span>
                  ) : (
                    <div className="rocket">
                      <i className="bx bxs-rocket bx-flashing"></i>
                    </div>
                  )}
                </button>
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
                Already have an Account ? <Link to="/">Sign In</Link>
              </p>
            </div>
          </div>
          <div className="right_image">
            <img className="login" src={signup} alt="signUp" />
          </div>
        </div>
      </div>
    </>
  );
};

export default SignUp;
