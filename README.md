# 📝 Task Manager Application

A modern, full-stack task management application built with React frontend and Spring Boot backend, featuring MongoDB for data persistence.

## ✨ Features

### 🎯 Core Functionality
- **Add Tasks**: Create new tasks with title, description, priority, and category
- **Edit Tasks**: Update existing tasks with new information
- **Delete Tasks**: Remove tasks you no longer need
- **Mark Complete**: Toggle task completion status
- **Filter Tasks**: View all tasks, only pending, or only completed tasks

### 🎨 Enhanced Features
- **Priority Levels**: High (🔴), Medium (🟡), Low (🟢) priority indicators
- **Categories**: Personal (👤), Work (💼), Shopping (🛒), Health (🏥), Study (📚)
- **Real-time Updates**: Instant synchronization between frontend and backend
- **Responsive Design**: Works perfectly on desktop, tablet, and mobile devices
- **Modern UI**: Beautiful gradient design with smooth animations

### 🔧 Technical Features
- **RESTful API**: Clean API endpoints for all CRUD operations
- **MongoDB Integration**: Persistent data storage with MongoDB
- **CORS Support**: Proper cross-origin resource sharing configuration
- **Error Handling**: Comprehensive error handling and user feedback
- **Loading States**: Visual feedback during API operations

## 🏗️ Architecture

```
Task Manager/
├── Frontend/          # React.js application
│   ├── src/
│   │   ├── App.js     # Main application component
│   │   ├── App.css    # Modern styling
│   │   └── components/
│   │       └── TaskList.js  # Task display component
│   └── package.json   # Frontend dependencies
└── Backend/           # Spring Boot application
    └── demo/
        ├── src/main/java/com/example/taskmanager/
        │   ├── controller/  # REST API controllers
        │   ├── model/      # Data models
        │   └── repository/ # Data access layer
        └── pom.xml         # Maven dependencies
```

## 🚀 Quick Start

### Prerequisites

Before running the application, ensure you have:

- **Java 17+** installed
- **Node.js 16+** and npm installed
- **MongoDB** running on your system
- **Maven** (for backend) or use the included Maven wrapper

### 1. Database Setup

Start MongoDB on your system:
```bash
# On Windows (if MongoDB is installed as a service)
net start MongoDB

# On macOS/Linux
sudo systemctl start mongod
# or
mongod
```

### 2. Backend Setup

Navigate to the backend directory and start the Spring Boot application:

```bash
cd Backend/demo

# Using Maven wrapper (recommended)
./mvnw spring-boot:run

# Or using Maven (if installed globally)
mvn spring-boot:run
```

The backend will start on `http://localhost:8080`

### 3. Frontend Setup

In a new terminal, navigate to the frontend directory and start the React application:

```bash
cd Frontend

# Install dependencies
npm install

# Start the development server
npm start
```

The frontend will start on `http://localhost:3000`

## 📡 API Endpoints

The backend provides the following REST API endpoints:

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/tasks` | Get all tasks |
| GET | `/api/tasks/{id}` | Get task by ID |
| POST | `/api/tasks` | Create new task |
| PUT | `/api/tasks/{id}` | Update existing task |
| DELETE | `/api/tasks/{id}` | Delete task |
| GET | `/api/tasks/completed/{completed}` | Get tasks by completion status |

### Example API Usage

**Create a new task:**
```bash
curl -X POST http://localhost:8080/api/tasks \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Complete project",
    "description": "Finish the task manager application",
    "priority": "HIGH",
    "category": "WORK"
  }'
```

**Get all tasks:**
```bash
curl http://localhost:8080/api/tasks
```

## 🎨 User Interface

### Task Form
- **Title**: Required field for task name
- **Description**: Optional detailed description
- **Priority**: Choose from Low, Medium, or High priority
- **Category**: Select from Personal, Work, Shopping, Health, or Study

### Task Display
- **Visual Priority Indicators**: Color-coded priority levels
- **Category Icons**: Easy-to-recognize category symbols
- **Completion Status**: Clear visual indicators for completed/pending tasks
- **Action Buttons**: Edit, Complete/Undo, and Delete actions

### Filtering
- **All Tasks**: View all tasks regardless of status
- **Pending**: Show only incomplete tasks
- **Completed**: Show only finished tasks

## 🛠️ Development

### Backend Development

The backend uses Spring Boot with the following key components:
- **Spring Web**: REST API framework
- **Spring Data MongoDB**: Database integration
- **Lombok**: Reduces boilerplate code
- **Spring Boot DevTools**: Development utilities

### Frontend Development

The frontend is built with:
- **React 18**: Modern React with hooks
- **CSS3**: Modern styling with gradients and animations
- **Fetch API**: HTTP client for API communication

### Database Schema

Tasks are stored in MongoDB with the following structure:
```json
{
  "_id": "unique_id",
  "title": "Task title",
  "description": "Task description",
  "completed": false,
  "priority": "HIGH|MEDIUM|LOW",
  "category": "PERSONAL|WORK|SHOPPING|HEALTH|STUDY",
  "createdAt": "2024-01-01T00:00:00",
  "updatedAt": "2024-01-01T00:00:00"
}
```

## 🔧 Configuration

### Backend Configuration (`application.properties`)
```properties
# MongoDB database name
spring.data.mongodb.database=taskdb

# MongoDB connection URL
spring.data.mongodb.uri=mongodb://localhost:27017/taskdb

# Spring Boot server port
server.port=8080
```

### Frontend Configuration
The frontend connects to the backend via the API base URL:
```javascript
const API_BASE_URL = 'http://localhost:8080/api/tasks';
```

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running on your system
   - Check the connection string in `application.properties`

2. **CORS Issues**
   - The backend is configured to allow requests from `http://localhost:3000`
   - If using a different port, update the CORS configuration in `TaskController.java`

3. **Port Conflicts**
   - Backend runs on port 8080 by default
   - Frontend runs on port 3000 by default
   - Change ports in configuration files if needed

4. **Dependencies Issues**
   - Run `npm install` in the Frontend directory
   - Use `./mvnw clean install` in the Backend directory

## 📝 Usage Examples

### Adding a Task
1. Fill in the task title (required)
2. Add a description (optional)
3. Select priority level (Low/Medium/High)
4. Choose a category
5. Click "Add Task"

### Managing Tasks
- **Complete**: Click the "Complete" button to mark as done
- **Edit**: Click "Edit" to modify task details
- **Delete**: Click "Delete" to remove the task permanently
- **Filter**: Use the filter buttons to view specific task types

## 🚀 Deployment

### Backend Deployment
1. Build the JAR file: `./mvnw clean package`
2. Run the JAR: `java -jar target/demo-0.0.1-SNAPSHOT.jar`
3. Ensure MongoDB is accessible from your deployment environment

### Frontend Deployment
1. Build for production: `npm run build`
2. Deploy the `build` folder to your web server
3. Update the API base URL for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is open source and available under the MIT License.

---

**Happy Task Managing! 🎉**