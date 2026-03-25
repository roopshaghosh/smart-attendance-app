import React, { useState } from "react";

const ScanAttendance = () => {
  const [qrData, setQrData] = useState("");
  const [location, setLocation] = useState(null);
  const [message, setMessage] = useState("");

  const handleScan = () => {
    const fakeQR = "CLASS123";
    setQrData(fakeQR);
    setMessage("QR Scanned: " + fakeQR);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords = {
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        };
        setLocation(coords);
        setMessage("Location fetched");
      },
      () => {
        setMessage("Location permission denied");
      }
    );
  };

  const markAttendance = async () => {
    if (!qrData || !location) {
      setMessage("Scan QR and get location first");
      return;
    }

    try {
      await fetch("http://localhost:5000/attendance", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          qrData,
          latitude: location.lat,
          longitude: location.lng,
        }),
      });

      setMessage("Attendance marked successfully");
    } catch (err) {
      setMessage("Error sending attendance");
    }
  };

  return (
    <div style={{ padding: "20px" }}>
      <h2>Scan Attendance</h2>

      <button onClick={handleScan}>Scan QR</button>
      <br /><br />

      <button onClick={getLocation}>Get Location</button>
      <br /><br />

      <button onClick={markAttendance}>Mark Attendance</button>

      <p>{message}</p>
    </div>
  );
};

export default ScanAttendance;
