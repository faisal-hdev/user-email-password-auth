/* eslint-disable no-unused-vars */
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from "firebase/auth";
import React, { useState } from "react";
import auth from "../firebase/firebase.config";
import { IoIosEye, IoIosEyeOff } from "react-icons/io";
import { Link } from "react-router-dom";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = (e) => {
    e.preventDefault();
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;
    const accepted = e.target.terms.checked;
    console.log("form submitting", name, email, password, accepted);

    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    } else if (!/[A-Z]/.test(password)) {
      setRegisterError(
        "Your password should be have at least one uppercase characters"
      );
      return;
    } else if (!accepted) {
      setRegisterError("Please accepted our terms and conditions!");
      return;
    }
    // reset error
    setSuccess("");
    setRegisterError("");
    // create-user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User created Successfully");

        // update profile
        updateProfile(result.user, {
          displayName: name,
          photoURL: "https://example.com/jane-q-user/profile.jpg",
        })
          .then(() => {
            console.log("profile updated");
          })
          .catch((error) => {
            console.log(error);
          });

        // sand verification email:
        sendEmailVerification(result.user).then(() => {
          alert("Please check your email and verify your account");
        });
      })
      .catch((error) => {
        console.error(error);
        setRegisterError(error.message);
      });
  };
  return (
    <div className="mx-auto md:w-2/5 lg:w-1/2 dark:text-white">
      <h2 className=" text-4xl my-6 text-center">Please register</h2>
      <form onSubmit={handleRegister}>
        <label className="text-xl text-black dark:text-white">Your Name</label>
        <br />
        <input
          className="w-full rounded p-2 border mb-2 md:p-3 border-black dark:border-white "
          required
          type="text"
          name="name"
          placeholder="Enter your name"
          id=""
        />
        <br />
        <label className="text-xl text-black dark:text-white">Email</label>
        <br />
        <input
          className="w-full rounded p-2 border mb-2 md:p-3 border-black dark:border-white "
          required
          type="email"
          name="email"
          placeholder="Enter your email"
          id=""
        />
        <br />
        <label className="text-xl text-black dark:text-white">Password</label>
        <br />
        <div className="flex items-center relative">
          <input
            className="w-full rounded p-2 border mb-2 md:p-3 border-black dark:border-white "
            required
            type={showPassword ? "text" : "password"}
            placeholder="Enter your password"
            name="password"
            id=""
          />
          <span
            className="cursor-pointer text-2xl absolute right-3"
            onClick={() => setShowPassword(!showPassword)}
          >
            {showPassword ? <IoIosEyeOff /> : <IoIosEye />}
          </span>
        </div>
        <br />
        <input type="checkbox" name="terms" id="terms" />
        <label htmlFor="terms" className="ml-3">
          Accept our <a href="#">Terms and Condition</a>
        </label>
        <input
          type="submit"
          value="Register"
          className="btn btn-secondary w-full my-4 dark:text-white"
        />
      </form>
      {registerError && <p className="text-red-600">{registerError}</p>}
      {success && <p className="text-green-400">{success}</p>}
      <p>
        Already have an account? Please <Link to="/login">Login</Link>
      </p>
    </div>
  );
};

export default Register;
