# MediLink NZ — Django REST + React (Vite + TS)

A minimal but working full‑stack starter focused on appointments, medications, and clinics.
- Backend: Django 5 + DRF + JWT + drf-spectacular (Swagger) + CORS
- Frontend: React 18 + Vite + TypeScript + React Query + React Router + RHF + Zod

## Quick Start

### 1) Backend
```
cd api
python -m venv .venv
# Windows: .venv\Scripts\activate
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py seed    # add sample clinics
python manage.py runserver 8000
```
- Swagger: http://localhost:8000/api/docs/
- Auth Token: POST http://localhost:8000/api/auth/token/ (username/password)

### 2) Frontend
```
cd ../web
npm install
npm run dev
```
Vite dev server at http://localhost:5173

### 3) Login
- Use the Django superuser you created.
- After login, you’ll be redirected to Dashboard.
- You can create Medications/Appointments via simple forms.

## Environment
Frontend uses `VITE_API_URL` from `.env` (defaults to http://localhost:8000).

## Notes
- Dev DB uses SQLite; production should use Postgres.
- JWT lives in localStorage for simplicity (swap to httpOnly cookies for real prod).
- This is a teaching starter; review NZ Privacy Act 2020 before handling real data.