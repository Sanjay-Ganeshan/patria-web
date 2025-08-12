import { useEffect } from "react";
import { sendHeartbeat } from "./backend_connector";

interface ConnectedAppProps {
  username: string;
  onDisconnect: () => void;
}

const ConnectedApp: React.FC<ConnectedAppProps> = (props: ConnectedAppProps) => {

  useEffect(() => {
    const intervalId = setInterval(() => {
      sendHeartbeat();
    }, 10000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div>
      <button onClick={props.onDisconnect}>Disconnect</button>
      <div>Connected as {props.username}</div>
    </div>
  )
};

export {ConnectedApp};
export type {ConnectedAppProps};
