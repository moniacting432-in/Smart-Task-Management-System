'use client';
import React, { useEffect, useState } from 'react';
import TaskList from './components/TaskList';
import TaskModel from './components/TaskModel';
import TaskView from './components/TaskView';
import TaskForm from './components/TaskForm';
import { useAuth } from './lib/AuthContext';
import { useRouter } from 'next/navigation';

export default function Page() {
  const { user, logout } = useAuth();
  const router = useRouter();

  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);
  const [isEditing, setIsEditing] = useState(null);
  const [selectedTask, setSelectedTask] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    status: 'Pending',
    priority: 'Medium',
  });

  const [search, setSearch] = useState('');
  const [status, setStatus] = useState('');
  const [priority, setPriority] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    if (!user) router.push('/login');
  }, [user, router]);

  const fetchTasks = async () => {
    if (!user) return;

    try {
      setLoading(true);

      const params = new URLSearchParams({
        userId: user.uid,
        search,
        status,
        priority,
        sortBy,
      });

      const res = await fetch(`/api/tasks?${params.toString()}`);
      const data = await res.json();

      setTasks(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error('Fetch error:', err);
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTasks();
  }, [user, search, status, priority, sortBy]);

  
  const handleAddTask = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ ...formData, userId: user.uid }),
      });

      const newTask = await res.json();
      setTasks((prev) => [...prev, newTask]);

      setIsAdding(false);
      setFormData({
        title: '',
        description: '',
        status: 'Pending',
        priority: 'Medium',
      });
    } catch (err) {
      console.error('Add error:', err);
    }
  };

  
  const handleUpdateTask = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`/api/tasks/${isEditing._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const updated = await res.json();

      setTasks((prev) =>
        prev.map((t) => (t._id === updated._id ? updated : t))
      );

      setIsEditing(null);
    } catch (err) {
      console.error('Update error:', err);
    }
  };

  
  const handleDelete = async (id) => {
    try {
      await fetch(`/api/tasks/${id}`, { method: 'DELETE' });
      setTasks((prev) => prev.filter((t) => t._id !== id));
    } catch (err) {
      console.error('Delete error:', err);
    }
  };

  if (loading) {
    return <p className="text-center mt-20">Loading tasks...</p>;
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <div className="max-w-4xl mx-auto">

        
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">Task Manager</h1>

          <div className="flex items-center gap-4">
            <button
              className="bg-blue-600 text-white px-4 py-2 rounded"
              onClick={() => setIsAdding(true)}
            >
              Add Task
            </button>

            <button
              className="bg-red-600 text-white px-4 py-2 rounded"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>

       
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
          <input
            placeholder="Search"
            className="border p-2 rounded"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select className="border p-2" onChange={(e) => setStatus(e.target.value)}>
            <option value="">All Status</option>
            <option value="Pending">Pending</option>
            <option value="Completed">Completed</option>
          </select>

          <select className="border p-2" onChange={(e) => setPriority(e.target.value)}>
            <option value="">All Priority</option>
            <option value="Low">Low</option>
            <option value="Medium">Medium</option>
            <option value="High">High</option>
          </select>

          <select className="border p-2" onChange={(e) => setSortBy(e.target.value)}>
            <option value="">Sort By</option>
            <option value="priority">Priority</option>
            <option value="dueDate">Due Date</option>
          </select>
        </div>

        
        <TaskList
          tasks={tasks}
          onView={setSelectedTask}
          onEdit={(task) => {
            setIsEditing(task);
            setFormData(task);
          }}
          onDelete={handleDelete}
        />

        
        {selectedTask && (
          <TaskModel onClose={() => setSelectedTask(null)}>
            <TaskView task={selectedTask} />
          </TaskModel>
        )}

        {isAdding && (
          <TaskModel onClose={() => setIsAdding(false)}>
            <TaskForm
              onSubmit={handleAddTask}
              formData={formData}
              setFormData={setFormData}
              buttonLabel="Add Task"
            />
          </TaskModel>
        )}

        {isEditing && (
          <TaskModel onClose={() => setIsEditing(null)}>
            <TaskForm
              onSubmit={handleUpdateTask}
              formData={formData}
              setFormData={setFormData}
              buttonLabel="Update Task"
            />
          </TaskModel>
        )}
      </div>
    </div>
  );
}
