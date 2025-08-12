from dataclasses import dataclass
import time

STALE_THRESHOLD: int = 120
class User:
    def __init__(self, username: str) -> None:
        self.username: str = username
        self.last_update_time = time.time()
    
    def is_stale(self) -> bool:
        return time.time() - self.last_update_time > STALE_THRESHOLD

class GameState:
    def __init__(self):
        self.client_id_to_username: dict[str, str] = {}
        self.username_to_client_id: dict[str, set[str]] = {}
        self.last_message_per_client_id: dict[str, float] = {}

    def heartbeat(self, client_id: str) -> None:
        self.last_message_per_client_id[client_id] = time.time()

    def get_username(self, client_id: str) -> str:
        self.heartbeat(client_id)
        return self.client_id_to_username[client_id]

    def cleanup(self) -> None:
        stale = time.time() - STALE_THRESHOLD
        for client_id in list(self.client_id_to_username.keys()):
            if self.last_message_per_client_id[client_id] < stale:
                del self.client_id_to_username[client_id]
                del self.last_message_per_client_id[client_id]
    
    def disconnect(self, client_id: str) -> str:
        username = self.client_id_to_username[client_id]
        del self.client_id_to_username[client_id]
        del self.last_message_per_client_id[client_id]
        self.username_to_client_id[username].remove(client_id)
        self.cleanup()
        return username

    def add_client(self, client_id: str, username: str) -> str:
        self.client_id_to_username[client_id] = username
        if username not in self.username_to_client_id:
            self.username_to_client_id[username] = set()
        self.username_to_client_id[username].add(client_id)
        self.heartbeat(client_id)
        return self.get_username(client_id)
