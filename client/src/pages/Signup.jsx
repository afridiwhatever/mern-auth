import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../store/slices/userSlice";
import { useDispatch } from "react-redux";
import Form from "../components/Form";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const navigate = useNavigate();
  const dispatch = useDispatch();

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
    dispatch(signInStart());
    const response = await fetch("/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    setUserData({
      username: "",
      email: "",
      password: "",
    });
    const data = await response.json();
    if (data.success) {
      dispatch(signInSuccess(data));
      navigate("/");
    } else {
      dispatch(signInFailure(data));
    }
  };

  return (
    <Form
      useCase="signup"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      userData={userData}
    />
  );
};

export default Signup;
