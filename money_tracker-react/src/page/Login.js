import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../style/login.css";
import MoneyTrackerLogo1 from "../assets/Logo/MoneyTrackerLogo1.png";

export const iconColor = "rgb(114,196,144)";

function Login() {
  const navigate = useNavigate();

  function setToken(userToken) {
    sessionStorage.setItem("moneyTrackertoken", JSON.stringify(userToken));
  }

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object({
      email: Yup.string().email("Invalid email format").required("Email is required"),
      password: Yup.string().min(6, "Password must be at least 6 characters").required("Password is required"),
    }),
    onSubmit: async (values, { setSubmitting, setErrors }) => {
      try {
        const response = await axios.post("http://localhost:8000/api/auth/user/login/", values, {
          headers: { "Content-Type": "application/json" },
        });

        if (response.data.status) {
          setToken(response.data.token);
          toast.success("Login successful!");
          navigate("/dashboard");
        } else {
          sessionStorage.removeItem("moneyTrackertoken");
          setErrors({ general: "Login failed. Please check your credentials." });
          toast.error("Login failed. Please check your credentials.");
        }
      } catch (error) {
        setErrors({ general: "An error occurred. Please try again." });
        toast.error("An error occurred. Please try again.");
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row justify-center items-center" style={{ backgroundColor: iconColor }}>
        {/* Left Section: Logo */}
        <div className="flex flex-col justify-center items-center p-5 w-full md:w-1/2 text-center">
          <img
            src={MoneyTrackerLogo1}
            alt="Money Tracker Logo"
            className="rounded-2xl mb-5"
            style={{ height: "500px", width: "auto" }}
          />
          <p className="text-white font-bold text-4xl">Money Tracker</p>
        </div>

        {/* Right Section: Login Form */}
        <div className="flex-1 flex justify-center items-center w-full md:w-1/2 p-5">
          <div className="w-full max-w-md p-6 border rounded-lg shadow-md flex flex-col items-center bg-white">
            <form onSubmit={formik.handleSubmit} className="w-full">
              <h1 className="text-center text-2xl font-bold mb-6">Login</h1>

              {/* Email Input */}
              <div className="mb-4">
                <label htmlFor="email" className="block text-sm font-semibold mb-2">
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  {...formik.getFieldProps("email")}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.email && formik.errors.email && (
                  <p className="text-red-500">{formik.errors.email}</p>
                )}
              </div>

              {/* Password Input */}
              <div className="mb-4">
                <label htmlFor="password" className="block text-sm font-semibold mb-2">
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  {...formik.getFieldProps("password")}
                  className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {formik.touched.password && formik.errors.password && (
                  <p className="text-red-500">{formik.errors.password}</p>
                )}
              </div>

              {/* General Error Message */}
              {formik.errors.general && <p className="text-red-500 text-center">{formik.errors.general}</p>}

              {/* Submit Button */}
              <button
                type="submit"
                className="w-full bg-indigo-600 text-white py-3 rounded-md mt-4 hover:bg-indigo-700 focus:outline-none"
                disabled={formik.isSubmitting}
              >
                {formik.isSubmitting ? "Logging in..." : "Login"}
              </button>

              {/* Register Link */}
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

      {/* Toast Notifications */}
      <ToastContainer />
    </div>
  );
}

export default Login;
