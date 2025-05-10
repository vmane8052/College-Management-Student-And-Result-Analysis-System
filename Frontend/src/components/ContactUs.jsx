import React from "react";

function ContactUs() {
  const styles = {
    contactSection: {
      position: "relative",
      width: "100vw",
      height: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      alignItems: "center",

      /* ← no import: use absolute path from public/ */
      backgroundImage: "url('/college.png')",
      backgroundSize: "cover",
      backgroundPosition: "center",
      backgroundRepeat: "no-repeat",
      backgroundAttachment: "fixed",

      /* light overlay */
      backgroundColor: "rgba(255, 255, 255, 0.6)",
      backgroundBlendMode: "lighten",

      textAlign: "center",
      fontFamily: "Arial, sans-serif",
      color: "#0a0a23",
      margin: 0,
      padding: 0,
    },
    title: {
      fontSize: "36px",
      fontWeight: "bold",
      marginBottom: "30px",
      textTransform: "uppercase",
      letterSpacing: "2px",
    },
    cardsContainer: {
      display: "flex",
      justifyContent: "center",
      gap: "20px",
      flexWrap: "wrap",
      maxWidth: "90%",
    },
    card: {
      backgroundColor: "#fff",
      padding: "30px 20px",
      borderRadius: "10px",
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
      width: "280px",
      textAlign: "center",
    },
    cardTitle: {
      fontSize: "20px",
      color: "#333",
      marginBottom: "15px",
      fontWeight: "600",
    },
    paragraph: {
      fontSize: "16px",
      color: "#555",
      lineHeight: "1.6",
    },
  };

  return (
    <div style={styles.contactSection}>
      <h2 style={styles.title}>Contact Us</h2>
      <div style={styles.cardsContainer}>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Our Address</h3>
          <p style={styles.paragraph}>
            Deccan Education Society's Chintamanrao Institute of Management Development And Research,
            <br />
            DES Campus, P.O. Willingdon College, Vishrambag, Sangli,
            <br />
            Maharashtra, India
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Email Us</h3>
          <p style={styles.paragraph}>
            descimdr@gmail.com
            <br />
            office.cimdr@despune.org
          </p>
        </div>
        <div style={styles.card}>
          <h3 style={styles.cardTitle}>Call Us</h3>
          <p style={styles.paragraph}>
            0233-2601040
            <br />
            9270103056
          </p>
        </div>
      </div>
    </div>
  );
}

export default ContactUs;