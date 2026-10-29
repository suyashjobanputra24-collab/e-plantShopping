import React, { useState } from "react";
import "./App.css";
import ProductList from "./ProductList";

function App() {
  const [showProductList, setShowProductList] = useState(false);

  const handleGetStarted = () => {
    setShowProductList(true);
  };

  if (showProductList) {
    return <ProductList />;
  }

  return (
    <div className="background-image">
      <div className="landing-content">
        <h1>Welcome to Paradise Nursery</h1>
        <p>
          Bring nature home with our beautiful collection of indoor plants.
          Discover greenery that makes your space feel fresh, peaceful, and alive.
        </p>

        <button
          type="button"
          className="get-started-btn"
          onClick={handleGetStarted}
        >
          Get Started
        </button>
      </div>
    </div>
  );
}

export default App;
