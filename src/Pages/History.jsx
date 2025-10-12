import React from "react";
import "../Css/History.css"; 

const historyData = [
  {
    year: "June 2, 1995",
    teachers: 2,
    nonTeaching: 1,
    standards: "LKG & UKG",
    students: 40,
  },
  {
    year: "June 2, 2001",
    teachers: 8,
    nonTeaching: 1,
    standards: "I – V Standard",
    students: 150,
  },
  {
    year: "June 2, 2004",
    teachers: 14,
    nonTeaching: "-",
    standards: "I – VIII Standard",
    students: 225,
  },
  {
    year: "June 2, 2015",
    teachers: 16,
    nonTeaching: "-",
    standards: "I – X Standard",
    students: 395,
  },
];

const schoolTiming = {
  weekdays: "9:30 AM to 5:30 PM (Monday – Friday)",
  saturday: "9:30 AM to 12:30 PM (1st & 2nd Saturday)",
  special: "Video Conferencing – Learning",
};

const History = () => {
  return (
    <div className="history-container">
      <h2 className="history-title">School History</h2>
      <div className="timeline">
        {historyData.map((item, index) => (
          <div key={index} className="timeline-card">
            <h3>{item.year}</h3>
            <p><strong>Teachers:</strong> {item.teachers}</p>
            <p><strong>Non-Teaching Staff:</strong> {item.nonTeaching}</p>
            <p><strong>Standards:</strong> {item.standards}</p>
            <p><strong>Total Students:</strong> {item.students}</p>
          </div>
        ))}
      </div>

      <div className="timing-section">
        <h3>School Timings</h3>
        <ul>
          <li>{schoolTiming.weekdays}</li>
          <li>{schoolTiming.saturday}</li>
          <li>{schoolTiming.special}</li>
        </ul>
      </div>
    </div>
  );
};

export default History;
