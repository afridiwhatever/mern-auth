/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  signInSuccess,
  signInFailure,
  signInStart,
} from "../store/slices/userSlice";
import { useSelector, useDispatch } from "react-redux";

import Form from "../components/Form";

const Signin = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState({
    username: "",
    password: "",
  });

  const { error, loading } = useSelector((state) => state.user);

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
    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    setUserData({
      username: "",
      password: "",
    });
    const data = await response.json();
    if (data.message === "Login Successful") {
      dispatch(signInSuccess(data));
      navigate("/");
    } else {
      dispatch(signInFailure(data));
    }
  };

  return (
    <Form
      useCase="signin"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
      userData={userData}
      feedback={error}
    />
  );
};

export default Signin;
