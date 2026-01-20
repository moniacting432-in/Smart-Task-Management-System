import React from "react";

export default function TaskView({ task }) {
  if (!task) return null;

  return (
    <div className="space-y-3">
      <h2 className="text-2xl font-bold text-indigo-600 border-b pb-2">
        {task.title}
      </h2>

      <div className="text-gray-700">
        <p>
          <strong>Description:</strong> {task.description || "No description"}
        </p>
        <p>
          <strong>Status:</strong>{" "}
          <span
            className={`font-semibold ${
              task.status === "Pending"
                ? "text-red-500"
                : task.status === "In Progress"
                ? "text-yellow-500"
                : "text-green-600"
            }`}
          >
            {task.status}
          </span>
        </p>
        <p>
          <strong>Priority:</strong> {task.priority || "Medium"}
        </p>
        {task.dueDate && (
          <p>
            <strong>Due Date:</strong>{" "}
            {new Date(task.dueDate).toLocaleDateString()}
          </p>
        )}
      </div>
    </div>
  );
}
