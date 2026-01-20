import React, { useState } from "react";

export default function TaskForm({
  formData,
  setFormData,
  onSubmit,
  onCancel,
  buttonLabel = "Save Task",
}) {
  const [isSubmitting, setIsSubmitting] = useState(false); 

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isSubmitting) return; 
    setIsSubmitting(true);

    await onSubmit(e);

    
    if (buttonLabel !== "Update Task") {
      setFormData({
        title: "",
        description: "",
        status: "Pending",
        priority: "Medium",
        dueDate: "",
      });
    }

    setIsSubmitting(false);
  };

  return (
    <form
      className="space-y-4 bg-white p-6 rounded-xl shadow-md border border-gray-100"
      onSubmit={handleSubmit}
    >
      <h2 className="text-xl font-semibold text-gray-800 mb-2">
        {buttonLabel === "Update Task" ? "Edit Task" : "Add New Task"}
      </h2>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          type="text"
          placeholder="Enter task title"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 outline-none"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Description
        </label>
        <textarea
          placeholder="Write task description..."
          value={formData.description}
          onChange={(e) =>
            setFormData({ ...formData, description: e.target.value })
          }
          className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 outline-none"
          rows="3"
          required
        />
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Status
        </label>
        <select
          value={formData.status}
          onChange={(e) => setFormData({ ...formData, status: e.target.value })}
          className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 outline-none"
          required
        >
          <option value="">Select status</option>
          <option value="Pending">Pending</option>
          <option value="In Progress">In Progress</option>
          <option value="Completed">Completed</option>
        </select>
      </div>

     
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Priority
        </label>
        <select
          value={formData.priority}
          onChange={(e) =>
            setFormData({ ...formData, priority: e.target.value })
          }
          className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 outline-none"
          required
        >
          <option value="">Select priority</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
          <option value="Low">Low</option>
        </select>
      </div>

      
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">
          Due Date
        </label>
        <input
          type="date"
          value={formData.dueDate || ""}
          onChange={(e) =>
            setFormData({ ...formData, dueDate: e.target.value })
          }
          className="w-full border border-gray-300 focus:ring-2 focus:ring-indigo-500 rounded-lg p-2 outline-none"
        />
      </div>

     
      <div className="flex justify-end space-x-3 pt-2">
        <button
          type="button"
          className="px-4 py-2 bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300"
          onClick={onCancel}
          disabled={isSubmitting}
        >
          Cancel
        </button>

        <button
          type="submit"
          className={`px-4 py-2 rounded-md text-white ${
            isSubmitting
              ? "bg-indigo-300 cursor-not-allowed"
              : "bg-indigo-600 hover:bg-indigo-700"
          }`}
          disabled={isSubmitting}
        >
          {isSubmitting
            ? "Saving..."
            : buttonLabel === "Update Task"
            ? "Update Task"
            : "Save Task"}
        </button>
      </div>
    </form>
  );
}
