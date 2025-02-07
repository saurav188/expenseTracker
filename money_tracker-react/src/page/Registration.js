import { React, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../style/login.css";
import MoneyTrackerLogo1 from "../assets/Logo/MoneyTrackerLogo1.png";

// Declare the color outside to reuse it
export const iconColor = "rgb(114,196,144)";

function Registration() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [password2, setPassword2] = useState('');
  const [email, setEmail] = useState('');
  const [firstname, setFirstname] = useState('');
  const [lastname, setLastname] = useState('');
  const [Error, setError] = useState({
      "username": "",
      "password": "",
      "password2": "",
      "email": "",
      "first_name": "",
      "last_name": ""
  });
  const navigate = useNavigate();

  let Register = (ev) => {
    ev.preventDefault();
    let data = {
      username: firstname,
      password: password,
      password2: password2,
      email: email,
      first_name: firstname,
      last_name: lastname,
    };
    let url = "http://localhost:8000/api/auth/user/";
    let header = {
      "Content-Type": "application/json",
    };
    fetch(url, {
      method: "POST", 
      headers: header,
      body: JSON.stringify(data),
    })
    .then(response => response.json())
    .then(data => {
      if (data['status']) {
        navigate("/login");
      } else {
        console.log(data)
        let temp = Error;
        for (var key in temp) {
          if (key in data['message'])
            temp[key] = <p className="text-danger"> {data['message'][key][0]}</p>
          else
            temp[key] = '';
        }
        console.log(temp)
        setError(temp);
      }
    })
    .catch(error => console.log('Error: ' + error.message));
  };

  return (
    <div className="min-h-screen min-w-screen flex flex-col">
      {/* Parent div with background color */}
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

        {/* Right Section: Registration Form */}
        <div className="flex-1 flex justify-center items-center w-full md:w-1/2 p-5">
          <div className="w-full max-w-md p-5 border rounded-lg shadow-md flex flex-col items-center bg-white">
            <form onSubmit={Register} className="w-full">
              <h1 className="text-center text-xl font-bold mb-6">Registration</h1>
              <div className="flex flex-col gap-3">
              {/* Email Field */}
              <div className="">
                <label htmlFor="email" className="block text-sm font-semibold ">Email</label>
                <input
                  id="email"
                  type="text"
                  placeholder="Enter email"
                  value={email}
                  onChange={(ev) => setEmail(ev.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {Error['email']}
              </div>
              {/* Name */}
              <div className="flex flex-row gap-4">
              {/* First Name Field */}
              <div className="">
                <label htmlFor="firstname" className="block text-sm font-semibold ">First Name</label>
                <input
                  id="firstname"
                  type="text"
                  placeholder="Enter first name"
                  value={firstname}
                  onChange={(ev) => setFirstname(ev.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {Error['first_name']}
              </div>

              {/* Last Name Field */}
              <div className="">
                <label htmlFor="lastname" className="block text-sm font-semibold ">Last Name</label>
                <input
                  id="lastname"
                  type="text"
                  placeholder="Enter last name"
                  value={lastname}
                  onChange={(ev) => setLastname(ev.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {Error['last_name']}
              </div>
              </div>

              {/* Password Field */}
              <div className="">
                <label htmlFor="password" className="block text-sm font-semibold ">Password</label>
                <input
                  id="password"
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(ev) => setPassword(ev.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {Error['password']}
              </div>

              {/* Confirm Password Field */}
              <div className="">
                <label htmlFor="password2" className="block text-sm font-semibold ">Re-enter Password</label>
                <input
                  id="password2"
                  type="password"
                  placeholder="Confirm Password"
                  value={password2}
                  onChange={(ev) => setPassword2(ev.target.value)}
                  className="w-full p-2 border rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500"
                />
                {Error['password2']}
              </div>
              </div>

              {/* Submit Button */}
              <button type="submit" className="w-full bg-indigo-600 text-white py-3 rounded-md mt-4 hover:bg-indigo-700 focus:outline-none">
                Register
              </button>

              {/* Login Link */}
              <div className="text-center mt-4">
                <p className="text-sm">Already have an account?</p>
                <Link to="/login" className="text-indigo-600 hover:text-indigo-800">Login here</Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Registration;
