import React from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  removeItem,
  updateQuantity
} from "./CartSlice";

function CartItem() {
  const dispatch = useDispatch();

  const cartItems = useSelector(
    (state) => state.cart.items
  );

  const totalItems = cartItems.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const handleIncrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity + 1
      })
    );
  };

  const handleDecrease = (item) => {
    dispatch(
      updateQuantity({
        id: item.id,
        quantity: item.quantity - 1
      })
    );
  };

  const handleRemove = (id) => {
    dispatch(removeItem(id));
  };

  const handleCheckout = () => {
    window.alert("Coming Soon!");
  };

  return (
    <div style={styles.page}>
      <nav style={styles.navbar}>
        <Link to="/" style={styles.brand}>
          Paradise Nursery
        </Link>

        <div style={styles.navLinks}>
          <Link to="/" style={styles.navLink}>Home</Link>
          <Link to="/plants" style={styles.navLink}>Plants</Link>
          <Link to="/cart" style={styles.navLink}>
            Cart ({totalItems})
          </Link>
        </div>
      </nav>

      <main style={styles.container}>
        <h1 style={styles.heading}>Shopping Cart</h1>
        <p style={styles.subtitle}>
          Review your plants and manage your order.
        </p>

        {cartItems.length === 0 ? (
          <div style={styles.emptyCart}>
            <div style={styles.emptyIcon}>🪴</div>
            <h2>Your cart is empty</h2>
            <p>
              Your favourite plants are waiting for you!
            </p>
            <Link to="/plants" style={styles.continueButton}>
              Continue Shopping
            </Link>
          </div>
        ) : (
          <>
            <div style={styles.cartList}>
              {cartItems.map((item) => (
                <article key={item.id} style={styles.cartCard}>
                  <img
                    src={item.image}
                    alt={item.name}
                    style={styles.image}
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />

                  <div style={styles.details}>
                    <h2 style={styles.plantName}>
                      {item.name}
                    </h2>

                    <p style={styles.unitPrice}>
                      Price: ₹{Number(item.price).toFixed(2)} each
                    </p>

                    <div style={styles.quantityRow}>
                      <span style={styles.quantityLabel}>
                        Quantity:
                      </span>

                      <button
                        type="button"
                        aria-label={`Decrease ${item.name} quantity`}
                        onClick={() => handleDecrease(item)}
                        style={styles.quantityButton}
                      >
                        −
                      </button>

                      <span style={styles.quantity}>
                        {item.quantity}
                      </span>

                      <button
                        type="button"
                        aria-label={`Increase ${item.name} quantity`}
                        onClick={() => handleIncrease(item)}
                        style={styles.quantityButton}
                      >
                        +
                      </button>
                    </div>

                    <button
                      type="button"
                      onClick={() => handleRemove(item.id)}
                      style={styles.removeButton}
                    >
                      Remove Item
                    </button>
                  </div>

                  <div style={styles.subtotalBox}>
                    <span style={styles.subtotalLabel}>
                      Subtotal
                    </span>
                    <strong style={styles.subtotal}>
                      ₹{(item.price * item.quantity).toFixed(2)}
                    </strong>
                  </div>
                </article>
              ))}
            </div>

            <section style={styles.summary}>
              <h2 style={styles.summaryHeading}>
                Order Summary
              </h2>

              <div style={styles.summaryRow}>
                <span>Total Plants</span>
                <span>{totalItems}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Subtotal</span>
                <span>₹{totalPrice.toFixed(2)}</span>
              </div>

              <div style={styles.summaryRow}>
                <span>Delivery</span>
                <span>Free</span>
              </div>

              <div style={styles.totalRow}>
                <strong>Total</strong>
                <strong>₹{totalPrice.toFixed(2)}</strong>
              </div>

              <button
                type="button"
                onClick={handleCheckout}
                style={styles.checkoutButton}
              >
                Checkout
              </button>

              <Link to="/plants" style={styles.continueLink}>
                ← Continue Shopping
              </Link>
            </section>
          </>
        )}
      </main>
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
    backgroundColor: "#1f512b"
  },
  brand: {
    color: "#fff",
    fontSize: "22px",
    fontWeight: "bold",
    textDecoration: "none"
  },
  navLinks: {
    display: "flex",
    gap: "22px",
    flexWrap: "wrap"
  },
  navLink: {
    color: "#fff",
    textDecoration: "none",
    fontWeight: "bold"
  },
  container: {
    maxWidth: "1050px",
    margin: "0 auto",
    padding: "32px 20px"
  },
  heading: {
    fontSize: "32px",
    marginBottom: "8px"
  },
  subtitle: {
    color: "#647467",
    marginBottom: "28px"
  },
  cartList: {
    display: "flex",
    flexDirection: "column",
    gap: "18px"
  },
  cartCard: {
    display: "flex",
    alignItems: "center",
    flexWrap: "wrap",
    gap: "20px",
    backgroundColor: "#fff",
    padding: "18px",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.06)"
  },
  image: {
    width: "140px",
    height: "140px",
    objectFit: "cover",
    borderRadius: "8px",
    backgroundColor: "#e3ebdf"
  },
  details: {
    flex: "1",
    minWidth: "180px"
  },
  plantName: {
    fontSize: "20px",
    marginBottom: "8px"
  },
  unitPrice: {
    color: "#5d6c5e",
    marginBottom: "14px"
  },
  quantityRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px"
  },
  quantityLabel: {
    fontSize: "14px"
  },
  quantityButton: {
    width: "32px",
    height: "32px",
    border: "1px solid #b8cbb8",
    borderRadius: "6px",
    backgroundColor: "#f5f8f1",
    color: "#1f512b",
    fontSize: "20px",
    cursor: "pointer"
  },
  quantity: {
    minWidth: "20px",
    textAlign: "center",
    fontWeight: "bold"
  },
  removeButton: {
    border: "none",
    background: "none",
    color: "#b42318",
    cursor: "pointer",
    textDecoration: "underline",
    padding: "4px 0"
  },
  subtotalBox: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    marginLeft: "auto",
    textAlign: "right"
  },
  subtotalLabel: {
    color: "#647467",
    fontSize: "14px"
  },
  subtotal: {
    fontSize: "20px",
    color: "#2e7d32"
  },
  summary: {
    maxWidth: "420px",
    margin: "28px 0 0 auto",
    padding: "24px",
    backgroundColor: "#fff",
    borderRadius: "12px",
    boxShadow: "0 3px 12px rgba(0,0,0,0.06)"
  },
  summaryHeading: {
    fontSize: "22px",
    marginBottom: "20px"
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    marginBottom: "14px",
    color: "#526254"
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    gap: "16px",
    borderTop: "1px solid #dce5d9",
    paddingTop: "16px",
    marginTop: "8px",
    marginBottom: "20px",
    fontSize: "20px"
  },
  checkoutButton: {
    width: "100%",
    padding: "13px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    border: "none",
    borderRadius: "7px",
    fontSize: "16px",
    fontWeight: "bold",
    cursor: "pointer",
    marginBottom: "16px"
  },
  continueLink: {
    display: "block",
    textAlign: "center",
    color: "#1f512b",
    textDecoration: "none",
    fontWeight: "bold"
  },
  emptyCart: {
    textAlign: "center",
    backgroundColor: "#fff",
    padding: "48px 20px",
    borderRadius: "12px"
  },
  emptyIcon: {
    fontSize: "48px",
    marginBottom: "12px"
  },
  continueButton: {
    display: "inline-block",
    marginTop: "20px",
    padding: "12px 22px",
    backgroundColor: "#2e7d32",
    color: "#fff",
    textDecoration: "none",
    borderRadius: "7px",
    fontWeight: "bold"
  }
};

export default CartItem;
