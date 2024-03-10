import { useEffect, useRef, useState } from "react";
import "../styles/Profile.scss";
import profile from "../../assets/login_register/4.jpg";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { useDispatch } from "react-redux";
import {
  updateUserStart,
  updateUserSuccess,
  updateUserFailure,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure,
  signOut,
} from "../../redux/user/userSlice.js";
import { app } from "../../firebase.js";
export default function Profile() {
  let dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);
  let imageRef = useRef(null);
  let [image, setImage] = useState(undefined);
  const [imagePercent, setImagePercent] = useState(0);
  const [imageError, setImageError] = useState(false);
  const [formData, setFormData] = useState({});
  const [updateSuccess, setUpdateSuccess] = useState(false);
  useEffect(() => {
    if (image) {
      handleImageUpload(image);
    }
  }, [image]);
  const handleImageUpload = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);

    const uploadTask = uploadBytesResumable(storageRef, image);
    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImagePercent(Math.round(progress));
      },
      (error) => {
        setImageError(true);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setFormData({ ...formData, profile: downloadURL })
        );
      }
    );
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      dispatch(updateUserStart());
      const res = await fetch(
        `https://fullstack-mern-auth-project.onrender.com/api/user/update/${currentUser._id}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(updateUserFailure(data));
        return;
      }
      dispatch(updateUserSuccess(data));
      setUpdateSuccess(true);
    } catch (error) {
      dispatch(updateUserFailure(error));
    }
  };

  const handleDeleteAccount = async () => {
    try {
      dispatch(deleteUserStart());
      const res = await fetch(
        `https://fullstack-mern-auth-project.onrender.com/api/user/delete/${currentUser._id}`,
        {
          method: "DELETE",
        }
      );
      const data = await res.json();
      if (data.success === false) {
        dispatch(deleteUserFailure(data));
        return;
      }
      dispatch(deleteUserSuccess(data));
    } catch (error) {
      dispatch(deleteUserFailure(error));
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("https://fullstack-mern-auth-project.onrender.com/api/auth/signout");
      dispatch(signOut());
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <>
      <div className="user_container">
        {/* <Toaster position="top-center" reverseOrder={false}></Toaster> */}

        <div className="register_box">
          <div className="back_btn">
            <Link to="/">
              <img
                width="64"
                height="64"
                src="https://img.icons8.com/nolan/64/back.png"
                alt="back"
              />
            </Link>
          </div>
          <div className="box_title">
            <h1>Profile</h1>
            <p className="text-center text-sm">You can update your details!</p>
          </div>

          <form action="" onSubmit={handleSubmit}>
            <div className="profile flex justify-center p-4">
              <div className="form_group">
                <label htmlFor="profile">
                  <img
                    src={formData.profile || currentUser.profile}
                    alt="avatar"
                    id="profile_image"
                  />
                </label>
                <p
                  className="text-sm self-center"
                  style={{ textAlign: "center", margin: "10px" }}
                >
                  {imageError ? (
                    <span className="text-red-700" style={{ color: "red" }}>
                      Error uploading image (file size must be less than 2 MB)
                    </span>
                  ) : imagePercent > 0 && imagePercent < 100 ? (
                    <span className="text-slate-700">{`Uploading: ${imagePercent} %`}</span>
                  ) : imagePercent === 100 ? (
                    <span className="text-green-700" style={{ color: "green" }}>
                      Image uploaded successfully
                    </span>
                  ) : (
                    ""
                  )}
                </p>
                <input
                  // onChange={onUpload}
                  type="file"
                  id="profile"
                  name="profile"
                  ref={imageRef}
                  accept="image/.*"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>
              <label htmlFor=""></label>
            </div>

            <div className="form_group">
              <input
                type="text"
                placeholder="UserName"
                id="username"
                name="username"
                defaultValue={currentUser.username}
                onChange={handleChange}
              />
              <img
                className="icon"
                width="64"
                height="64"
                src="https://img.icons8.com/nolan/64/user.png"
                alt="user"
              />
            </div>

            <div className="form_group">
              <input
                type="email"
                placeholder="Eg : abc@gmail.com"
                id="email"
                name="Email"
                defaultValue={currentUser.email}
                onChange={handleChange}
              />
              <img
                className="icon"
                width="64"
                height="64"
                src="https://img.icons8.com/nolan/64/new-post.png"
                alt="new-post"
              />
            </div>

            <div className="form_group">
              <input
                type="password"
                placeholder="Password"
                id="password"
                name="password"
                onChange={handleChange}
              />
              <img
                className="icon"
                width="48"
                height="48"
                src="https://img.icons8.com/glassmorphism/48/experimental-password-glassmorphism.png"
                alt="experimental-password-glassmorphism"
              />
            </div>

            <button className="start_btn" type="submit">
              Update
            </button>
          </form>
          <p className="text-green-700 mt-5">
            {updateSuccess && "User is updated successfully!"}
          </p>
          <div className="logout_session">
            <p>
              <Link onClick={handleSignOut} style={{ color: "red" }}>
                Log Out
              </Link>
            </p>
          </div>
          <div className="deleteAccount">
            <Link onClick={handleDeleteAccount}>Delete Your Account</Link>
          </div>
        </div>
      </div>
    </>
  );
}
