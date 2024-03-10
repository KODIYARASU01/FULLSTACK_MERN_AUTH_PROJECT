import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../styles/SignIn.scss";
import image from "../../assets/login_register/teamWork.svg";
import axios from "axios";
import { Slide, toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  signInFailure,
  signInSuccess,
  signInStart,
} from "../../redux/user/userSlice.js";
import { useDispatch } from "react-redux";
import OAUTH from "../OAUTH.jsx";
const SignIn = () => {
  let dispatch = useDispatch();
  let navigate = useNavigate();
  let [loader, setLoader] = useState(false);
  //Sign In :
  let [signInformData, setSignInFormData] = useState({});
  //Handle All inputs:
  let handleSignInChange = (e) => {
    setSignInFormData({ ...signInformData, [e.target.id]: e.target.value });
  };
  //Submit Form:
  let handleSignInSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(signInStart());
      setLoader(true);
      await axios
        .post(
          `https://fullstack-mern-auth-project.onrender.com/api/auth/signin`,
          signInformData
        )
        .then((responce) => {
          let data = responce.data.rest;
          if (data.success === false) {
            dispatch(signInFailure());
          }
          dispatch(signInSuccess(data));
          toast.success(responce.data.message, {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
          });
          setLoader(false);
          setTimeout(() => {
            navigate("/admin");
          }, 2000);
        })
        .catch((error) => {
          dispatch(signInFailure());
          console.log(error.response);
          toast.error(error.response.data.message, {
            position: "top-center",
            autoClose: 2000,
            transition: Slide,
          });
          setLoader(false);
        });
    } catch (err) {
      setLoader(false);
    }
  };
  return (
    <>
      <div className="signin_container">
        <ToastContainer
          closeOnClick
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="light"
        />
        <div className="box_container">
          <div className="left_image">
            <img src={image} alt="signup" />
          </div>
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
                <div className="icon">
                  <i className="bx bxs-envelope"></i>
                </div>
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
                <div className="icon">
                  <i className="bx bxs-lock-open"></i>
                </div>
              </div>
              <div className="forgot_password">
                <Link>
                  <p>Forget Password ?</p>
                </Link>
              </div>
              <div className="form_submit">
                <button type="submit">
                  Sign In{" "}
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
                <p>or &nbsp;&nbsp;&nbsp; Continue</p>
              </div>
            </form>
{/* //GOOGLE SIGN IN */}
            <OAUTH />
            <div className="signup_link">
              <p>
                Don't have an account ? <Link to="/signup">Sign Up</Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default SignIn;
