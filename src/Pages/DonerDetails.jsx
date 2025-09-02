import React, { useEffect, useState } from "react";
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../Pages/firebase";
import "../Css/DonorDetails.css";
import { FaTrash } from "react-icons/fa";

const DonorDetails = () => {
  const [donors, setDonors] = useState([]);

  useEffect(() => {
    // ✅ Real-time Firestore updates
    const q = query(collection(db, "Doner-details"), orderBy("date", "desc"));
    const unsubscribe = onSnapshot(q, (snapshot) => {
      const donorData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setDonors(donorData);
    });

    return () => unsubscribe();
  }, []);

  // ✅ Delete donor function
  const handleDelete = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this donor record?"
    );
    if (!confirmDelete) return;

    try {
      await deleteDoc(doc(db, "Doner-details", id));
      console.log("Donor deleted successfully!");
    } catch (error) {
      console.error("Error deleting donor:", error);
    }
  };

  return (
    <div className="donor-container">
      <h2 className="donor-title">Donors Information</h2>
      {donors.length === 0 ? (
        <p className="no-data">No donations yet.</p>
      ) : (
        <div className="table-responsive">
          <table className="donor-table">
            <thead>
              <tr>
                <th>Name</th>
                <th>Amount (₹)</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Address</th>
                <th>PAN</th>
                <th>Status</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {donors.map((donor) => (
                <tr key={donor.id}>
                  <td>{donor.name}</td>
                  <td>₹{donor.amount}</td>
                  <td>{donor.email}</td>
                  <td>{donor.phone}</td>
                  <td>{donor.address || "-"}</td>
                  <td>{donor.pan || "-"}</td>
                  <td>
                    <span
                      className={`status ${
                        donor.status === "success" ? "success" : "pending"
                      }`}
                    >
                      {donor.status}
                    </span>
                  </td>
                  <td>
                    {donor.date?.toDate
                      ? donor.date.toDate().toLocaleDateString()
                      : "-"}
                  </td>
                  <td>
                    <button
                      className="delete-btn"
                      onClick={() => handleDelete(donor.id)}
                      title="Delete donor"
                    >
                      <FaTrash />
                    </button>
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

export default DonorDetails;
