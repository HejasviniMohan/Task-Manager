import React, { useState, useEffect } from 'react';
import TaskList from './components/TaskList';
import './App.css';

const API_BASE_URL = 'http://localhost:8080/api/tasks';

function App() {
  const [tasks, setTasks] = useState([]);
  const [formData, setFormData] = useState({ 
    title: '', 
    description: '', 
    priority: 'MEDIUM', 
    category: 'PERSONAL',
    dueDate: '',
    dueTime: ''
  });
  const [editingTask, setEditingTask] = useState(null);
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState('ALL'); // ALL, COMPLETED, PENDING
  const [backendStatus, setBackendStatus] = useState('checking'); // checking, connected, disconnected
  const [searchTerm, setSearchTerm] = useState('');
  const [customCategories, setCustomCategories] = useState(['PERSONAL', 'WORK', 'SHOPPING', 'HEALTH', 'STUDY']);
  const [newCategory, setNewCategory] = useState('');
  const [showAddCategory, setShowAddCategory] = useState(false);

  // Fetch tasks from API
  const fetchTasks = async () => {
    setLoading(true);
    try {
      const response = await fetch(API_BASE_URL);
      if (response.ok) {
        const data = await response.json();
        setTasks(data);
        setBackendStatus('connected');
        console.log('Tasks loaded from backend:', data);
      } else {
        console.error('Failed to fetch tasks:', response.status, response.statusText);
        setBackendStatus('disconnected');
        // Start with empty tasks if backend is not available
        setTasks([]);
      }
    } catch (error) {
      console.error('Error fetching tasks:', error);
      setBackendStatus('disconnected');
      // Start with empty tasks if backend is not available
      setTasks([]);
    } finally {
      setLoading(false);
    }
  };

  // Load tasks on component mount
  useEffect(() => {
    fetchTasks();
  }, []);

  // Debug form data changes
  useEffect(() => {
    console.log('Form data changed:', formData);
  }, [formData]);

  // Add or update task
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    console.log('Form submitted with data:', formData);
    console.log('Editing task:', editingTask);
    
    try {
      if (editingTask) {
        // Update existing task
        const response = await fetch(`${API_BASE_URL}/${editingTask.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ ...editingTask, ...formData }),
        });
        
        if (response.ok) {
          const updatedTask = await response.json();
          setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
          setEditingTask(null);
        } else {
          console.error('Failed to update task:', response.status, response.statusText);
          // Fallback to local update
          const updatedTask = { ...editingTask, ...formData };
          setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
          setEditingTask(null);
        }
      } else {
        // Create new task
        const response = await fetch(API_BASE_URL, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(formData),
        });
        
        if (response.ok) {
          const newTask = await response.json();
          setTasks([...tasks, newTask]);
        } else {
          console.error('Failed to create task:', response.status, response.statusText);
          // Fallback to local creation
          const newTask = { 
            ...formData, 
            id: Date.now().toString(), 
            completed: false,
            createdAt: new Date().toISOString(),
            updatedAt: new Date().toISOString()
          };
          setTasks([...tasks, newTask]);
        }
      }
      setFormData({ title: '', description: '', priority: 'MEDIUM', category: 'PERSONAL', dueDate: '', dueTime: '' });
    } catch (error) {
      console.error('Error saving task:', error);
      // Fallback to local storage when backend is not available
      if (editingTask) {
        const updatedTask = { ...editingTask, ...formData };
        setTasks(tasks.map(t => t.id === editingTask.id ? updatedTask : t));
        setEditingTask(null);
      } else {
        const newTask = { 
          ...formData, 
          id: Date.now().toString(), 
          completed: false,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
        setTasks([...tasks, newTask]);
      }
      setFormData({ title: '', description: '', priority: 'MEDIUM', category: 'PERSONAL', dueDate: '', dueTime: '' });
    } finally {
      setLoading(false);
    }
  };

  // Edit task
  const handleEdit = (task) => {
    setEditingTask(task);
    setFormData({ 
      title: task.title, 
      description: task.description, 
      priority: task.priority || 'MEDIUM',
      category: task.category || 'PERSONAL',
      dueDate: task.dueDate || '',
      dueTime: task.dueTime || ''
    });
  };

  // Delete task
  const handleDelete = async (id) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${id}`, {
        method: 'DELETE',
      });
      
      if (response.ok) {
        setTasks(tasks.filter(t => t.id !== id));
      } else {
        console.error('Failed to delete task:', response.status, response.statusText);
        // Fallback to local deletion
        setTasks(tasks.filter(t => t.id !== id));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
      // Fallback to local deletion when backend is not available
      setTasks(tasks.filter(t => t.id !== id));
    } finally {
      setLoading(false);
    }
  };

  // Toggle complete
  const handleToggleComplete = async (task) => {
    setLoading(true);
    try {
      const response = await fetch(`${API_BASE_URL}/${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ ...task, completed: !task.completed }),
      });
      
      if (response.ok) {
        const updatedTask = await response.json();
        setTasks(tasks.map(t => t.id === task.id ? updatedTask : t));
      } else {
        console.error('Failed to update task:', response.status, response.statusText);
        // Fallback to local update
        setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
      }
    } catch (error) {
      console.error('Error updating task:', error);
      // Fallback to local update when backend is not available
      setTasks(tasks.map(t => t.id === task.id ? { ...t, completed: !t.completed } : t));
    } finally {
      setLoading(false);
    }
  };

  // Get category icon
  const getCategoryIcon = (category) => {
    switch (category) {
      case 'PERSONAL': return '👤';
      case 'WORK': return '💼';
      case 'SHOPPING': return '🛒';
      case 'HEALTH': return '🏥';
      case 'STUDY': return '📚';
      default: return '📋';
    }
  };

  // Add custom category
  const handleAddCategory = () => {
    if (newCategory.trim() && !customCategories.includes(newCategory.trim().toUpperCase())) {
      setCustomCategories([...customCategories, newCategory.trim().toUpperCase()]);
      setNewCategory('');
      setShowAddCategory(false);
    }
  };

  // Filter and search tasks
  const filteredTasks = tasks.filter(task => {
    // Apply completion filter
    if (filter === 'COMPLETED' && !task.completed) return false;
    if (filter === 'PENDING' && task.completed) return false;
    
    // Apply search filter
    if (searchTerm) {
      const searchLower = searchTerm.toLowerCase();
      return task.title.toLowerCase().includes(searchLower) || 
             (task.description && task.description.toLowerCase().includes(searchLower));
    }
    
    return true;
  });

  return (
    <div className="app">
      <header className="app-header">
        <h1>📝 Task Manager</h1>
        <p>Organize your life, one task at a time</p>
        <div className="backend-status">
          {backendStatus === 'checking' && <span className="status-checking">🔄 Checking backend...</span>}
          {backendStatus === 'connected' && <span className="status-connected">✅ Backend connected</span>}
          {backendStatus === 'disconnected' && <span className="status-disconnected">⚠️ Backend offline - using local storage</span>}
        </div>
      </header>

      <div className="task-form-container">
        <form onSubmit={handleSubmit} className="task-form">
          <div className="form-row">
            <input
              type="text"
              name="title"
              placeholder="Task title"
              value={formData.title}
              onChange={e => setFormData({ ...formData, title: e.target.value })}
              required
              className="form-input"
            />
            <input
              type="text"
              name="description"
              placeholder="Task description"
              value={formData.description}
              onChange={e => setFormData({ ...formData, description: e.target.value })}
              className="form-input"
            />
          </div>
          
          <div className="form-row">
            <select
              name="priority"
              value={formData.priority}
              onChange={e => setFormData({ ...formData, priority: e.target.value })}
              className="form-select"
            >
              <option value="LOW">🟢 Low Priority</option>
              <option value="MEDIUM">🟡 Medium Priority</option>
              <option value="HIGH">🔴 High Priority</option>
            </select>
            
            <div className="category-container">
              <select
                name="category"
                value={formData.category}
                onChange={e => setFormData({ ...formData, category: e.target.value })}
                className="form-select"
              >
                {customCategories.map(category => (
                  <option key={category} value={category}>
                    {getCategoryIcon(category)} {category}
                  </option>
                ))}
              </select>
              <button 
                type="button" 
                className="add-category-btn"
                onClick={() => setShowAddCategory(!showAddCategory)}
                title="Add custom category"
              >
                ➕
              </button>
            </div>
          </div>
          
          <div className="form-row">
            <input
              type="date"
              name="dueDate"
              value={formData.dueDate}
              onChange={e => setFormData({ ...formData, dueDate: e.target.value })}
              className="form-input"
              title="Due date"
            />
            <input
              type="time"
              name="dueTime"
              value={formData.dueTime}
              onChange={e => setFormData({ ...formData, dueTime: e.target.value })}
              className="form-input"
              title="Due time (optional)"
            />
          </div>
          
          {showAddCategory && (
            <div className="add-category-form">
              <input
                type="text"
                placeholder="New category name"
                value={newCategory}
                onChange={e => setNewCategory(e.target.value)}
                className="form-input"
              />
              <button type="button" onClick={handleAddCategory} className="submit-btn">
                Add Category
              </button>
              <button type="button" onClick={() => setShowAddCategory(false)} className="cancel-btn">
                Cancel
              </button>
            </div>
          )}
          
          <button type="submit" className="submit-btn" disabled={loading}>
            {loading ? '⏳' : editingTask ? '✏️ Update Task' : '➕ Add Task'}
          </button>
        </form>
      </div>

      <div className="search-filter-container">
        <div className="search-container">
          <input
            type="text"
            placeholder="🔍 Search tasks by title or description..."
            value={searchTerm}
            onChange={e => setSearchTerm(e.target.value)}
            className="search-input"
          />
        </div>
        
        <div className="filter-buttons">
          <button 
            className={filter === 'ALL' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('ALL')}
          >
            All Tasks ({tasks.length})
          </button>
          <button 
            className={filter === 'PENDING' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('PENDING')}
          >
            Pending ({tasks.filter(t => !t.completed).length})
          </button>
          <button 
            className={filter === 'COMPLETED' ? 'filter-btn active' : 'filter-btn'}
            onClick={() => setFilter('COMPLETED')}
          >
            Completed ({tasks.filter(t => t.completed).length})
          </button>
        </div>
      </div>

      <TaskList
        tasks={filteredTasks}
        onEdit={handleEdit}
        onDelete={handleDelete}
        onToggleComplete={handleToggleComplete}
        loading={loading}
      />
    </div>
  );
}

export default App;
