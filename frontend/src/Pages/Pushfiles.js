// src/Components/PushStaffData.jsx
import { useEffect } from "react";
import { db } from "../Pages/firebase";
import { collection, doc, setDoc } from "firebase/firestore";

const allStaff = [
  { name: "Mr. Saravana Suyambu", image: "/management/SARAVANASUYAMBU.jpg" },
  { name: "Mr. Jeyapandian", image: "/management/JEYAPANDIAN.jpg" },
  { name: "Mr. Balakrishnan", image: "/management/BALAKRISHNAN.jpg" },
  { name: "Mr. Rajan", image: "/management/RAJAN.jpg" },
  { name: "Mr. Arumugapandian", image: "/management/ARUMUGAPANDIAN.jpg" },
  { name: "Mr. Alagasan IRS", image: "/management/AZAGESAN-IRS.jpeg.jpg" },
  { name: "Mr. Kalaiselvan", image: "/management/KALAISELVAN.jpeg.jpg" },
  { name: "Mr. Thangavelu", image: "/management/THANGAVELU.jpg" },
  { name: "Mr. Selvaraj", image: "/management/SELVARAJ.jpg" },
  { name: "Mr. Vijayan", image: "/management/VIJAYAN.jpg" },
  { name: "Mr. Mahalingam IRS", image: "/management/MAHALINGAM-IRS.jpg" },
  { name: "Mr. Rathinavel Rajan HR", image: "/management/RATHINAVEL-RAJAN.jpg" },
  { name: "Mr. Siva Sathya", image: "/management/SIVASATHYA.jpg" },
  { name: "Mr. Jegan", image: "/management/JEGAN.jpg" },
  { name: "Mr. Prabu", image: "/management/PRABU.jpg" },
  { name: "Mr. Rethinam", image: "/management/RETHINAM.jpg" },
  { name: "Mr. Duraipandi", image: "/management/DURAIPANDI.jpg" }
];

const PushStaffData = () => {
  useEffect(() => {
    const pushStaffData = async () => {
      const collectionRef = collection(db, "Management-staffs");

      for (let staff of allStaff) {
        try {
          // Use staff name as document ID to prevent duplicates
          await setDoc(doc(collectionRef, staff.name), staff);
          console.log(`✅ Added: ${staff.name}`);
        } catch (err) {
          console.error(`❌ Failed to add ${staff.name}:`, err);
        }
      }

      console.log("All staff data push attempted!");
    };

    //pushStaffData();
  }, []);

  return null;
};

export default PushStaffData;
