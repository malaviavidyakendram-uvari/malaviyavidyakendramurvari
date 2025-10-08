import { useEffect } from "react";
import { db } from "../Pages/firebase";
import { collection, addDoc } from "firebase/firestore";

const allStaff = [
  {
    name: "Selvan. S. Akilan, B.Sc., B.Ed.",
    role: "Principal",
    image: "/img/IMG_20251007_095143.jpg",
  },
  {
    name: "Selvi. S. Pavithra, M.Com., B.Ed.",
    role: "Vice Principal",
    image: "/img/PAVITHRA.jpg",
  },
  {
    name: "Smt. D. Jeya Selvi, B.A.",
    role: "Teacher",
    image: "/img/JEYASELVI.jpg",
  },
  { name: "Selvi. S. Sneka, B.E.", role: "Teacher", image: "/img/SNEKA.jpg" },
  {
    name: "Selvi. T. Sivathanusiya, M.A.",
    role: "Teacher",
    image: "/img/SIVADHANUSHIYA.jpg",
  },
  {
    name: "Selvi. M. Gunachithra, B.A., B.Ed.",
    role: "Teacher",
    image: "/img/GUNACHITHRA.jpg",
  },
  {
    name: "Selvi. R. Valarmathi, B.Sc., B.Ed.",
    role: "Teacher",
    image: "/img/VALARMATHI.jpg",
  },
  {
    name: "Selvi. L. Soundarya, M.Sc.",
    role: "Teacher",
    image: "/img/SOUNDARYA.jpg",
  },
  { name: "Selvi. Sharmisha, ", role: "Teacher", image: "/img/SHARMISHA.jpg" },
  { name: "Selvi. Vikashini, ", role: "Teacher", image: "/img/VIKASHINI.jpg" },
  { name: "Selvi. Sneka,  ", role: "Teacher", image: "/img/SNEKA.V.jpg" },
  {
    name: "Selvi. Siva Sankari, ",
    role: "Teacher",
    image: "/img/SIVASANKARI.jpg",
  },
  {
    name: "Smt. S. Ajantha, B.Com., Pre-PTC",
    role: "Teacher",
    image: "/img/AJANTHA.jpg",
  },
  { name: "Selvi. S. Ajitha, B.Sc.", role: "Clerk", image: "/img/AJITHA.jpg" },
  // add remaining staff here
];

const PushStaffData = () => {
  useEffect(() => {
    const pushStaffData = async () => {
      try {
        const collectionRef = collection(db, "staff-data");
        for (let staff of allStaff) {
          await addDoc(collectionRef, staff);
          console.log(`${staff.name} added to Firestore`);
        }
        console.log("All staff data added successfully!");
      } catch (error) {
        console.error("Error adding staff data:", error);
      }
    };

    //pushStaffData();
  }, []);

  return null;
};

export default PushStaffData;
