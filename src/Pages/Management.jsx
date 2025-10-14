// src/Pages/Management.jsx
import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/Management.css";

const Management = () => {
  const [staffs, setStaffs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStaffs = async () => {
      try {
        const collectionRef = collection(db, "Management-staffs");
        const snapshot = await getDocs(collectionRef);
        const staffList = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setStaffs(staffList);
      } catch (err) {
        console.error("Error fetching management staff:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffs();
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
    
      <div className="management-grid">
        {staffs.map((staff) => (
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
    </div>
  );
};

export default Management;
