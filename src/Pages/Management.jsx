import React from "react";
import { FaUserTie, FaUserFriends } from "react-icons/fa"; // icons
import "../Css/Management.css";

const Management = () => {
  const topStaff = [
    { name: "Shri P. Saravana Suyambu", role: "Correspondent", icon: <FaUserTie /> },
    { name: "Shri V. Rajan", role: "Secretary", icon: <FaUserTie /> },
    { name: "Shri S. Suyambu Raj", role: "Treasurer", icon: <FaUserTie /> },
  ];

  const members = [
    { name: "Shri T. Murugaiah", role: "Member", icon: <FaUserFriends /> },
    { name: "Shri C. Kartheesan", role: "Member", icon: <FaUserFriends /> },
    { name: "Shri V. Thangavel", role: "Member", icon: <FaUserFriends /> },
    { name: "Shri S.K. Jayapandi", role: "Member", icon: <FaUserFriends /> },
    { name: "Shri R. Lingaraj", role: "Member", icon: <FaUserFriends /> },
    { name: "Shri V. Duraipandi", role: "Member", icon: <FaUserFriends /> },
    { name: "Shri M. Maheshwaran", role: "Member", icon: <FaUserFriends /> },
    { name: "Shri K. Kasthuribai Mahalingam", role: "Member", icon: <FaUserFriends /> },
  ];

  return (
    <div className="management-container">
      <h1 className="management-title">Management Staffs</h1>

      {/* First Row - Only 3 cards */}
      <div className="management-top">
        {topStaff.map((person, index) => (
          <div className="management-card" key={index}>
            <div className="icon-wrapper">{person.icon}</div>
            <div className="management-info">
              <h2>{person.name}</h2>
              <p>{person.role}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Remaining Members */}
      <div className="management-grid">
        {members.map((person, index) => (
          <div className="management-card" key={index}>
            <div className="icon-wrapper">{person.icon}</div>
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
