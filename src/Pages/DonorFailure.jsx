import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/DonorDetails.css"; // reuse same styles

const DonorFailure = () => {
  const [failedDonors, setFailedDonors] = useState([]);

  useEffect(() => {
    // ✅ Fetch only failed transactions
    const q = query(collection(db, "Doner-details"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donorData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((donor) => donor.status?.toLowerCase() === "failure"); // ✅ only failures
      setFailedDonors(donorData);
    });

    return () => unsubscribe();
  }, []);

  return (
    <div className="donor-container">
      <h2 className="donor-title">Failed Transactions</h2>
      {failedDonors.length === 0 ? (
        <p className="no-data">No failed donations yet.</p>
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
              {failedDonors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.name}</td>
                  <td>₹{donor.amount}</td>
                  <td>
                    <span className="status pending">{donor.status}</span>
                  </td>
                  <td>
                    {donor.date?.toDate
                      ? donor.date.toDate().toLocaleString()
                      : "-"}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default DonorFailure;
