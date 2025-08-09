import React, { useEffect, useState } from "react";
import client from "../../../services/restClient";
import { connect } from "react-redux";

const AdminUserPage = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [form, setForm] = useState({ name: "", email: "", points: 0, role: "user" });
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await client.service("users").find({ query: { $limit: 1000 } });
      setUsers(res.data);
    } catch (err) {
      setError("Error fetching users");
      setUsers([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.name.trim() || !form.email.trim() || (!editingId && !form.password.trim())) {
      setError("Name, email, and password are required");
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await client.service("users").patch(editingId, {
          name: form.name,
          email: form.email,
          points: Number(form.points) || 0,
          role: form.role
        });
        setSuccess("User updated successfully");
      } else {
        await client.service("users").create({
          name: form.name,
          email: form.email,
          points: Number(form.points) || 0,
          role: form.role
        });
        setSuccess("User created successfully");
      }
      resetForm();
      fetchUsers();
    } catch (err) {
      setError("Save failed. Make sure email is unique.");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await client.service("users").remove(id);
      setSuccess("User deleted successfully");
      fetchUsers();
    } catch (err) {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (u) => {
    setForm({
      name: u.name,
      email: u.email,
      points: u.points || 0,
      role: u.role || "user"
    });
    setEditingId(u._id);
    setError("");
    setSuccess("");
  };

  const handleCancelEdit = () => {
    resetForm();
  };

  const resetForm = () => {
    setForm({ name: "", email: "", points: 0, role: "user" });
    setEditingId(null);
  };

  return (
    <>
      <div className="p-8 max-w-5xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">👥 User Management</h2>
        </div>

        <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-5 gap-2 mb-4">
          <input
            type="text"
            placeholder="Name"
            value={form.name}
            onChange={(e) => setForm({ ...form, name: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
          <input
            type="email"
            placeholder="Email"
            value={form.email}
            onChange={(e) => setForm({ ...form, email: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
          
          <input
            type="number"
            placeholder="Points"
            value={form.points}
            onChange={(e) => setForm({ ...form, points: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
          <select
            value={form.role}
            onChange={(e) => setForm({ ...form, role: e.target.value })}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>

          <div className="flex gap-2 md:col-span-5">
            <button
              type="submit"
              className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded ${loading ? "opacity-50" : ""}`}
              disabled={loading}
            >
              {editingId ? "Update" : "Create"}
            </button>
            {editingId && (
              <button
                type="button"
                onClick={handleCancelEdit}
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold px-4 py-2 rounded"
                disabled={loading}
              >
                Cancel
              </button>
            )}
          </div>
        </form>

        {error && <div className="text-red-700 mb-2">{error}</div>}
        {success && <div className="text-green-700 mb-2">{success}</div>}
        {loading && <div className="mb-2">Loading...</div>}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Name</th>
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Email</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Points</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Role</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{u.name}</td>
                  <td className="px-4 py-2">{u.email}</td>
                  <td className="px-4 py-2 text-center">{u.points || 0}</td>
                  <td className="px-4 py-2 text-center capitalize">{u.role}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(u)}
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(u._id)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {users.length === 0 && !loading && (
                <tr>
                  <td colSpan="5" className="text-center text-gray-500 py-8">
                    No users found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(AdminUserPage);
