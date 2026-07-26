import { useState } from "react";

function Contact() {
  // First useState (for input)
  const [message, setMessage] = useState("");

  // Second useState (for show/hide help)
  const [showHelp, setShowHelp] = useState(false);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Contact</h1>

      <input
        type="text"
        placeholder="Enter your message"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />

      <p>Your Message: {message}</p>

      <p>Characters: {message.length}</p>

      <button onClick={() => setShowHelp(!showHelp)}>
        {showHelp ? "Hide Help" : "Show Help"}
      </button>

      {showHelp && (
        <p>Please type your message in the input box above.</p>
      )}
    </div>
  );
}

export default Contact;