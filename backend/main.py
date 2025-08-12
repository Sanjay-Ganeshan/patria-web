from fastapi import FastAPI
import socketio
import time
from game.state import GameState


socket_api = socketio.AsyncServer(cors_allowed_origins="*", async_mode="asgi")
rest_api = FastAPI()

game = GameState()

@socket_api.event
async def connect(sid, environ, auth):
    username = auth["token"]
    print(f"Client connected: {game.add_client(sid, username)}")

@socket_api.event
async def disconnect(sid):
    username = game.disconnect(sid)
    print(f"Client disconnected: {username}")

@socket_api.event
async def heartbeat(sid):
    game.heartbeat(sid)

app = socketio.ASGIApp(socket_api, other_asgi_app=rest_api)