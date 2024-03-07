import React, { useState } from "react";
import axios from "axios";

import { useDispatch } from "react-redux";
import { loginStart, loginSuccess, loginFailed } from "../../redux/userSlice";

import { useNavigate } from "react-router-dom";

const Signin = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [isSigningUp, setIsSigningUp] = useState(false); // New state

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(loginStart());
    try {
      const res = await axios.post("https://tweety-backend.onrender.com/api/auth/signin", { username, password });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    dispatch(loginStart());

    try {
      const res = await axios.post("https://tweety-backend.onrender.com/api/auth/signup", {
        username,
        email,
        password,
      });
      dispatch(loginSuccess(res.data));
      navigate("/");
    } catch (err) {
      dispatch(loginFailed());
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[90vh] "> 
    <form className="bg-gray-200 flex flex-col py-12 px-8 rounded-lg w-8/12 md:w-6/12 mx-auto gap-10">
      <h2 className="text-3xl font-bold text-center bg-transparent">{isSigningUp ? "Sign up for MelodyVerse🎵" : "Sign in to MelodyVerse🎵"}</h2>

      {isSigningUp ? (
        <>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="text-xl py-2 rounded-full px-4 bg-white"
          />
          <input
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="email"
            required
            className="text-xl py-2 rounded-full px-4 bg-white"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="text-xl py-2 rounded-full px-4 bg-white"
          />

          <button
            onClick={handleSignup}
            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
            type="submit"
          >
            Sign up
          </button>
          <p className="text-center bg-white text-xl bg-transparent" onClick={() => setIsSigningUp(false)}>Already have an account? Sign in</p>
        </>
      ) : (
        <>
          <input
            onChange={(e) => setUsername(e.target.value)}
            type="text"
            placeholder="username"
            className="text-xl py-2 rounded-full px-4 bg-white"
          />
          <input
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="password"
            className="text-xl py-2 rounded-full px-4 bg-white"
          />

          <button
            className="text-xl py-2 rounded-full px-4 bg-blue-500 text-white"
            onClick={handleLogin}
          >
            Sign in
          </button>

          <p className="text-center text-xl bg-transparent" onClick={() => setIsSigningUp(true)}>Don't have an account? Sign up</p>
        </>
      )}
    </form>
    </div>
  );
};

export default Signin;