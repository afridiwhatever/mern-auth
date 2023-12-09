/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
// eslint-disable react/prop-types

import { Link } from "react-router-dom";
import OAuth from "./OAuth";

const Form = ({ useCase, handleChange, handleSubmit, userData, feedback }) => {
  let bottomSectionContent = (
    <p className="py-1">
      Have an account?
      <Link to="/signin">
        <span className="text-blue-500 ml-2">Sign in</span>
      </Link>
    </p>
  );

  if (useCase === "signin") {
    bottomSectionContent = (
      <p className="py-1">
        Don't have an account?
        <Link to="/signup">
          <span className="text-blue-500 ml-2">Sign up</span>
        </Link>
      </p>
    );
  }

  return (
    <div className="max-w-xl mx-auto p-3">
      <h1 className="text-3xl font-semibold text-center my-7">
        {useCase === "signup" ? "Sign Up" : "Sign In"}
      </h1>
      {feedback?.message && (
        <p className="text-center my-7 text-red-500">{feedback.message}</p>
      )}
      <form onSubmit={handleSubmit} className="flex flex-col gap-4 px-8">
        <input
          className="bg-slate-100 rounded-lg p-3"
          type="text"
          placeholder={useCase === "signup" ? "Username" : "Username or email"}
          id="username"
          value={userData.username}
          onChange={handleChange}
        />

        {useCase === "signup" && (
          <input
            className="bg-slate-100  rounded-lg p-3 "
            type="email"
            placeholder="Email"
            id="email"
            value={userData.email}
            onChange={handleChange}
          />
        )}
        <input
          className="bg-slate-100  rounded-lg p-3"
          type="password"
          placeholder="Password"
          id="password"
          value={userData.password}
          onChange={handleChange}
        />
        <button className="bg-slate-700 text-white rounded-lg p-3 hover:opacity-95 disabled:opacity-70 disabled:cursor-not-allowed">
          {useCase === "signup"
            ? "Sign Up".toUpperCase()
            : "Sign In".toUpperCase()}
        </button>
        <OAuth />

        {bottomSectionContent}
      </form>
    </div>
  );
};

export default Form;
