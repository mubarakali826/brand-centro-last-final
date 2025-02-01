import React, { useState, useEffect } from "react";
import QRCode from "qrcode";
import { useLocation } from "react-router-dom";

export const generateQRCode = async (url) => {
  try {
    const qrDataURL = await QRCode.toDataURL(url);
    return qrDataURL;
  } catch (err) {
    console.error("QR Code generation error:", err);
    return null;
  }
};

const QRCodeGenerator = () => {
  const location = useLocation(); // Hook to get the current location
  const [qrCodeURL, setQRCodeURL] = useState("");

  useEffect(() => {
    const generateQR = async () => {
      const fullURL = `${window.location.origin}${location.pathname}${location.search}`;
      const qrDataURL = await generateQRCode(fullURL);
      setQRCodeURL(qrDataURL);
    };

    generateQR();
  }, [location]); // Regenerate the QR code if the location changes

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Scan the QR Code</h2>
      {qrCodeURL ? (
        <img src={qrCodeURL} alt="QR Code" style={{ maxWidth: "300px" }} />
      ) : (
        <p>Generating QR Code...</p>
      )}
    </div>
  );
};

export default QRCodeGenerator;
