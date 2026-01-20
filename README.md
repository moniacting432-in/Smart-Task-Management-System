Task Management Application

Description
This is a Task Management web application developed using **Next.js (App Router)and MongoDB.  
The application allows authenticated users to perform CRUD operations on tasks such as creating, viewing, updating, and deleting tasks.


Technologies Used
- Next.js (App Router)
- React.js
- Tailwind CSS
- Node.js
- MongoDB
- Mongoose
- Firebase Authentication


Features
- User authentication (Email/Password & Google Login)
- Create new tasks
- View all tasks
- View task details by ID
- Update existing tasks
- Delete tasks
- User-specific task access
- REST API implementation



Authentication is handled using Firebase Authentication.
Task APIs

| GET | /api/tasks | Fetch all tasks |
| POST | /api/tasks | Create a new task |
| GET | /api/tasks/:id | Fetch task by ID |
| PUT | /api/tasks/:id | Update task by ID |
| DELETE | /api/tasks/:id | Delete task by ID |



Folder Structure
app/
├── api/
│ └── tasks/
│ ├── route.js
│ └── [id]/route.js
├── tasks/
│ └── [id]/page.jsx
├── login/
│ └── page.jsx
├── lib/
│ └── mongodb.js
models/
└── Task.js



Database Schema (Task)
- title : String
- description : String
- status : String
- priority : String
- createdAt : Date
- updatedAt : Date



Installation Steps

1. Clone the repository
git clone <https://github.com/moniacting432-in/Smart-Task-Management-System.git>


2. Install dependencies


npm install


3. Create `.env.local` file


NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyDsnZCXya5gDeQ92bgdP5S6ShotKRg-i04
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=my-nextjs-app-3f521.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=my-nextjs-app-3f521
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=my-nextjs-app-3f521.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=67415148188
NEXT_PUBLIC_FIREBASE_APP_ID=1:674151481887:web:7d53663de2f6d5bb858b2
MONGO_URI=mongodb+srv://banerjeemanisha12:DGvUfVhOhuSyl0kh@cluster0.vlttdig.mongodb.net/?appName=Cluster0


4. Run the application


npm run dev


Output
- Login / Register page
- Task dashboard
- Task detail page
- CRUD operations on tasks



Conclusion
This project demonstrates the implementation of REST APIs, authentication, database connectivity, and fron
