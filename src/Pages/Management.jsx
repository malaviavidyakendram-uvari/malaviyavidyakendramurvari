import React from "react";
import { FaUserTie, FaUserFriends } from "react-icons/fa"; // icons
import "../Css/Management.css";

const Management = () => {
  // Top staff → Principal & Vice Principal
  const topStaff = [
    { name: "Selvan. S. Akilan, B.Sc., B.Ed.", role: "Principal", icon: <FaUserTie /> },
    { name: "Selvi. S. Pavithra, M.Com., B.Ed.", role: "Vice Principal", icon: <FaUserTie /> },
  ];

  // Other staff members
  const members = [
    { name: "Smt. D. Jeya Selvi, B.A.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Selvi. S. Saravana Sundari, B.A.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Selvi. S. Sneka, B.E.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Selvi. T. Sivathanusiya, M.A.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Selvi. M. Gunachithra, B.A., B.Ed.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Smt. S. Jeya Sree, B.Sc., B.Ed.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Selvi. R. Valarmathi, B.Sc., B.Ed.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Selvi. L. Soundarya, M.Sc.", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Smt. S. Ajantha, B.Com., Pre-PTC", role: "Teacher", icon: <FaUserFriends /> },
    { name: "Selvi. S. Ajitha, B.Sc.", role: "Clerk", icon: <FaUserFriends /> },
    { name: "Smt. S. Sarathadevi", role: "Aunty", icon: <FaUserFriends /> },
    { name: "Smt. T. Leelavathi", role: "Aunty", icon: <FaUserFriends /> },
  ];

  return (
    <div className="management-container">
      <h1 className="management-title">Staff Members</h1>

      {/* Principal & Vice Principal */}
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

      {/* Other Staff */}
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
