import "./styles.css";
import React, { useState } from "react";

export interface ITaskList {
  task: string;
  isChecked: boolean;
}

export default function App() {
  const [taskList, setTaskList] = useState<ITaskList[]>([]);
  const [task, setTask] = useState("");

  const addTask = (task: any) => {
    setTaskList([
      ...taskList,
      {
        task: task,
        isChecked: false
      }
    ]);
  };

  const handleSubmit = () => {
    if (!task) {
      return;
    }
    addTask(task);
    setTask("");
  };

  const handleChange = (value: string) => {
    setTask(value);
  };

  const handleComplete = (id: number) => {
    setTaskList(
      taskList.map((task, idx) => {
        if (idx === id) {
          return { task: task.task, isChecked: !task.isChecked };
        }

        return task;
      })
    );
  };

  const handleDelete = (id: number) => {
    setTaskList(taskList.filter((task, idx) => idx !== id));
  };

  return (
    <div className="App">
      <p>Todos ({taskList.length})</p>
      <div className="create-todo">
        <input
          type="text"
          value={task}
          placeholder="Enter a task"
          onChange={(e) => handleChange(e.target.value)}
        />
        <button onClick={() => handleSubmit()}>Create Todo</button>
      </div>
      <ul>
        {taskList.map((task, idx) => (
          <li key={idx}>
            <input
              type="checkbox"
              onChange={() => handleComplete(idx)}
              checked={task.isChecked}
            />
            <span className={task.isChecked ? "isChecked" : ""}>
              {task.task}
            </span>
            <button onClick={() => handleDelete(idx)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}
