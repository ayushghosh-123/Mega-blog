import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { login as authLogin } from "../Store/autSlice";
import Input from "./Input";
import Button from "./Button";
import Logo from "./Logo";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import authservice from "../Appwrite/auth";

function LoginComponent() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { register, handleSubmit } = useForm();
  const [error, setError] = useState("");

  const login = async (data) => {
    setError("");
    try {
      const session = await authservice.login(data);
      if (session) {
        const data = await authservice.getCurrentUser();
        if (data) {
          dispatch(authLogin(data));
          navigate("/");
        }
      }
    } catch (error) {
      setError(error.message);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen  px-4">
      <div className="w-full max-w-md bg-white shadow-lg rounded-lg p-8 border border-gray-200">
        {/* Logo */}
        <div className="flex justify-center">
          <Logo width="80px" />
        </div>

        {/* Title */}
        <h2 className="text-center text-2xl font-semibold text-gray-800 mt-4">
          Sign in to your account
        </h2>

        {/* Sign Up Link */}
        <p className="mt-2 text-center text-sm text-gray-600">
          Don&apos;t have an account?&nbsp;
          <Link
            to="/signup"
            className="font-medium text-indigo-600 hover:underline"
          >
            Sign Up
          </Link>
        </p>

        {/* Error Message */}
        {error && <p className="text-red-500 text-center mt-4">{error}</p>}

        {/* Form */}
        <form onSubmit={handleSubmit(login)} className="mt-6">
          <div className="space-y-4">
            {/* Email Input */}
            <Input
              label="Email"
              placeholder="Enter your email"
              type="email"
              {...register("email", {
                required: "Email is required",
                validate: {
                  matchPattern: (value) =>
                    /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) ||
                    "Invalid email address",
                },
              })}
            />

            {/* Password Input */}
            <Input
              label="Password"
              type="password"
              placeholder="Enter your password"
              {...register("password", { required: "Password is required" })}
            />

            {/* Submit Button */}
            <Button
              type="submit"
              className="w-full bg-indigo-600 text-white py-2 rounded-lg font-medium transition duration-200 hover:bg-indigo-700"
            >
              Sign in
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default LoginComponent;
