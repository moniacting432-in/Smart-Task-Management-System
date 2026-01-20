import React from "react";
import TaskCard from "./TaskCard";

export default function TaskList({ tasks = [], onView, onEdit, onDelete }) {
  if (tasks.length === 0) {
    return (
      <p className="text-gray-500 text-center py-6">No tasks available.</p>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
      {tasks.map((task, index) => (
        <TaskCard
          key={task._id || task.id || index} 
          task={task}
          onView={onView}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
