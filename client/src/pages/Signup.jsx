import { Link } from "react-router-dom";
import { useState } from "react";

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
  };

  return (
    <div className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">Sign Up</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8">
        <input
          className="bg-slate-100 rounded-lg p-3"
          type="text"
          placeholder="Username"
          id="username"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100  rounded-lg p-3"
          type="email"
          placeholder="Email"
          id="email"
          onChange={handleChange}
        />
        <input
          className="bg-slate-100  rounded-lg p-3"
          type="password"
          placeholder="Password"
          id="password"
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed">
          SIGN UP
        </button>
        <button className="bg-red-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed">
          CONTINUE WITH GOOGLE
        </button>
        <p className="py-1">
          Have an account?
          <Link to="/signin">
            <span className="text-blue-500 ml-2">Sign in</span>
          </Link>
        </p>
      </form>
    </div>
  );
};

export default Signup;
