# 🧪 Testing Your Task Manager Application

## Quick Test Steps

### 1. **Start the Frontend (React)**
```bash
cd Frontend
npm install
npm start
```
- Open your browser to `http://localhost:3000`
- You should see the Task Manager interface

### 2. **Test Adding a Task (Without Backend)**
1. Fill in the task form:
   - **Title**: "Test Task"
   - **Description**: "This is a test task"
   - **Priority**: Select "High Priority"
   - **Category**: Select "Work"
2. Click "Add Task" button
3. **Expected Result**: The task should appear in the task list immediately
4. **Check Console**: Open browser DevTools (F12) and check the Console tab for debug messages

### 3. **Test All Functions**
- ✅ **Add Task**: Create multiple tasks with different priorities and categories
- ✅ **Edit Task**: Click "Edit" on any task, modify it, and click "Update Task"
- ✅ **Complete Task**: Click "Complete" button to mark tasks as done
- ✅ **Delete Task**: Click "Delete" button to remove tasks
- ✅ **Filter Tasks**: Use the filter buttons (All, Pending, Completed)

### 4. **Backend Connection Status**
Look for the status indicator in the header:
- 🔄 **Checking backend...** - Initial connection attempt
- ✅ **Backend connected** - Backend is running and connected
- ⚠️ **Backend offline - using local storage** - Backend not available, but app still works

### 5. **Start the Backend (Optional)**
If you want to test with the backend:
```bash
cd Backend/demo
./mvnw spring-boot:run
```
- Backend will start on `http://localhost:8080`
- Refresh the frontend to see "Backend connected" status
- Tasks will now be saved to MongoDB

## 🔍 Debugging Tips

### Check Browser Console
1. Open DevTools (F12)
2. Go to Console tab
3. Look for these messages:
   - "Form data changed: {title: '', description: '', ...}"
   - "Form submitted with data: {title: 'Test Task', ...}"
   - "Tasks loaded from backend: [...]" (if backend is running)
   - Any error messages in red

### Common Issues & Solutions

**Issue**: "Add Task" button doesn't work
**Solution**: 
- Check if the form fields are filled
- Look at console for error messages
- Try refreshing the page

**Issue**: Tasks don't appear
**Solution**:
- Check if the task was actually added (look at console logs)
- Try filtering (All/Pending/Completed)
- Check if there are any JavaScript errors

**Issue**: Backend connection fails
**Solution**:
- Make sure MongoDB is running
- Check if port 8080 is available
- The app will still work in "offline mode"

## 🎯 Expected Behavior

### ✅ Working Correctly
- Form submission creates new tasks
- Tasks appear in the list immediately
- Edit, delete, and complete functions work
- Filter buttons show correct task counts
- Status indicator shows connection state
- Console shows debug information

### 🚨 If Something's Wrong
1. Check browser console for errors
2. Verify all form fields are filled
3. Try refreshing the page
4. Check if JavaScript is enabled
5. Make sure you're using a modern browser

## 📱 Testing on Different Devices
- **Desktop**: Full functionality
- **Tablet**: Responsive design should work
- **Mobile**: Touch-friendly interface

---

**The application should work completely even without the backend running!** 🎉


