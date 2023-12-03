import { Link } from "react-router-dom";
import { useState } from "react";

import Form from "../components/Form";

const Signup = () => {
  const [userData, setUserData] = useState({
    username: "",
    email: "",
    password: "",
  });

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
    const response = await fetch("http://localhost:3000/api/auth/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userData),
    });
    const data = await response.json();
    console.log(data);
  };

  return (
    <Form
      useCase="signup"
      handleChange={handleChange}
      handleSubmit={handleSubmit}
    />
  );
};

export default Signup;
