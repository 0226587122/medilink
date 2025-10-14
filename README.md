# MediLink NZ — Django REST + React (Vite + TS)

Mobile-first health companion with blue/gray motif. Features:
- Auth (JWT), Appointments, Medications, Clinics (with map), Analytics.
- Mobile-friendly UI (blue/gray theme), forms with validation.

## Run

### Backend
```
cd api
python3 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
python manage.py migrate
python manage.py createsuperuser
python manage.py seed
python manage.py runserver 8000
```
Swagger: http://localhost:8000/api/docs/

### Frontend
```
cd ../web
npm install
npm run dev
```
App: http://localhost:5173

## Notes
- Dev DB: SQLite (no Postgres driver needed).
- To generate fake analytics data:
```
cd api && source .venv/bin/activate
python manage.py fake_health
```