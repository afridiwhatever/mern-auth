/* eslint-disable react/no-unescaped-entities */
import { Link } from "react-router-dom";
import { useState } from "react";

const Signin = () => {
  const [userLoginData, setUserLoginData] = useState({
    user: "",
    password: "",
  });

  const [feedback, setFeedback] = useState({});

  const handleChange = (e) => {
    const { id, value } = e.target;
    setUserLoginData((prev) => {
      return {
        ...prev,
        [id]: value,
      };
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await fetch("http://localhost:3000/api/auth/signin", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(userLoginData),
    });
    const data = await response.json();
    setFeedback(data);
    setUserLoginData({
      user: "",
      password: "",
    });
  };

  return (
    <div className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Sign In</h1>
      {feedback?.message && (
        <p className="text-center my-7 text-red-500">{feedback.message}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8">
        <input
          className="bg-slate-100 rounded-lg p-3"
          type="text"
          placeholder="Username or email"
          id="user"
          value={userLoginData.user}
          onChange={handleChange}
        />
        <input
          className="bg-slate-100  rounded-lg p-3"
          type="password"
          placeholder="Password"
          id="password"
          value={userLoginData.password}
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed">
          SIGN IN
        </button>
        <button className="bg-red-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed">
          CONTINUE WITH GOOGLE
        </button>
        <p className="py-1">
          Don't have an account?
          <Link to="/signup">
            <span className="text-blue-500 ml-2">Sign up</span>
          </Link>
        </p>
      </form>

      {/* {user?.username && (
        <div>
          <div>Welcome, {user.username}</div>
          <div>{user.email}</div>
          <img src={user.profilePicture} alt="" />
        </div>
      )} */}
    </div>
  );
};

export default Signin;
