import React, { useEffect, useState } from "react";
import { collection, onSnapshot, query, orderBy } from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/DonorDetails.css"; // reuse same styles

const DonorFailure = () => {
  const [failedDonors, setFailedDonors] = useState([]);

  useEffect(() => {
    // ✅ Fetch failed + initiated transactions
    const q = query(collection(db, "Doner-details"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donorData = snapshot.docs
        .map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }))
        .filter((donor) => {
          const status = donor.status?.toLowerCase();
          return status === "failure" || status === "initiated";
        });
      setFailedDonors(donorData);
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
      <h2 className="donor-title">Failed / Pending Transactions</h2>
      {failedDonors.length === 0 ? (
        <p className="no-data">No failed or pending donations yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="donor-table">
            <tbody>
              {failedDonors.map((donor) => (
                <tr key={donor.id}>
                  <td data-label="Name">Name: {donor.name}</td>
                  <td data-label="Amount">Amount: ₹{donor.amount}</td>
                  <td data-label="Status">
                    Status:{" "}
                    <span
                      className={`status ${
                        donor.status?.toLowerCase() === "failure"
                          ? "pending"
                          : "pending"
                      }`}
                    >
                      {donor.status}
                    </span>
                  </td>
                  <td data-label="Date">Date: {formatDate(donor.date)}</td>
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
