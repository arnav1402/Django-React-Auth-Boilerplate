🚀 Project Structure

root/
├── backend/ # Django backend
└── frontend/ # React frontend

🔧 Backend Setup (Django)

1. Navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Create a virtual environment:
   ```bash
   python -m venv .venv
   ```
3. Activate the virtual environment:
   - On Mac/Linux:
     ```bash
     source .venv/bin/activate
     ```
   - On Windows:
     ```bash
     .venv\Scripts\activate
     ```
4. Install dependencies:
   ```bash
   pip install -r requirements.txt
   ```
5. Set up `.env` file:
   Create a `.env` file in the `backend/` directory and include at least:
   ```env
   SECRET_KEY=your-secret-key
   DEBUG=True
   ALLOWED_HOSTS=localhost,127.0.0.1
   ```
6. Run migrations:
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```
7. Create a superuser:
   ```bash
   python manage.py createsuperuser
   ```
8. Start the Django development server:
   ```bash
   python manage.py runserver
   ```
   🌐 Frontend Setup (React)
9. Navigate to the frontend directory:
   ```bash
   cd frontend
   ```
10. Install dependencies:
    ```bash
    npm install
    ```
11. Set up `.env` file:
    Create a `.env` file in the `frontend/` directory and include:
    ```env
    VITE_API_URL=http://127.0.0.1:8000
    ```
12. Start the React development server:
    ```bash
    npm run dev
    ```
    ✅ Features
    • - JWT authentication
    • - Environment-based config
    • - API + Frontend separation
    • - Ready-to-use user management
