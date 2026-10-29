import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "./CartSlice";

const plantCategories = [
  {
    category: "Air Purifying Plants",
    plants: [
      { id: 1, name: "Snake Plant", price: 299, image: "https://images.unsplash.com/photo-1593482892290-f54927ae2b6c?auto=format&fit=crop&w=600&q=80" },
      { id: 2, name: "Peace Lily", price: 349, image: "https://images.unsplash.com/photo-1593691509543-c55fb32e5cee?auto=format&fit=crop&w=600&q=80" },
      { id: 3, name: "Spider Plant", price: 249, image: "https://images.unsplash.com/photo-1572688484438-313a6e50c333?auto=format&fit=crop&w=600&q=80" },
      { id: 4, name: "Areca Palm", price: 499, image: "https://images.unsplash.com/photo-1597055181300-a8b3be6f3f6a?auto=format&fit=crop&w=600&q=80" },
      { id: 5, name: "Boston Fern", price: 279, image: "https://images.unsplash.com/photo-1597055181449-1a5f4b8f2b6b?auto=format&fit=crop&w=600&q=80" },
      { id: 6, name: "Rubber Plant", price: 399, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    category: "Aromatic Plants",
    plants: [
      { id: 7, name: "Lavender", price: 299, image: "https://images.unsplash.com/photo-1499002238440-d264edd596ec?auto=format&fit=crop&w=600&q=80" },
      { id: 8, name: "Mint Plant", price: 149, image: "https://images.unsplash.com/photo-1628556270448-4d4e4148e1b1?auto=format&fit=crop&w=600&q=80" },
      { id: 9, name: "Rosemary", price: 199, image: "https://images.unsplash.com/photo-1618164436241-4473940d1f5c?auto=format&fit=crop&w=600&q=80" },
      { id: 10, name: "Basil", price: 159, image: "https://images.unsplash.com/photo-1618375569909-3c8616cf7733?auto=format&fit=crop&w=600&q=80" },
      { id: 11, name: "Lemon Balm", price: 179, image: "https://images.unsplash.com/photo-1615485500704-8e990f9900f5?auto=format&fit=crop&w=600&q=80" },
      { id: 12, name: "Eucalyptus", price: 329, image: "https://images.unsplash.com/photo-1604762524889-3e2fcc145683?auto=format&fit=crop&w=600&q=80" }
    ]
  },
  {
    category: "Low Maintenance Plants",
    plants: [
      { id: 13, name: "Aloe Vera", price: 199, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80" },
      { id: 14, name: "Jade Plant", price: 249, image: "https://images.unsplash.com/photo-1501004318641-b39e6451bec6?auto=format&fit=crop&w=600&q=80" },
      { id: 15, name: "ZZ Plant", price: 399, image: "https://images.unsplash.com/photo-1509423350716-97f9360b4e09?auto=format&fit=crop&w=600&q=80" },
      { id: 16, name: "Pothos", price: 229, image: "https://images.unsplash.com/photo-1616690244923-3b6b4f2f8b3c?auto=format&fit=crop&w=600&q=80" },
      { id: 17, name: "Lucky Bamboo", price: 189, image: "https://images.unsplash.com/photo-1530968464165-7a1861cbaf9f?auto=format&fit=crop&w=600&q=80" },
      { id: 18, name: "Monstera", price: 449, image: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b?auto=format&fit=crop&w=600&q=80" }
    ]
  }
];

function Navbar({ cartCount }) {
  return (
    <nav className="navbar" style={styles.navbar}>
      <Link to="/" style={styles.brand}>Paradise Nursery</Link>
      <div style={styles.navLinks}>
        <Link to="/" style={styles.navLink}>Home</Link>
        <Link to="/plants" style={styles.navLink}>Plants</Link>
        <Link to="/cart" className="cart-link" style={styles.navLink}>
          <span aria-hidden="true">🛒</span> Cart
          <span id="cart_quantity_count" className="cart_quantity_count">
            {cartCount}
          </span>
        </Link>
      </div>
    </nav>
  );
}

function ProductList() {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items || []);

  const cartCount = cartItems.reduce(
    (total, item) => total + (Number(item.quantity) || 0),
    0
  );

  const addedToCart = cartItems.reduce((map, item) => {
    map[item.name] = true;
    return map;
  }, {});

  const handleAddToCart = (plant) => {
    dispatch(addItem(plant));
  };

  return (
    <div style={styles.page}>
      <Navbar cartCount={cartCount} />

      <header style={styles.header}>
        <h1 style={styles.heading}>Our Houseplants</h1>
        <p style={styles.subtitle}>
          Bring home a little greenery. Find the perfect plant for your space.
        </p>
      </header>

      {plantCategories.map((group) => (
        <section key={group.category} style={styles.section}>
          <h2 style={styles.categoryHeading}>{group.category}</h2>
          <div style={styles.grid}>
            {group.plants.map((plant) => (
              <article key={plant.id} style={styles.card}>
                <img
                  src={plant.image}
                  alt={plant.name}
                  style={styles.image}
                  onError={(event) => {
                    event.currentTarget.style.visibility = "hidden";
                  }}
                />
                <div style={styles.cardBody}>
                  <h3 style={styles.plantName}>{plant.name}</h3>
                  <p style={styles.price}>₹{plant.price}</p>
                  <button
                    type="button"
                    onClick={() => handleAddToCart(plant)}
                    disabled={Boolean(addedToCart[plant.name])}
                    style={{
                      ...styles.button,
                      ...(addedToCart[plant.name]
                        ? styles.disabledButton
                        : {})
                    }}
                  >
                    {addedToCart[plant.name] ? "Added to Cart" : "Add to Cart"}
                  </button>
                </div>
              </article>
            ))}
          </div>
        </section>
      ))}
    </div>
  );
}

const styles = {
  page: {
    minHeight: "100vh",
    backgroundColor: "#f5f8f1",
    color: "#243b2a",
    fontFamily: "Arial, sans-serif",
    paddingBottom: "40px"
  },
  navbar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "16px",
    padding: "18px 6%",
    backgroundColor: "#1f512b",
    color: "#fff"
  },
  brand: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "none"
  },
  navLinks: {
    display: "flex",
    alignItems: "center",
    gap: "22px",
    flexWrap: "wrap"
  },
  navLink: {
    display: "inline-flex",
    alignItems: "center",
    gap: "7px",
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  },
  header: {
    textAlign: "center",
    padding: "36px 16px 24px"
  },
  heading: {
    fontSize: "34px",
    marginBottom: "10px"
  },
  subtitle: {
    color: "#586b5b",
    fontSize: "16px"
  },
  section: {
    padding: "16px 6% 28px"
  },
  categoryHeading: {
    fontSize: "24px",
    marginBottom: "18px",
    borderBottom: "2px solid #cbdcc7",
    paddingBottom: "10px"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(210px, 1fr))",
    gap: "22px"
  },
  card: {
    backgroundColor: "#fff",
    borderRadius: "12px",
    overflow: "hidden",
    boxShadow: "0 4px 14px rgba(0,0,0,0.08)"
  },
  image: {
    width: "100%",
    height: "190px",
    objectFit: "cover",
    backgroundColor: "#e3ebdf"
  },
  cardBody: {
    padding: "16px"
  },
  plantName: {
    fontSize: "18px",
    marginBottom: "8px"
  },
  price: {
    fontSize: "17px",
    fontWeight: "bold",
    marginBottom: "14px",
    color: "#2e7d32"
  },
  button: {
    width: "100%",
    padding: "11px",
    border: "none",
    borderRadius: "6px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer"
  },
  disabledButton: {
    backgroundColor: "#9eaaa0",
    cursor: "not-allowed"
  }
};

export default ProductList;
