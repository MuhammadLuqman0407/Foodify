# Foodify (MERN)
## Features

- Auth middleware (food partner + user)
- Food entity CRUD (create via file upload + text fields)
- Likes / saves
- ImageKit upload (storage.service)
- Multer memory storage in backend route

## Requirements

- Node.js 18+
- npm or pnpm
- MongoDB running (local or cloud URI)
- .env in Backend with:
  - `MONGO_URI`
  - `JWT_SECRET`
  - `IMAGEKIT_PUBLIC_KEY`
  - `IMAGEKIT_PRIVATE_KEY`
  - `IMAGEKIT_URL_ENDPOINT`
  - other needed env vars

## Backend setup

1. `cd Foodify/Backend`
2. `npm install`
3. copy `.env.example` -> `.env`
4. set env variables
5. run server:
   - `npm run dev` (`nodemon`) or `npm start`
6. confirm:
   - `Connected to MongoDB`
   - server start port

## Frontend setup

1. `cd Foodify/Frontend`
2. `npm install`
3. copy `.env.local` -> set API_URL (e.g. `http://localhost:3000/api`)
4. run:
   - `npm start` or `npm run dev`
5. open browser at `http://localhost:3000` (or frame in docs)

## Food upload workflow

1. Food partner logs in/registers (via auth route).
2. POST `/api/food` with `multipart/form-data`:
   - `name`, `description` in body
   - file fields:
     - `video` (single file)
     - `thumbnail` (optional)
3. Backend route in `food.routes.js`:
   - `upload.fields([{ name:'video', maxCount:1 }, { name:'thumbnail', maxCount:1 }])`
4. Controller `createFood`:
   - `req.files.video[0].buffer`
   - `req.files.thumbnail[0].buffer`
   - send to ImageKit service
   - save model with URLs
5. GET `/api/food` returns list

## Fix for common issue

- `TypeError: Cannot read properties of undefined (reading 'buffer')`:
  - use `req.files` for `.fields()`, not `req.file`.
  - `single('video')` -> `req.file`
  - `fields()` -> `req.files.video[0]`

- `MulterError: LIMIT_UNEXPECTED_FILE`:
  - ensure form field names exactly match (`video`, `thumbnail`)
  - or use `upload.any()` (less strict)

## API endpoints

- `POST /api/food` - create with upload
- `GET /api/food` - list
- `POST /api/food/like` - like/unlike
- `POST /api/food/save` - save/unsave
- `GET /api/food/saved` - saved items

## Development tips

- Keep backend and frontend running in separate terminals:
  - Backend `cd Foodify/Backend && npm run dev`
  - Frontend `cd Foodify/Frontend && npm start`
- Stop node processes before moving folders (`taskkill /IM node.exe /F`)
- Keep `.gitignore` for `node_modules`, `.env`, `dist`, etc.

## Deployment

- build frontend, serve through Nginx or static host.
- backend deploy to Heroku/Vercel/Render with environment variables.
- configure MongoDB Atlas for production.