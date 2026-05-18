
import { useState, useRef, useEffect } from "react";

function App() {
  const [count, setCount] = useState(0);

  // 1: create a ref to silently track button clicks (starts at 0)
  const clickRef = useRef(0);

  // input ref
  const inputRef = useRef(null);

  // 2: focus the input when the component loads up first
  useEffect(() => {
    inputRef.current.focus();
  }, []);

  function handleClick() {
    // 4: increment the click ref (no state setter)
    clickRef.current = clickRef.current + 1;

    // optional: keep state counter
    setCount((c) => c + 1);
  }

  return (
    <div>
      {/* 5: attach your input ref here */}
      <input ref={inputRef} placeholder="I should focus on mount" />

      {/* 6: clicking this focuses the input */}
      <button onClick={handleClick}>Click me</button>

      <p>State renders: {count}</p>

      {/* 7: show the click ref value here */}
      <p>Ref clicks: {clickRef.current}</p>
    </div>
  );
}

export default App;