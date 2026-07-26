import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router";
import { useForm } from "react-hook-form";
import { Auth } from "../context/AuthContext";
import { toast } from "react-toastify";

const Register = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const { registeredUsers, setRegisteredUsers, setLoggedInUser } =
    useContext(Auth);
  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const password = watch("password", "");

  const getPasswordStrength = (password) => {
    let score = 0;

    if (password.length >= 8) score++;
    if (password.length >= 12) score++;

    if (/[a-z]/.test(password)) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/\d/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;

    if (score <= 2)
      return {
        label: "Weak",
        color: "bg-red-500",
        text: "text-red-400",
      };

    if (score <= 4)
      return {
        label: "Medium",
        color: "bg-yellow-400",
        text: "text-yellow-400",
      };

    return {
      label: "Strong",
      color: "bg-lime-400",
      text: "text-lime-400",
    };
  };

  const strength = getPasswordStrength(password);

  const onSubmit = (data) => {
    const alreadyExists = registeredUsers.some(
      (u) => u.email.toLowerCase() === data.email.toLowerCase(),
    );

    if (alreadyExists) {
      toast.error("An account with this email already exists.");
      return;
    }

    const updatedUsers = [...registeredUsers, data];
    setRegisteredUsers(updatedUsers);
    setLoggedInUser({ name: data.name, email: data.email });

    toast.success("Registered successfully!");
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
          JOIN US
        </p>
        <h1 className="text-5xl font-bold text-white leading-tight mb-6">
          Your next favorite
          <br />
          <span className="text-lime-400">thing awaits.</span>
        </h1>
        <p className="text-neutral-400 max-w-md mb-12">
          Create an account to save your cart, track orders, and get
          personalized picks.
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
            Create account
          </h2>
          <p className="text-neutral-500 text-sm mb-6">
            Start shopping in seconds
          </p>

          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
          >
            {/* Name */}
            <div>
              <div className="relative">
                <i className="fa-regular fa-user absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"></i>
                <input
                  type="text"
                  placeholder="Full name"
                  autoComplete="off"
                  {...register("name", {
                    required: "Full name is required",
                    minLength: { value: 2, message: "Name is too short" },
                  })}
                  className="w-full bg-black border border-neutral-800 rounded-lg pl-11 pr-4 py-3 text-white text-sm outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition"
                />
              </div>
              {errors.name && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.name.message}
                </p>
              )}
            </div>

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
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 8,
                      message: "Password must be at least 8 characters",
                    },
                  })}
                  className="w-full bg-neutral-900 border border-neutral-700 rounded-xl pl-11 pr-12 py-3 text-white outline-none focus:border-lime-400 transition"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-lime-400"
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
              {password && (
                <div className="mt-4">
                  <div className="flex gap-3">
                    {[1, 2, 3].map((level) => (
                      <div
                        key={level}
                        className={`h-1.5 flex-1 rounded-full transition-all duration-300 ${
                          (strength.label === "Weak" && level === 1) ||
                          (strength.label === "Medium" && level <= 2) ||
                          (strength.label === "Strong" && level <= 3)
                            ? strength.color
                            : "bg-neutral-800"
                        }`}
                      />
                    ))}
                  </div>

                  <p className={`mt-2 text-sm font-semibold ${strength.text}`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            {/* confirm password */}
            <div>
              <div className="relative">
                <i className="fa-solid fa-lock absolute left-4 top-1/2 -translate-y-1/2 text-neutral-500"></i>
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  {...register("confirmPassword", {
                    required: "Please confirm your password",
                    validate: (value) =>
                      value === watch("password") || "Passwords do not match",
                  })}
                  className="w-full bg-black border border-neutral-800 rounded-lg pl-11 pr-11 py-3 text-white text-sm outline-none focus:border-lime-400 focus:ring-1 focus:ring-lime-400 transition"
                />
                <button
                  type="button"
                  onClick={() => setShowConfirmPassword((s) => !s)}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-neutral-500 hover:text-lime-400 transition"
                >
                  <i
                    className={`fa-regular ${showConfirmPassword ? "fa-eye-slash" : "fa-eye"}`}
                  ></i>
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-red-400 text-xs mt-1">
                  {errors.confirmPassword.message}
                </p>
              )}
            </div>

            {/* Submit */}
            <button
              type="submit"
              className="w-full bg-lime-400 text-black font-semibold py-3 rounded-lg mt-2 hover:bg-lime-300 hover:scale-[1.02] active:scale-[0.97] transition-all"
            >
              Create account <i className="fa-solid fa-arrow-right ml-1"></i>
            </button>
          </form>

          <p className="text-center text-neutral-500 text-sm mt-6">
            Already have an account?{" "}
            <Link
              to="/login"
              className="text-lime-400 font-semibold hover:underline"
            >
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
