import React, { useEffect, useState } from "react";
import client from "../../../services/restClient";

import { connect } from "react-redux";

const CategoryAdmin = ({ user }) => {
  const [categories, setCategories] = useState([]);
  const [name, setName] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchCategories();
  }, []);

  const fetchCategories = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await client.service("category").find({ query: { $limit: 1000 } });
      setCategories(res.data);
    } catch (err) {
      setError("Error fetching categories");
      setCategories([]);
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!name.trim()) {
      setError("Category name is required");
      return;
    }
    setLoading(true);
    try {
      if (editingId) {
        await client.service("category").patch(editingId, { name, updatedBy: user?._id });
        setSuccess("Category updated successfully");
      } else {
        if (!user?._id) throw new Error("User not found");
        await client.service("category").create({
          name,
          createdBy: user._id,
          updatedBy: user._id
        });
        setSuccess("Category created successfully");
      }
      setName("");
      setEditingId(null);
      fetchCategories();
    } catch (err) {
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await client.service("category").remove(id);
      setSuccess("Category deleted successfully");
      fetchCategories();
    } catch (err) {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = (cat) => {
    setName(cat.name);
    setEditingId(cat._id);
    setError("");
    setSuccess("");
  };

  const handleCancelEdit = () => {
    setName("");
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  return (
    <>
      <div className="p-8 max-w-4xl mx-auto">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-semibold">📂 Category Management</h2>
         
        </div>

        <form onSubmit={handleSubmit} className="flex gap-2 mb-4">
          <input
            type="text"
            placeholder="Category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            className="flex-1 border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
          <button
            type="submit"
            className={`bg-green-600 hover:bg-green-700 text-white font-semibold px-4 py-2 rounded ${loading ? 'opacity-50' : ''}`}
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
        </form>

        {error && <div className="text-red-700 mb-2">{error}</div>}
        {success && <div className="text-green-700 mb-2">{success}</div>}
        {loading && <div className="mb-2">Loading...</div>}

        <div className="bg-white rounded-lg shadow overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-100">
                <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
                <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((cat) => (
                <tr key={cat._id} className="hover:bg-gray-50 transition">
                  <td className="px-4 py-2">{cat.name}</td>
                  <td className="px-4 py-2 text-center space-x-2">
                    <button
                      onClick={() => handleEdit(cat)}
                      disabled={loading}
                      className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(cat._id)}
                      disabled={loading}
                      className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
              {categories.length === 0 && !loading && (
                <tr>
                  <td colSpan="2" className="text-center text-gray-500 py-8">No available options</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination placeholder */}
        <div className="flex items-center justify-between mt-4">
          <div className="flex items-center gap-2">
            <select className="border rounded px-2 py-1 text-sm">
              <option>10</option>
              <option>20</option>
              <option>50</option>
            </select>
            <span className="text-gray-500 text-sm">per page</span>
          </div>
          <div className="flex items-center gap-2 text-gray-500 text-sm">
            <button className="disabled:opacity-50" disabled>{"≪"}</button>
            <button className="disabled:opacity-50" disabled>{"<"}</button>
            <span>0 to 0 of 0</span>
            <button className="disabled:opacity-50" disabled>{">"}</button>
            <button className="disabled:opacity-50" disabled>{"≫"}</button>
          </div>
        </div>
      </div>
    </>
  );
};

const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(CategoryAdmin);
