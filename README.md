# patria-web

A minimal real-time client/server application for a custom 2D tabletop system called **Patria**.

## Project Structure

```
patria-web/
├── frontend/ # React + Vite + TypeScript + Socket.IO client
├── backend/ # FastAPI + python-socketio
```


## How It Works

- A user opens the frontend and enters a **username**.
- A **heartbeat message** is sent every 3 seconds to the backend via WebSocket.
- The server logs who sent each heartbeat.

## Backend Setup (Python + Conda)

1. Create the environment:

```bash
conda create -n patria-backend python=3.11
conda activate patria-backend
```

2. Install dependencies
```bash
pip install -r requirements.txt
```

3. Run the server
```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

## Frontend Setup (Node.js + Vite)

1. Install dependencies:

```bash
cd frontend
npm install
```

2. Run the dev server:
```bash
npm run dev
```

Access the frontend at http://localhost:5173

Communication Protocol
Event: "heartbeat"

Payload:

json
Copy
Edit
{
  "username": "alice"
}
No authentication is required — usernames are user-supplied.

# Roadmap
Token sync and map state sharing

Fog of war

Character sheets

Dice rolls and chat

# AI Handoff Notes
The frontend emits heartbeat every 3s with the current username.

Backend logs incoming messages.

No persistent storage yet.

All networking uses socket.io.

yaml
Copy
Edit
