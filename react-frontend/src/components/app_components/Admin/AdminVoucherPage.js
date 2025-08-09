
import React, { useState, useEffect } from "react";
import client from "../../../services/restClient";
import { connect } from "react-redux";

const VoucherAdmin = ({ user }) => {
  // Cancel edit and reset form
  const handleCancelEdit = () => {
    setForm({ title: "", description: "", image: "", points: 0, categoryId: "", expiryDate: "", termsCondition: "", isLatest: false });
    setEditingId(null);
    setError("");
    setSuccess("");
  };

  const handleDelete = async (id) => {
    setError("");
    setSuccess("");
    setLoading(true);
    try {
      await client.service("vouchers").remove(id);
      setSuccess("Voucher deleted successfully");
      fetchVouchers();
    } catch (err) {
      setError("Delete failed");
    } finally {
      setLoading(false);
    }
  };
  const [vouchers, setVouchers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({
    title: "",
    description: "",
    image: "",
    points: 0,
    categoryId: "",
    expiryDate: "",
    termsCondition: "",
    isLatest: false
  });
  const [uploading, setUploading] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

  useEffect(() => {
    fetchVouchers();
    fetchCategories();
  }, []);

  const fetchVouchers = async () => {
    setLoading(true);
    setError("");
    try {
      const res = await client.service("vouchers").find({ query: { $limit: 1000 } });
      setVouchers(res.data);
    } catch (err) {
      setError("Error fetching vouchers");
      setVouchers([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const res = await client.service("category").find();
      setCategories(res.data);
    } catch (err) {
      setCategories([]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  // Handle image file upload
  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    if (!file) return;
    setUploading(true);
    setError("");
    try {
      const formData = new FormData();
      formData.append("file", file);
      // Adjust the endpoint if your backend expects a different path
      const res = await client.service("upload").create(formData, {
        headers: { "Content-Type": "multipart/form-data" }
      });
      // If backend returns { url: "..." }, use it. Otherwise, fallback to local preview.
      if (res && res.url) {
        setForm((prev) => ({ ...prev, image: res.url }));
      } else {
        // fallback: show local preview
        const localUrl = URL.createObjectURL(file);
        setForm((prev) => ({ ...prev, image: localUrl }));
      }
      setSuccess("Image uploaded successfully");
    } catch (err) {
      setError("Image upload failed");
    } finally {
      setUploading(false);
    }
  };

  // Submit handler: validate required fields and send user info
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (!form.title.trim()) {
      setError("Title is required");
      return;
    }
    // Accept both backend URLs and local preview (blob:)
    if (!form.image || typeof form.image !== 'string' || form.image.trim() === "") {
      setError("Image is required");
      return;
    }
    // If image is a blob: URL, show error but allow preview, do not submit to backend
    if (form.image.startsWith('blob:')) {
      setError("Please wait for the image to finish uploading before submitting.");
      return;
    }
    if (!form.description.trim()) {
      setError("Description is required");
      return;
    }
    if (!form.termsCondition.trim()) {
      setError("Terms and condition is required");
      return;
    }
    if (!user?._id) {
      setError("User not found");
      return;
    }
    setLoading(true);
    try {
      const payload = {
        ...form,
        points: Number(form.points),
        updatedBy: user._id,
        isLatest: Boolean(form.isLatest)
      };
      if (editingId) {
        await client.service("vouchers").patch(editingId, payload);
        setSuccess("Voucher updated successfully");
      } else {
        await client.service("vouchers").create({
          ...payload,
          createdBy: user._id
        });
        setSuccess("Voucher created successfully");
      }
      setForm({ title: "", description: "", image: "", points: 0, categoryId: "", expiryDate: "", termsCondition: "", isLatest: false });
      setEditingId(null);
      fetchVouchers();
    } catch (err) {
      setError("Save failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-semibold">🎁 Voucher Management</h2>
        <button
          type="button"
          className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-full shadow flex items-center gap-2"
          onClick={handleCancelEdit}
          disabled={loading}
        >
          <span className="text-lg">＋</span> add
        </button>
      </div>


      <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4 bg-white p-4 rounded-lg shadow">
        <div className="flex flex-col">
          <label htmlFor="title" className="font-medium text-gray-700 mb-1">Title</label>
          <input
            id="title"
            name="title"
            placeholder="Title"
            value={form.title}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="points" className="font-medium text-gray-700 mb-1">Points</label>
          <input
            id="points"
            name="points"
            type="number"
            placeholder="Points"
            value={form.points}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="expiryDate" className="font-medium text-gray-700 mb-1">Expiry Date</label>
          <input
            id="expiryDate"
            name="expiryDate"
            type="date"
            value={form.expiryDate}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col">
          <label htmlFor="categoryId" className="font-medium text-gray-700 mb-1">Category</label>
          <select
            id="categoryId"
            name="categoryId"
            value={form.categoryId}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          >
            <option value="">Select Category</option>
            {categories.map((c) => (
              <option key={c._id} value={c._id}>{c.name}</option>
            ))}
          </select>
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label htmlFor="image" className="font-medium text-gray-700 mb-1">Image URL</label>
          <input
            id="image"
            name="image"
            type="text"
            placeholder="Image URL"
            value={form.image}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
          {form.image && (
            <img src={form.image} alt="Preview" className="h-20 w-auto object-cover rounded border mt-2" />
          )}
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label htmlFor="description" className="font-medium text-gray-700 mb-1">Description</label>
          <textarea
            id="description"
            name="description"
            placeholder="Description"
            value={form.description}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
        </div>
        <div className="flex flex-col col-span-1 md:col-span-2">
          <label htmlFor="termsCondition" className="font-medium text-gray-700 mb-1">Terms and Condition</label>
          <textarea
            id="termsCondition"
            name="termsCondition"
            placeholder="Terms and condition"
            value={form.termsCondition}
            onChange={handleChange}
            className="border border-gray-300 rounded px-3 py-2 focus:outline-none focus:ring-2 focus:ring-red-400"
            disabled={loading}
          />
        </div>
        <div className="flex items-center col-span-1 md:col-span-2 mt-2">
          <input
            type="checkbox"
            name="isLatest"
            checked={form.isLatest}
            onChange={e => setForm(prev => ({ ...prev, isLatest: e.target.checked }))}
            className="mr-2"
            disabled={loading}
          />
          <label htmlFor="isLatest" className="text-gray-700">Is latest</label>
        </div>
        <div className="col-span-1 md:col-span-2 flex gap-2 mt-2">
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
        </div>
      </form>


      {error && <div className="text-red-700 mb-2">{error}</div>}
      {success && <div className="text-green-700 mb-2">{success}</div>}
      {loading && <div className="mb-2">Loading...</div>}

      <div className="bg-white rounded-lg shadow overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-100">
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Title</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Category</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Points</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Expiry</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Image</th>
              <th className="px-4 py-3 text-left font-semibold text-gray-700">Terms &amp; Condition</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Is Latest</th>
              <th className="px-4 py-3 text-center font-semibold text-gray-700">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vouchers.map((v) => (
              <tr key={v._id} className="hover:bg-gray-50 transition">
                <td className="px-4 py-2">{v.title}</td>
                <td className="px-4 py-2">{v.categoryId?.name || v.categoryId || "-"}</td>
                <td className="px-4 py-2">{v.points}</td>
                <td className="px-4 py-2">{v.expiryDate ? v.expiryDate.slice(0, 10) : "-"}</td>
                <td className="px-4 py-2">
                  {v.image ? (
                    <img src={v.image} alt="voucher" className="h-10 w-16 object-cover rounded" />
                  ) : (
                    <span className="text-gray-400">No image</span>
                  )}
                </td>
                <td className="px-4 py-2 max-w-xs truncate" title={v.termsCondition}>{v.termsCondition}</td>
                <td className="px-4 py-2 text-center">{v.isLatest ? "Yes" : "No"}</td>
                <td className="px-4 py-2 text-center space-x-2">
                  <button
                    onClick={() => {
                      setForm({
                        title: v.title,
                        description: v.description,
                        image: v.image,
                        points: v.points,
                        categoryId: v.categoryId?._id || v.categoryId || "",
                        expiryDate: v.expiryDate ? v.expiryDate.slice(0, 10) : "",
                        termsCondition: v.termsCondition || "",
                        isLatest: !!v.isLatest
                      });
                      setEditingId(v._id);
                      setError("");
                      setSuccess("");
                    }}
                    disabled={loading}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={() => handleDelete(v._id)}
                    disabled={loading}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
            {vouchers.length === 0 && !loading && (
              <tr>
                <td colSpan="6" className="text-center text-gray-500 py-8">No available options</td>
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
  );
}


const mapStateToProps = (state) => ({
  user: state.auth.user
});

export default connect(mapStateToProps)(VoucherAdmin);
