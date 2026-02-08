import React from "react";

const Footer = () => {
  const styles = {
    footer: {
      background: "#343a40",
      color: "white",
      padding: "20px",
      textAlign: "center",
      marginTop: "auto",
    },
    text: { margin: 0, fontSize: "0.9rem" },
  };

  return (
    <footer style={styles.footer}>
      <p style={styles.text}>
        &copy; 2026 Marketplace Project. All Rights Reserved.
      </p>
    </footer>
  );
};

export default Footer;
