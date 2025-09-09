import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/DonorDetails.css";
import { useNavigate } from "react-router-dom";

const DonorDetails = () => {
  const [donors, setDonors] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ Fetch donors ordered by date
    const q = query(collection(db, "Doner-details"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donorData = snapshot.docs
        .map((doc) => {
          const data = doc.data();

          return {
            id: doc.id,
            ...data,
            // ✅ Normalize status
            status: data.status ? data.status.toLowerCase() : "unknown",
          };
        })
        // ✅ Only keep successful transactions
        .filter((donor) => donor.status === "success");

      setDonors(donorData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="donor-container">
      <h2 className="donor-title">Successful Donor Transactions</h2>
      {donors.length === 0 ? (
        <p className="no-data">No successful donations yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="donor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount (₹)</th>
                <th>Status</th>
                <th>Date & Time</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.name}</td>
                  <td>₹{donor.amount}</td>
                  <td>
                    <span className="status success">{donor.status}</span>
                  </td>
                  <td>
                    {/* ✅ Handle both Firestore Timestamp & string date */}
                    {donor.date?.toDate
                      ? donor.date.toDate().toLocaleString()
                      : donor.date || "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ✅ Button to go to failure page */}
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
