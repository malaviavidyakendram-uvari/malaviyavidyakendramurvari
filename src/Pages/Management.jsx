import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/Management.css";

const Management = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔹 Fetch data from Firestore
  useEffect(() => {
    const fetchStaffData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "staff-data"));
        const staffList = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setStaff(staffList);
      } catch (error) {
        console.error("Error fetching staff data:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchStaffData();
  }, []);

  if (loading) {
    return <p className="loading-text">Loading staff data...</p>;
  }

  // 🔹 Separate top staff and others (if your Firestore has a "role" field)
  const topStaff = staff.filter(
    (person) =>
      person.role?.toLowerCase().includes("principal") ||
      person.role?.toLowerCase().includes("vice principal")
  );
  const members = staff.filter(
    (person) =>
      !person.role?.toLowerCase().includes("principal") &&
      !person.role?.toLowerCase().includes("vice principal")
  );

  return (
    <div className="management-container">
      <h1 className="management-title">Staff Members</h1>

      {/* Principal & Vice Principal */}
      <div className="management-top">
        {topStaff.map((person) => (
          <div className="management-card" key={person.id}>
            <div className="image-wrapper">
              <img
                src={person.image}
                alt={person.name}
                className="profile-photo"
              />
            </div>
            <div className="management-info">
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Other Staff */}
      <div className="management-grid">
        {members.map((person) => (
          <div className="management-card" key={person.id}>
            <div className="image-wrapper">
              <img
                src={person.image}
                alt={person.name}
                className="profile-photo"
              />
            </div>
            <div className="management-info">
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Management;
