import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const { registeredUsers, setLoggedInUser } = useContext(Auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    const match = registeredUsers.find(
      (u) =>
        u.email.toLowerCase() === data.email.toLowerCase() &&
        u.password === data.password,
    );

    if (!match) {
      toast.error("Invalid email or password.");
      return;
    }

    setLoggedInUser({ name: match.name, email: match.email });
    toast.success("Welcome back!");
    navigate("/");
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 bg-gradient-to-br from-black via-neutral-900 to-black">
      {/* Left - branding */}
      <div className="hidden lg:flex flex-col justify-center px-16 border-r border-neutral-800">
        <div className="flex items-center gap-2 font-bold text-2xl text-white mb-24">
          <span className="w-9 h-9 rounded-xl bg-lime-400 text-black flex items-center justify-center">
            <i className="fa-solid fa-bolt text-lg"></i>
          </span>
          Sky<span className="text-lime-400">Mart</span>
        </div>

        <p className="text-lime-400 text-sm font-bold tracking-wide mb-4">
          WELCOME BACK
        </p>
        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
          Shop the future.
          <br />
          <span className="text-lime-400">Today.</span>
        </h1>
        <p className="text-neutral-400 max-w-md mb-12">
          Thousands of products, lightning-fast delivery, and prices that make
          your wallet happy.
        </p>

        <div className="flex gap-4">
          <div className="border border-neutral-800 rounded-xl px-8 py-5 text-center bg-neutral-900/40 hover:border-lime-400 transition">
            <p className="text-2xl font-bold text-lime-400">20K+</p>
            <p className="text-sm text-neutral-400 mt-1">Products</p>
          </div>
          <div className="border border-neutral-800 rounded-xl px-8 py-5 text-center bg-neutral-900/40 hover:border-lime-400 transition">
            <p className="text-2xl font-bold text-lime-400">50K+</p>
            <p className="text-sm text-neutral-400 mt-1">Users</p>
          </div>
          <div className="border border-neutral-800 rounded-xl px-8 py-5 text-center bg-neutral-900/40 hover:border-lime-400 transition">
            <p className="text-2xl font-bold text-lime-400">4.9★</p>
            <p className="text-sm text-neutral-400 mt-1">Rating</p>
          </div>
        </div>
      </div>

      {/* Right - form */}
      <div className="flex items-center justify-center p-6">
        <div className="w-full max-w-sm bg-neutral-950 border border-neutral-800 rounded-2xl p-8 shadow-lg shadow-black/50 animate-slideIn">
          <h2 className="text-2xl font-bold text-white mb-1 border-b border-lime-400 inline-block pb-1">
            Sign in
          </h2>
          <p className="text-neutral-500 text-sm mb-6">
            Enter your credentials to continue
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Email */}
            <div>
              <div className="relative">
                <i className="fa-regular fa-envelope absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"></i>
                <input
                  type="email"
                  placeholder="Email address"
                  autoComplete="off"
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                      message: "Enter a valid email address",
                    },
                  })}
                  className="w-full bg-black border border-neutral-800 rounded-lg pl-11 pr-4 py-3 text-white text-sm outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition"
                />
              </div>
              {errors.email && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"></i>
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  autoComplete="off"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                  })}
                  className="w-full bg-black border border-neutral-800 rounded-lg pl-11 pr-11 py-3 text-white text-sm outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-lime-400 transition"
                >
                  <i
                    className={`fa-regular ${
                      showPassword ? "fa-eye-slash" : "fa-eye"
                    }`}
                  ></i>
                </button>
              </div>
              {errors.password && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-lime-400 text-black font-semibold py-3 rounded-lg mt-2 hover:bg-lime-300 hover:scale-[1.02] active:scale-[0.97] transition-all"
            >
              Sign in <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </form>

          <p className="text-center text-neutral-500 text-sm mt-6">
            Don't have an account?{" "}
            <Link
              to="/register"
              className="text-lime-400 font-semibold hover:underline"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
