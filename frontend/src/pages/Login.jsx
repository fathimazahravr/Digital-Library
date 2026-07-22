import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { loginUser } from "../services/authService";

function Login() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const data = await loginUser(formData);

      // Save JWT token
      localStorage.setItem("token", data.token);

      // Save logged-in user
      localStorage.setItem("user", JSON.stringify(data.user));

      toast.success("Login successful!");

      navigate("/");
    } catch (error) {
      toast.error(
        error.response?.data?.message || "Login failed."
      );
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2]">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border border-[#E5DDD5]">
        <h1 className="text-3xl font-bold text-center text-[#3F342C] mb-8">
          Welcome Back 👋
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block mb-2 text-[#8B6B4A] font-medium">
              Email
            </label>

            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              className="w-full border border-[#E5DDD5] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
              required
            />
          </div>

          <div>
            <label className="block mb-2 text-[#8B6B4A] font-medium">
              Password
            </label>

            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              className="w-full border border-[#E5DDD5] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B6B4A] text-white py-3 rounded-xl hover:bg-[#75563A] transition"
          >
            Login
          </button>
        </form>

        {/* Register Link */}
        <p className="text-center mt-6 text-[#6B5B4D]">
          Don't have an account?{" "}
          <button
            onClick={() => navigate("/register")}
            className="text-[#8B6B4A] font-semibold hover:underline"
          >
            Register
          </button>
        </p>
      </div>
    </div>
  );
}

export default Login;