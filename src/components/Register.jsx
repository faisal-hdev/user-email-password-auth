/* eslint-disable no-unused-vars */
import { createUserWithEmailAndPassword } from "firebase/auth";
import React, { useState } from "react";
import auth from "../firebase/firebase.config";

const Register = () => {
  const [registerError, setRegisterError] = useState("");
  const [success, setSuccess] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    console.log("form submitting", email, password);

    console.log(typeof password);
    if (password.length < 6) {
      setRegisterError("Password should be at least 6 characters or longer");
      return;
    }
    // reset error
    setRegisterError("");
    setSuccess("");
    // create-user
    createUserWithEmailAndPassword(auth, email, password)
      .then((result) => {
        console.log(result.user);
        setSuccess("User created Successfully");
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
        <input
          className="w-full rounded p-2 border mb-2 md:p-3 border-black dark:border-white "
          required
          type="password"
          placeholder="Enter your password"
          name="password"
          id=""
        />
        <br />
        <input
          type="submit"
          className="btn btn-secondary w-full my-4 dark:text-white"
          value="Register"
        />
      </form>
      {registerError && <p className="text-red-600">{registerError}</p>}
      {success && <p className="text-green-400">{success}</p>}
    </div>
  );
};

export default Register;
