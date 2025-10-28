# Task Manager Frontend

A modern React application for managing tasks with a beautiful UI.

## Features

- ✅ Create, read, update, and delete tasks
- 🎨 Modern, responsive design
- 🔍 Filter tasks by completion status
- 📊 Priority levels (High, Medium, Low)
- 🏷️ Task categories (Personal, Work, Shopping, etc.)
- ⏰ Timestamps for task creation and updates
- 📱 Mobile-friendly interface

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm or yarn

### Installation

1. Navigate to the frontend directory:
   ```bash
   cd Task-manager/Frontend
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

4. Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

### Backend Setup

Make sure the Spring Boot backend is running on port 8080 before starting the frontend.

## Available Scripts

- `npm start` - Runs the app in development mode
- `npm build` - Builds the app for production
- `npm test` - Launches the test runner
- `npm eject` - Ejects from Create React App (one-way operation)

## API Integration

The frontend communicates with the Spring Boot backend API at `http://localhost:8080/api/tasks`.

## Technologies Used

- React 18
- Axios for HTTP requests
- CSS3 with modern features
- Responsive design principles
