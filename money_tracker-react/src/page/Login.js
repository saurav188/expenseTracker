import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../style/login.css";
import MoneyTrackerLogo1 from "../assets/Logo/MoneyTrackerLogo1.png";

// Declare the color outside to reuse it
export const iconColor = "rgb(114,196,144)";

function Login() {
  const [email, setEmail] = useState(""); 
  const [password, setPassword] = useState("");
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();

  // Set token in sessionStorage
  function setToken(userToken) {
    sessionStorage.setItem("moneyTrackertoken", JSON.stringify(userToken));
  }

  const LoginFunction = async (e) => {
    e.preventDefault();
    setLoginError("Attempting to log in...");

    let data = {
      email: email,
      password: password,
    };

    try {
      const response = await axios.post(
        "http://localhost:8000/api/auth/user/login/",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.status) {
        setToken(response.data.token);
        navigate("/dashboard");
      } else {

        sessionStorage.removeItem("moneyTrackertoken");
        setLoginError("Login failed. Please check your credentials.");
      }
    } catch (error) {
      console.log("Error: " + error.message);
      setLoginError("An error occurred. Please try again.");
    }
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      {/* Parent div takes full height */}
      <div
        className="flex-1 flex flex-col md:flex-row justify-center items-center"
        style={{ backgroundColor: iconColor }}
      >
        {/* Left Section: Image and MoneyTracker text */}
        <div className="flex flex-col justify-center items-center p-5 w-full md:w-1/2 text-center">
          <img
            src={MoneyTrackerLogo1}
            alt="LogoImage1"
            className="rounded-2xl mb-5"
            style={{
              height: "500px", // Adjust the height of the image as needed
              width: "auto", // Width adjusts proportionally to the height
            }}
          />
          <p className="text-white font-bold text-4xl">Money Tracker</p>
        </div>

        {/* Right Section: Login Form */}
        <div className="flex-1 flex justify-center items-center w-full md:w-1/2 p-5">
          <div className="w-full max-w-md p-6 border rounded-lg shadow-md flex flex-col items-center bg-white">
            <form onSubmit={LoginFunction} className="w-full">
              <h1 className="text-center text-2xl font-bold mb-6">Login</h1>

              {/* Email input field */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Password input field */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="Enter password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  required
                />
              </div>

              {/* Display login error */}
              {loginError && <p className="text-red-500 text-center">{loginError}</p>}

              {/* Submit button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md mt-4 hover:bg-indigo-700 focus:outline-none"
              >
                Login
              </button>

              {/* Register link */}
              <div className="text-center mt-4">
                <p className="text-sm">New to MoneyTracker?</p>
                <Link to="/registration" className="text-indigo-600 hover:text-indigo-800">
                  Register New Account
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;
