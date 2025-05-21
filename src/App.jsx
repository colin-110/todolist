import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState(() => {
    const saved = localStorage.getItem('tasks');
    return saved ? JSON.parse(saved) : [];
  });

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === '') return;
    setTasks([...tasks, { text: task, done: false }]);
    setTask('');
  };

  const toggleDone = (index) => {
    const updated = [...tasks];
    updated[index].done = !updated[index].done;
    setTasks(updated);
  };

  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="wrapper"> 
      <div className="todo-app">
        <h1>To-Do List</h1>
        <div className="input-group">
          <input
            type="text"
            value={task}
            onChange={(e) => setTask(e.target.value)}
            placeholder="Add a task..."
          />
          <button onClick={addTask}>Add</button>
        </div>
        <ul>
          {tasks.map((t, i) => (
            <li key={i} className={t.done ? 'done' : ''}>
              <span onClick={() => toggleDone(i)}>{t.text}</span>
              <button onClick={() => deleteTask(i)}>✖</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
