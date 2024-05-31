import React, { useState, useEffect } from "react";
import "./ToDoList.css"; // Import the CSS file

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [taskInput, setTaskInput] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks"));
    if (storedTasks) {
      setTasks(storedTasks);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (taskInput.trim() === "") return;

    const newTask = {
      id: Date.now(),
      text: taskInput,
      completed: false,
    };

    setTasks([...tasks, newTask]);
    setTaskInput("");
  };

  const handleRemoveTask = (taskId) => {
    setTasks(tasks.filter((task) => task.id !== taskId));
  };

  const handleToggleCompletion = (taskId) => {
    setTasks(
      tasks.map((task) =>
        task.id === taskId ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const handleSort = (criterion) => {
    const sortedTasks = [...tasks].sort((a, b) => {
      if (criterion === "alphabetical") {
        return a.text.localeCompare(b.text);
      } else if (criterion === "completed") {
        return a.completed - b.completed;
      } else {
        return 0;
      }
    });
    setTasks(sortedTasks);
  };

  const handleFilter = (filter) => {
    setFilter(filter);
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "completed") {
      return task.completed;
    } else if (filter === "active") {
      return !task.completed;
    } else {
      return true;
    }
  });

  return (
    <div className="todo-container">
      <h1>To-Do List</h1>
      <div className="input-group">
        <input
          type="text"
          value={taskInput}
          onChange={(e) => setTaskInput(e.target.value)}
          placeholder="Add a new task"
          className="task-input"
        />
        <button onClick={handleAddTask} className="add-button">
          Add Task
        </button>
      </div>
      <div className="button-group">
        <button
          onClick={() => handleSort("alphabetical")}
          className="sort-button"
        >
          Sort Alphabetically
        </button>
        <button onClick={() => handleSort("completed")} className="sort-button">
          Sort by Completion
        </button>
      </div>
      <div className="button-group">
        <button onClick={() => handleFilter("all")} className="filter-button">
          All
        </button>
        <button
          onClick={() => handleFilter("active")}
          className="filter-button"
        >
          Active
        </button>
        <button
          onClick={() => handleFilter("completed")}
          className="filter-button"
        >
          Completed
        </button>
      </div>
      <p className="note">Click on a task to mark it as completed.</p>
      <ul className="task-list">
        {filteredTasks.map((task) => (
          <li
            key={task.id}
            className={`task-item ${task.completed ? "completed" : ""}`}
          >
            <span
              className="task-text"
              onClick={() => handleToggleCompletion(task.id)}
            >
              {task.text}
            </span>
            <button
              onClick={() => handleRemoveTask(task.id)}
              className="remove-button"
            >
              Remove
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
