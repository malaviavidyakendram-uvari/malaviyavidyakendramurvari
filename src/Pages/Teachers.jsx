// Teachers.jsx
import React from "react";
import { FaUserTie } from "react-icons/fa";
import "../Css/Teachers.css";

const teachersData = [
  { name: "A. Sivasakthi", degree: "B.Com", exp: "7 years" },
  { name: "S. Selvi", degree: "T.T.C", exp: "5 years" },
  { name: "M. Sugitha", degree: "B.A", exp: "5 years" },
  { name: "T. Surya", degree: "B.A", exp: "3 years" },
  { name: "A. Kasi Nandhini", degree: "B.Com", exp: "3 years" },
  { name: "T. Nandhini", degree: "D.E.C.E", exp: "3 years" },
  { name: "K. Radha Devi", degree: "B.C.A", exp: "1 year" },
  { name: "J. Jeyanthi", degree: "B.A", exp: "1 year" },
  { name: "M. Nandhini", degree: "B.Sc, B.Ed", exp: "1 year" },
  { name: "T. Muthu Pappa", degree: "B.Sc, B.Ed", exp: "1 year" },
  { name: "J. Pon Rani", degree: "B.Sc, B.Ed", exp: "1 year" },
  { name: "A. Justin Rani", degree: "M.A, B.Ed", exp: "1 year" },
  { name: "Jeswin Jebamalar", degree: "B.A, B.Ed", exp: "1 year" },
  { name: "V. Petchiammal", degree: "B.A, B.Ed", exp: "1 year" },
  { name: "S. Petchiammal", degree: "B.Sc, B.Ed", exp: "1 year" },
  { name: "M. Chitra", degree: "B.E", exp: "1 year" },
  { name: "P. Selva Rani", degree: "D.Ted B.Lit DTP", exp: "1 year" },
];

const Teachers = () => {
  return (
    <section className="teachers-section">
      <div className="container">
        <p className="section-subtitle">People behind our success</p>
        <h2 className="section-title">Our Tutors</h2>

        <div className="teachers-grid">
          {teachersData.map((teacher, index) => (
            <div className="teacher-card" key={index}>
              <div className="teacher-icon">
                <FaUserTie size={40} />
              </div>
              <h3 className="teacher-name">{teacher.name}</h3>
              <p className="teacher-degree">{teacher.degree}</p>
              <p className="teacher-exp">{teacher.exp}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Teachers;
