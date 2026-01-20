Smart Task Management System  
(MERN Stack Project) 


Frontend (Vercel): [https://smart-task-management-system-e4bb.vercel.app] 
Backend (Deployed URL):[https://smart-task-management-system-e4bb.vercel.app]
As it is a next js project so I have included backedn frontend together!



Introduction
The Smart Task Management System is a full-stack web application developed using the MERN Stack (MongoDB, Express.js, React/Next.js, Node.js).  
It provides users with a secure, efficient, and user-friendly platform to manage their daily tasks digitally.  


Objectives
- Design and develop a multi-user task management system  
- Implement secure registration and login (with JWT authentication)  
- Store user and task data efficiently using MongoDB  
- Provide task creation, updating, deletion, and completion features  
- Include search, filter, and sorting functionalities  
- Display task-related analytics via a dashboard  
- Ensure data privacy and security  



User Authentication
Registration
- Users register with name, email, and password 
- Passwords are encrypted using bcrypt before storing in MongoDB  
- Each user receives a unique user ID

Login
- Users login using their email and password  
- A JWT token is generated upon successful authentication  
- Token allows access to protected routes and features  

Security
- Encrypted passwords  
- JWT authentication for all protected routes  
- Users can only access their own data  



Task Management Features

| Create Task | Add title, description, due date, and priority |
| Edit Task | Update task details anytime |
| Delete Task | Permanently remove unwanted tasks |
| View Tasks | See all tasks in list format |
| Mark Complete | Mark tasks as done |
| Search / Filter / Sort | Quickly find and organize tasks |




Backend (Node.js + Express)
Folder Structure
backend/
│
├── models/
├── controllers/
├── routes/
├── middleware/
└── config/

API Endpoints
Authentication APIs

| POST | `/auth/register` | Register a new user |
| POST | `/auth/login` | Login user |
| GET | `/auth/profile` | Get user details |

Task APIs (Protected)

| POST | `/tasks` | Create a task |
| GET | `/tasks` | Fetch all user tasks |
| GET | `/tasks/:id` | Fetch single task |
| PUT | `/tasks/:id` | Update task |
| DELETE | `/tasks/:id` | Delete task |



Frontend (Next.js + React)
- Responsive and mobile-friendly UI  
- Integrated with backend APIs  
- Includes Google authentication via Firebase  



How to Run Locally

Backend

cd backend
npm install
npm start
Create a .env file containing:

MONGO_URI=your_mongodb_connection_url
JWT_SECRET=your_secret_key
Frontend
cd frontend
npm install
npm run dev


Access the app at: http://localhost:3000
Deployment

Frontend+Backend: Vercel


Database: MongoDB Atlas

Authentication: Firebase (Google Sign-In)

Component	URL
Frontend (Vercel)	https://smart-task-management-system-e4bb.vercel.app

Backend (Vercel)	https://smart-task-management-system-e4bb.vercel.app

GitHub Repository	https://github.com/moniacting432-in/Smart-Task-Management-System
Postman Collection	Smart_task_Management_System.postman_collection.json