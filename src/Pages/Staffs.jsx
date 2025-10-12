import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "./firebase";
import "../Css/Staffs.css";

const Staffs = () => {
  const [staff, setStaff] = useState([]);
  const [loading, setLoading] = useState(true);

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
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p className="loading-text">Loading data...</p>
      </div>
    );
  }

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
    <div className="staffs-container">
      <h1 className="staffs-title">Staff Members</h1>

      {/* Principal & Vice Principal */}
      <div className="staffs-top">
        {topStaff.map((person) => (
          <div className="staffs-card" key={person.id}>
            <div className="image-wrapper">
              <img
                src={person.image}
                alt={person.name}
                className="profile-photo"
              />
            </div>
            <div className="staffs-info">
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Other Staff */}
      <div className="staffs-grid">
        {members.map((person) => (
          <div className="staffs-card" key={person.id}>
            <div className="image-wrapper">
              <img
                src={person.image}
                alt={person.name}
                className="profile-photo"
              />
            </div>
            <div className="staffs-info">
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Staffs;
