import { io, Socket} from "socket.io-client";

var connection: Socket | null = null;

function connect(
    hostname: string,
    username: string,
    port: number = 8000
): Socket {
    if (connection) return connection;
    connection = io(`http://${hostname}:${port}`, {auth: {token: username}});
    return connection;
}

function disconnect() {
    if (connection) {
        connection.disconnect();
        connection = null;
    }
}

function sendHeartbeat() {
    if (!connection) return;

    connection.emit("heartbeat");
    console.log("beat");
}

export {connect, disconnect, sendHeartbeat};
