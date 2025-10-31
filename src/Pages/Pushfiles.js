import { useEffect } from "react";
import { db } from "../Pages/firebase";
import { doc, setDoc } from "firebase/firestore";

const PushDeveloperData = () => {
  useEffect(() => {
    const pushDeveloper = async () => {
      try {
        const developerRef = doc(db, "Management-staffs", "A Muthu Nambi Dev");

        await setDoc(developerRef, {
          name: "A Muthu Nambi Dev",
          image: "/management/MuthunambiDevloper.jpg", 
        });

        console.log("✅ Developer info successfully added to Firestore!");
      } catch (err) {
        console.error("❌ Failed to add developer info:", err);
      }
    };

    // ⚠️ Uncomment only when you want to push
     //pushDeveloper();
  }, []);

  return null;
};

export default PushDeveloperData;
