import "./Header.css";
import { useState } from "react";

function Header() {
  // Counter state
  const [count, setCount] = useState(0);

  // Username state
  const [username, setUsername] = useState("Guest");

  // Input state
  const [inputValue, setInputValue] = useState("");

  return (
    <header className="header">
      <h1>React Header Component</h1>

      <h2>Count: {count}</h2>

      <button onClick={() => setCount(count + 1)}>
        Increment Counter
      </button>

      <h3>Welcome, {username}</h3>

      <input
        type="text"
        placeholder="Enter username"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
      />

      <button onClick={() => setUsername(inputValue)}>
        Update Username
      </button>
    </header>
  );
}

export default Header;