import { useState } from "react";
import UsernameInput from "./UsernameInput";
import { connect, disconnect } from "./backend_connector";
import { ConnectedApp } from "./ConnectedApp";

function App() {
  const [username, setUsername] = useState<string | null>(null);

  const setUsernameAndConnect = (username: string) => {
    setUsername(username);
    connect("localhost", username);
  };

  const disconnectAndReset = () => {
    disconnect();
    setUsername(null);
  };

  if (!username) {
    return <UsernameInput onSubmit={setUsernameAndConnect} />;
  }

  else {
    return <ConnectedApp username={username} onDisconnect={disconnectAndReset} />
  }
}

export default App;
