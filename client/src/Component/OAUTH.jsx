import { GoogleAuthProvider, signInWithPopup, getAuth } from "firebase/auth";
import { app } from "../firebase";
import { useDispatch } from "react-redux";
import {  signInSuccess } from "../redux/user/userSlice.js";
export default function OAUTH() {
  const dispatch = useDispatch();
  const handleGoogleClick = async (e) => {
    e.preventDefault();

    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);

      const res = await fetch('http://localhost:5001/api/auth/google', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: result.user.displayName,
          email: result.user.email,
          profile: result.user.photoURL,
        }),
      });
      const data = await res.json();
      console.log(data);
      dispatch(signInSuccess(data));
 
    } catch (err) {
      console.log('could not login with google', err);
    }
  };
  return (
    <>
      <div className="google_signin">
        <button onClick={handleGoogleClick}>
          {" "}
          <img
            width="48"
            height="48"
            src="https://img.icons8.com/fluency/48/google-logo.png"
            alt="google-logo"
          />
          Continue With Google
        </button>
      </div>
    </>
  );
}
