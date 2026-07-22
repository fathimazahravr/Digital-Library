import { useState } from "react";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { registerUser } from "../services/authService";

function Register() {
  const [formData, setFormData] = useState({
    name: "",
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
    await registerUser(formData);

    toast.success("Registration successful!");

    setFormData({
      name: "",
      email: "",
      password: "",
    });

    navigate("/login");
  } catch (error) {
    toast.error(
      error.response?.data?.message || "Registration failed."
    );
  }
};

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#F8F5F2]">
      <div className="bg-white w-full max-w-md rounded-2xl shadow-lg p-8 border border-[#E5DDD5]">

        <h1 className="text-3xl font-bold text-center text-[#3F342C] mb-8">
          Create Account 📚
        </h1>

        <form onSubmit={handleSubmit} className="space-y-5">

          <div>
            <label className="block mb-2 text-[#8B6B4A] font-medium">
              Name
            </label>

            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              className="w-full border border-[#E5DDD5] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
            />
          </div>

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
              placeholder="Create a password"
              className="w-full border border-[#E5DDD5] rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#B08968]"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-[#8B6B4A] text-white py-3 rounded-xl hover:bg-[#75563A] transition"
          >
            Register
          </button>

        </form>

      </div>
    </div>
  );
}

export default Register;