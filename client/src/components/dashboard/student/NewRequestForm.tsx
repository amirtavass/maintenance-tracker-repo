"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FormData {
  title: string;
  description: string;
  category: string;
  priority: string;
  roomNumber: string;
}

interface FormErrors {
  title?: string;
  description?: string;
  category?: string;
  roomNumber?: string;
}

export default function NewRequestForm() {
  const router = useRouter();
  const [formData, setFormData] = useState<FormData>({
    title: "",
    description: "",
    category: "",
    priority: "low",
    roomNumber: "",
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState("");

  const categories = ["Plumbing", "Electrical", "Furniture", "Internet", "Other"];
  const priorities = ["low", "medium", "high"];

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }
  };

  const validateForm = (): FormErrors => {
    const newErrors: FormErrors = {};
    if (!formData.title.trim()) newErrors.title = "Issue title is required.";
    if (!formData.description.trim()) newErrors.description = "Description is required.";
    if (!formData.category) newErrors.category = "Category is required.";
    if (!formData.roomNumber.trim()) newErrors.roomNumber = "Room number is required.";
    return newErrors;
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const validationErrors = validateForm();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setIsSubmitting(true);
    setSubmitMessage("");

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:5001/api/tickets", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        setSubmitMessage("Request submitted successfully!");
        setTimeout(() => {
          router.push("/dashboard/student");
        }, 2000);
      } else {
        setSubmitMessage(data.message || "Failed to submit request.");
      }
    } catch (error) {
      setSubmitMessage("An error occurred. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white rounded-2xl shadow-lg p-8 space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-slate-700 mb-2">
          Issue Title *
        </label>
        <input
          type="text"
          id="title"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Brief description of the issue"
        />
        {errors.title && <p className="text-red-500 text-sm mt-1">{errors.title}</p>}
      </div>

      <div>
        <label htmlFor="description" className="block text-sm font-medium text-slate-700 mb-2">
          Description *
        </label>
        <textarea
          id="description"
          name="description"
          value={formData.description}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="Detailed description of the issue"
        />
        {errors.description && <p className="text-red-500 text-sm mt-1">{errors.description}</p>}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-slate-700 mb-2">
            Category *
          </label>
          <select
            id="category"
            name="category"
            value={formData.category}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
          {errors.category && <p className="text-red-500 text-sm mt-1">{errors.category}</p>}
        </div>

        <div>
          <label htmlFor="priority" className="block text-sm font-medium text-slate-700 mb-2">
            Priority
          </label>
          <select
            id="priority"
            name="priority"
            value={formData.priority}
            onChange={handleChange}
            className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            {priorities.map((pri) => (
              <option key={pri} value={pri}>
                {pri.charAt(0).toUpperCase() + pri.slice(1)}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="roomNumber" className="block text-sm font-medium text-slate-700 mb-2">
          Room Number *
        </label>
        <input
          type="text"
          id="roomNumber"
          name="roomNumber"
          value={formData.roomNumber}
          onChange={handleChange}
          className="w-full px-4 py-3 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="e.g., 214"
        />
        {errors.roomNumber && <p className="text-red-500 text-sm mt-1">{errors.roomNumber}</p>}
      </div>

      {submitMessage && (
        <div className={`p-4 rounded-lg ${submitMessage.includes("success") ? "bg-green-50 text-green-700" : "bg-red-50 text-red-700"}`}>
          {submitMessage}
        </div>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
      >
        {isSubmitting ? "Submitting..." : "Submit Request"}
      </button>
    </form>
  );
}