import { useState, memo, useRef } from 'react'

// كل عنصر مهمة
const TaskItem = memo(function TaskItem({ task, onDelete }) {
  const renderCount = useRef(0)
  renderCount.current += 1

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      padding: '10px',
      marginBottom: '8px',
      border: '1px solid #ddd',
      borderRadius: '8px',
      background: '#fff'
    }}>
      <span>{task.text}</span>

      <div style={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
        <small style={{ color: 'red' }}>
          renders: {renderCount.current}
        </small>

        <button onClick={() => onDelete(task.id)}>
          Delete
        </button>
      </div>
    </div>
  )
})

export default function TaskManager() {
  const [tasks, setTasks] = useState([
    { id: 1, text: 'Learn React hooks' },
    { id: 2, text: 'Build a project' },
    { id: 3, text: 'Practice daily' },
  ])

  const [inputText, setInputText] = useState('')

  const handleAdd = () => {
    if (!inputText.trim()) return

    setTasks(prev => [
      ...prev,
      { id: Date.now(), text: inputText }
    ])

    setInputText('')
  }

  const handleDelete = (id) => {
    setTasks(prev => prev.filter(t => t.id !== id))
  }

  return (
    <div style={{
      maxWidth: '500px',
      margin: '40px auto',
      padding: '20px',
      background: '#f9fafb',
      borderRadius: '12px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
    }}>

      <h2 style={{ textAlign: 'center' }}>Task Manager</h2>

      <div style={{ display: 'flex', gap: '10px', marginBottom: '15px' }}>
        <input
          value={inputText}
          onChange={(e) => setInputText(e.target.value)}
          placeholder="Add task..."
          style={{
            flex: 1,
            padding: '10px',
            borderRadius: '6px',
            border: '1px solid #ccc'
          }}
        />

        <button onClick={handleAdd}>
          Add
        </button>
      </div>

      {tasks.map(task => (
        <TaskItem
          key={task.id}
          task={task}
          onDelete={handleDelete}
        />
      ))}
    </div>
  )
}