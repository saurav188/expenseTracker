import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import MoneyTrackerLogo1 from "../../assets/Logo/MoneyTrackerLogo1.png";

export const iconColor = "rgb(114,196,144)";

function Registration() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      username: "",
      first_name: "",
      last_name: "",
      email: "",
      password: "",
      password2: "",
    },
    validationSchema: Yup.object({
      username: Yup.string().required("Username is required"),
      email: Yup.string().email("Invalid email").required("Email is required"),
      first_name: Yup.string().required("First name is required"),
      last_name: Yup.string().required("Last name is required"),
      password: Yup.string()
        .min(6, "Password must be at least 6 characters")
        .required("Password is required"),
      password2: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Confirm password is required"),
    }),
    onSubmit: async (values) => {
      try {
        const response = await fetch("http://localhost:8000/api/auth/user/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(values),
        });

        const result = await response.json();
        if (response.ok) {
          toast.success("Registration successful! Redirecting to login...");
          setTimeout(() => navigate("/login"), 2000);
        } else {
          Object.keys(result.message || {}).forEach((key) => {
            toast.error(key+': '+result.message[key][0]);
          });
        }
      } catch (err) {
        toast.error("Error: " + err.message);
      }
    },
  });

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      <div className="flex-1 flex flex-col md:flex-row justify-center items-center" style={{ backgroundColor: iconColor }}>
        <div className="flex flex-col justify-center items-center p-5 w-full md:w-1/2 text-center">
          <img src={MoneyTrackerLogo1} alt="LogoImage1" className="rounded-2xl mb-5" style={{ height: "500px", width: "auto" }} />
          <p className="text-white font-bold text-4xl">Money Tracker</p>
        </div>

        <div className="flex-1 flex justify-center items-center w-full md:w-1/2 p-5">
          <div className="w-full max-w-md p-5 border rounded-lg shadow-md flex flex-col items-center bg-white">
            <form onSubmit={formik.handleSubmit} className="w-full">
              <h1 className="text-center text-xl font-bold mb-6">Registration</h1>

              <div className="grid grid-cols-1 gap-4 w-full">
                <div className="flex flex-col gap-1">
                  <label htmlFor="username" className="block text-sm font-semibold">Username</label>
                  <input
                    id="username"
                    type="text"
                    placeholder="Enter username"
                    {...formik.getFieldProps("username")}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.username && formik.errors.username && (
                    <p className="text-red-500 text-sm">{formik.errors.username}</p>
                  )}
                </div>
              <div className="flex flex-row gap-x-2 ">
                <div className="flex flex-col w-1/2 gap-1">
                  <label htmlFor="first_name" className="block text-sm font-semibold">First Name</label>
                  <input
                    id="first_name"
                    type="text"
                    placeholder="Enter first name"
                    {...formik.getFieldProps("first_name")}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.first_name && formik.errors.first_name && (
                    <p className="text-red-500 text-sm">{formik.errors.first_name}</p>
                  )}
                </div>

                <div className="flex flex-col w-1/2 gap-1">
                  <label htmlFor="last_name" className="block text-sm font-semibold">Last Name</label>
                  <input
                    id="last_name"
                    type="text"
                    placeholder="Enter last name"
                    {...formik.getFieldProps("last_name")}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.last_name && formik.errors.last_name && (
                    <p className="text-red-500 text-sm">{formik.errors.last_name}</p>
                  )}
                </div>
              </div>
                <div className="flex flex-col gap-1">
                  <label htmlFor="email" className="block text-sm font-semibold">Email</label>
                  <input
                    id="email"
                    type="email"
                    placeholder="Enter email"
                    {...formik.getFieldProps("email")}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.email && formik.errors.email && (
                    <p className="text-red-500 text-sm">{formik.errors.email}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="password" className="block text-sm font-semibold">Password</label>
                  <input
                    id="password"
                    type="password"
                    placeholder="Enter password"
                    {...formik.getFieldProps("password")}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.password && formik.errors.password && (
                    <p className="text-red-500 text-sm">{formik.errors.password}</p>
                  )}
                </div>

                <div className="flex flex-col gap-1">
                  <label htmlFor="password2" className="block text-sm font-semibold">Confirm Password</label>
                  <input
                    id="password2"
                    type="password"
                    placeholder="Confirm password"
                    {...formik.getFieldProps("password2")}
                    className="w-full p-3 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  />
                  {formik.touched.password2 && formik.errors.password2 && (
                    <p className="text-red-500 text-sm">{formik.errors.password2}</p>
                  )}
                </div>
              </div>

              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md mt-4 hover:bg-indigo-700 focus:outline-none">
                Register
              </button>

              <div className="text-center mt-4">
                <p className="text-sm">Already have an account?</p>
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800">Login here</Link>
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

export default Registration;
