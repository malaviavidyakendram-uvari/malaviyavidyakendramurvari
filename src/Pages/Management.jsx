// src/Components/Management.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/Management.css";

const Management = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [devImage, setDevImage] = useState("");
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // ✅ Fetch all management staff members
        const staffCollection = collection(db, "Management-staffs");
        const staffSnap = await getDocs(staffCollection);
        const staffList = staffSnap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStaffs(staffList);

        // ✅ Fetch developer image only (match exact document ID)
        const devRef = doc(db, "Management-staffs", "A Muthu Nambi Dev");
        const devSnap = await getDoc(devRef);
        if (devSnap.exists()) {
          setDevImage(devSnap.data().image);
        } else {
          console.warn("⚠️ Developer document not found");
        }
      } catch (err) {
        console.error("❌ Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading management staff...</p>
      </div>
    );
  }

  return (
    <div className="management-container">
      <h1 className="management-title">Management Staffs</h1>

      {/* ✅ Exclude developer from staff list */}
      <div className="management-grid">
        {staffs
          .filter((s) => s.id !== "A Muthu Nambi Dev")
          .map((staff) => (
            <div key={staff.id} className="management-card">
              <div className="image-wrapper">
                <img
                  src={staff.image}
                  alt={staff.name}
                  className="profile-photo"
                />
              </div>
              <div className="management-info">
                <h2>{staff.name}</h2>
              </div>
            </div>
          ))}
      </div>

      {/* 👨‍💻 Floating developer credit */}
      <div className="developer-credit" onClick={() => setShowPopup(true)}>
        👨‍💻 Developed by <strong>Muthu Nambi</strong>
      </div>

      {/* 🖼️ Popup modal with your image */}
      {showPopup && (
        <div className="dev-popup-overlay" onClick={() => setShowPopup(false)}>
          <div className="dev-popup" onClick={(e) => e.stopPropagation()}>
            {devImage ? (
              <img
                src={devImage}
                alt="Muthu Nambi"
                className="dev-popup-img"
              />
            ) : (
              <p className="loading-text">Loading your photo...</p>
            )}
            <p className="dev-popup-text">
              👨‍💻 Muthu Nambi — Software Developer
            </p>
            <button onClick={() => setShowPopup(false)}>Close</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Management;
