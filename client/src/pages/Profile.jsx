/* eslint-disable react-hooks/exhaustive-deps */
import { useNavigate } from "react-router-dom";
import { signInSuccess, signInFailure } from "../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { useState, useRef, useEffect } from "react";
import {
  getDownloadURL,
  getStorage,
  ref,
  uploadBytesResumable,
} from "firebase/storage";
import { app } from "../utils/firebase";

const Profile = () => {
  const imageInputRef = useRef(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { currentUser } = useSelector((state) => state.user);

  const [feedback, setFeedback] = useState({});

  const [userData, setUserData] = useState({
    username: currentUser.username !== " " ? currentUser.username : "",
    email: currentUser.email,
    profilePicture: currentUser.profilePicture,
    password: "",
  });

  const updateProfilePicture = async () => {
    console.log("ran");
    const response = await fetch("/api/user/edit/image", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: userData.email,
        profilePicture: userData.profilePicture,
      }),
    });
    console.log({
      email: userData.email,
      profilePicture: userData.profilePicture,
    });
    const data = await response.json();
    console.log(data);
    if (data.success) {
      dispatch(signInSuccess(userData));
    }
  };

  if (userData.profilePicture !== currentUser.profilePicture) {
    updateProfilePicture();
  }

  const [image, setImage] = useState(undefined);

  const [imageUploadPercentage, setImageUploadPercentage] = useState(0);

  const [imageError, setImageError] = useState(false);

  useEffect(() => {
    if (image) {
      uploadImage(image);
    }
  }, [image]);

  const uploadImage = async (image) => {
    const storage = getStorage(app);
    const fileName = new Date().getTime() + image.name;
    const storageRef = ref(storage, fileName);
    const uploadTask = uploadBytesResumable(storageRef, image);

    uploadTask.on(
      "state_changed",
      (snapshot) => {
        const progress =
          (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
        setImageUploadPercentage(Math.round(progress));
      },
      (error) => {
        setImageError(true);
        console.log(error);
      },
      () => {
        getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) =>
          setUserData({ ...userData, profilePicture: downloadURL })
        );
      }
    );
  };

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/user/edit", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    const { success, error, message, ...updatedUserData } = data;
    setFeedback({
      success,
      error,
      message,
    });
    if (data.success) {
      dispatch(signInSuccess(updatedUserData));
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else if (data.error) {
      dispatch(signInFailure(updatedUserData));
    }
  };

  const handleDelete = async () => {
    const isConfirmed = window.confirm(
      "Are you sure you want to delete your account?"
    );
    if (isConfirmed) {
      const response = await fetch("/api/user/edit", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(userData),
      });

      const data = await response.json();

      if (data.success) {
        dispatch(signInSuccess());
        setTimeout(() => {
          navigate("/");
        }, 1);
      }
    }
  };

  const handleSignOut = async () => {
    try {
      await fetch("/api/auth/signout");
      dispatch(signInSuccess());
      setTimeout(() => {
        navigate("/");
      }, 1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="flex flex-col max-w-2xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-10">Profile</h1>

      <form
        onSubmit={handleSubmit}
        className="flex flex-col items-center justify-center gap-6 px-8 "
      >
        <input
          type="file"
          ref={imageInputRef}
          hidden
          accept="image/*"
          onChange={(e) => setImage(e.target.files[0])}
        />

        <img
          src={userData.profilePicture}
          alt=""
          className="h-24 w-24 rounded-full object-cover bg-green-300 mb-4"
          onClick={() => {
            imageInputRef.current.click();
          }}
        />
        <p>
          {imageError ? (
            <span className="text-red-500">Error Uploading Image</span>
          ) : imageUploadPercentage > 0 && imageUploadPercentage < 100 ? (
            <span className="text-slate-500">
              {`Uploading Image... ${imageUploadPercentage} %`}{" "}
            </span>
          ) : imageUploadPercentage === 100 ? (
            <span className="text-green-500">Image Uploaded Successfully</span>
          ) : (
            ""
          )}
        </p>
        {feedback.error && <p className="text-red-500">{feedback.message}</p>}
        {feedback.success && (
          <p className="text-green-500">{feedback.message}</p>
        )}
        <input
          className="bg-slate-100 rounded-lg p-3 w-full"
          type="text"
          placeholder={currentUser.username}
          id="username"
          value={userData.username}
          onChange={handleChange}
        />

        <input
          className="rounded-lg p-3 w-full  bg-gray-200 cursor-not-allowed"
          type="text"
          id="email"
          value={userData.email}
          readOnly
        />

        <input
          className="bg-slate-100  rounded-lg p-3 w-full"
          type="password"
          placeholder="Password"
          id="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button className="bg-slate-700 w-full text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed">
          UPDATE
        </button>
        <div className="flex justify-between w-full">
          <Link onClick={handleDelete} className="text-red-700">
            Delete Account
          </Link>
          <Link onClick={handleSignOut} className="text-red-700">
            Sign Out
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Profile;
