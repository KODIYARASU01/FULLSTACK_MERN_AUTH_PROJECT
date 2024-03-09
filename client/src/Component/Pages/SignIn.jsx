import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/SignIn.scss";
import image from "../../assets/login_register/register.png";
import signup from "../../assets/login_register/signup1.svg";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "ldrs/bouncy";

const SignIn = () => {
  let [loader, setLoader] = useState(false);

  // let url=import.meta.env.SERVER_LINK;

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

    try {
      setLoader(true);
      await axios
        .post(
          `https://fullstack-mern-auth-project.onrender.com/api/auth/signup`,
          signUpformData
        )
        .then((responce) => {
          toast.success(responce.data.message);
          setLoader(false);
          setTimeout(() => {
            setFormToggle(false);
          }, 2000);
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          setLoader(false);
          setFormToggle(true);
        });
    } catch (err) {
      console.log(err);
    }
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
    setLoader(true);
    await axios
      .post(
        `https://fullstack-mern-auth-project.onrender.com/api/auth/signin`,
        signInformData
      )
      .then((responce) => {
        setLoader(false);
        toast.success(responce.data.message);
      })
      .catch((error) => {
        toast.error(error.response.data.message);
        setLoader(false);
      });
  };
  return (
    <>
      <div className="signin_container">
        <ToastContainer
          position="top-right"
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
              <img className="login" src={image} alt="image" />
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
                {/* <div className="forgot_password">
                  <Link>
                    <p>Forget Password ?</p>
                  </Link>
                </div> */}
                <div className="form_submit">
                  <button type="submit">
                    Sign Up
                    {loader ? (
                      <l-bouncy
                        size="25"
                        speed="1.95"
                        color="yellow"
                      ></l-bouncy>
                    ) : (
                      ""
                    )}
                    {!loader ? (
                      <div className="rocket">
                        <i className="bx bxs-rocket bx-flashing"></i>
                      </div>
                    ) : (
                      ""
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
                      <l-bouncy
                        size="25"
                        speed="1.95"
                        color="yellow"
                      ></l-bouncy>
                    ) : (
                      ""
                    )}
                    {!loader ? (
                      <div className="rocket">
                        <i className="bx bxs-rocket bx-flashing"></i>
                      </div>
                    ) : (
                      ""
                    )}
                  </button>
                </div>
                <div className="or">
                  <p>or &nbsp;&nbsp;&nbsp; Continue</p>
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
