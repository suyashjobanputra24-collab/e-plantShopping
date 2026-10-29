import React from "react";
import "./App.css";

function App() {
  const handleGetStarted = () => {
    window.location.href = "/plants";
  };

  return (
    <div className="landing-page">
      <h1>Paradise Nursery</h1>

      <p>
        Bring nature home with our beautiful collection of indoor
        plants. Discover greenery that makes your space feel fresh,
        peaceful, and alive.
      </p>

      <button
        className="get-started-btn"
        onClick={handleGetStarted}
      >
        Get Started
      </button>
    </div>
  );
}

export default App;
