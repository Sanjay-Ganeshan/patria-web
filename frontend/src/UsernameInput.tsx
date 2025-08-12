import { useState } from "react";

interface Props {
  onSubmit: (username: string) => void;
}

const UsernameInput: React.FC<Props> = ({ onSubmit }) => {
  const [username, setUsername] = useState("");

  return (
    <div style={{ padding: "1rem" }}>
      <input
        placeholder="Enter username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
      />
      <button onClick={() => onSubmit(username)}>Start</button>
    </div>
  );
};

export default UsernameInput;
