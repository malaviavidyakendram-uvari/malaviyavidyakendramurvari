import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/DonorDetails.css";
import { useNavigate } from "react-router-dom";

const DonorDetails = () => {
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const q = query(collection(db, "Doner-details"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donorData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((donor) => donor.status?.toLowerCase() === "success"); // ✅ only success
      setDonors(donorData);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Format date to IST, 12-hour with AM/PM
  const formatDate = (timestamp) => {
    if (!timestamp?.toDate) return "-";
    return timestamp.toDate().toLocaleString("en-IN", {
      timeZone: "Asia/Kolkata",
      hour12: true,
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "numeric",
      minute: "numeric",
      second: "numeric",
    });
  };

  return (
    <div className="donor-container">
      <h2 className="donor-title">Successful Donor Transactions</h2>
      {donors.length === 0 ? (
        <p className="no-data">No successful donations yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="donor-table">
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td data-label="Name">Name: {donor.name}</td>
                  <td data-label="Amount">Amount: ₹{donor.amount}</td>
                  <td data-label="Status">
                    Status:{" "}
                    <span className="status success">{donor.status}</span>
                  </td>
                  <td data-label="Date">Date: {formatDate(donor.date)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Navigate to failure page */}
      <button
        className="history-btn"
        style={{ marginTop: "20px" }}
        onClick={() => navigate("/donorfailure")}
      >
        🚫 View Failed Transactions
      </button>
    </div>
  );
};

export default DonorDetails;
