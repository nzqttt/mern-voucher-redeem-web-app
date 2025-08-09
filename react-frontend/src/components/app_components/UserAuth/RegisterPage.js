import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import client from "../../../services/restClient";
import { emailRegex } from "../../../utils/regex";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    const { name, email, password } = form;

    if (!name || !emailRegex.test(email) || password.length < 6) {
      setError("Please fill out all fields correctly.");
      return;
    }

    try {
      setLoading(true);

      await client.service("users").create({
        name,
        email,
        password,
        role: "user",
        points: 0,
        status: true,
      });

      await client.authenticate({
        strategy: "local",
        email,
        password,
      });

      navigate("/home");
    } catch (err) {
      console.error("Register Error:", err);
      setError(err.message || "Registration failed.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[var(--bg-secondary)] flex flex-col">
      {/* Header */}
      <header className="bg-[var(--primary-red)] text-white py-4 px-6 shadow-md">
        <h1 className="text-xl font-semibold">Redeem Voucher - CarterBank</h1>
      </header>

      {/* Registration Card */}
      <div className="flex flex-1 justify-center items-center px-4">
        <form
          onSubmit={handleSubmit}
          className="w-full max-w-md bg-white shadow-lg border border-[var(--border-light)] rounded-lg p-8"
        >
          <h2 className="text-2xl font-bold text-[var(--text-primary)] mb-6">
            Create an Account
          </h2>

          <div className="space-y-4">
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={form.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[var(--border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-red-light)]"
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[var(--border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-red-light)]"
            />
            <input
              type="password"
              name="password"
              placeholder="Password (min 6 chars)"
              value={form.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-[var(--border-light)] rounded-md focus:outline-none focus:ring-2 focus:ring-[var(--primary-red-light)]"
            />

            {/* Password Guidelines */}
            <ul className="text-sm text-[var(--text-secondary)] pl-5 list-disc">
              <li>Minimum 6 characters</li>
              <li>At least 1 uppercase letter</li>
              <li>At least 1 lowercase letter</li>
              <li>At least 1 number</li>
              <li>At least 1 symbol (!@#$%)</li>
            </ul>

            {error && (
              <p className="text-[var(--error)] text-sm mt-2">{error}</p>
            )}

            <button
              type="submit"
              className="bg-[var(--primary-red)] hover:bg-[var(--primary-red-dark)] text-white px-4 py-2 rounded w-full transition duration-200"
              disabled={loading}
            >
              {loading ? "Signing up..." : "Sign Up"}
            </button>

            <p className="text-sm mt-2 text-center text-[var(--text-secondary)]">
              Already have an account?{" "}
              <a href="/login" className="text-[var(--primary-red)] font-medium hover:underline">
                Login
              </a>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
