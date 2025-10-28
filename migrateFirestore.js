// migrateFirestore.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs, updateDoc, doc } from "firebase/firestore";

// ✅ Your Firebase web config (fill with your actual keys)
const firebaseConfig = {
  apiKey: "AIzaSyAGb7d78fojh1WUSI0wM5i5nfEnAJfLUYw",
  authDomain: "donar-details.firebaseapp.com",
  projectId: "donar-details",
  storageBucket: "donar-details.appspot.com",
  messagingSenderId: "457988954274",
  appId: "1:457988954274:web:608135303d03164e6fdffb",
};

// ✅ Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function migrate() {
  console.log("🚀 Starting safe Firestore migration...");

  const donorRef = collection(db, "Doner-details");
  const snapshot = await getDocs(donorRef);
  let updated = 0;

  for (const d of snapshot.docs) {
    const data = d.data();

    // ✅ Fix only if rrn looks like an order ID and order_id is missing
    if (data.rrn?.startsWith("order_") && !data.order_id) {
      const fix = {
        old_rrn_backup: data.rrn, // keep backup for safety
        order_id: data.rrn,       // move order_id correctly
        rrn: "",                  // clear rrn safely
      };

      await updateDoc(doc(db, "Doner-details", d.id), fix);
      console.log(`✅ Fixed safely: ${d.id}`);
      updated++;
    }
  }

  console.log(`🎉 Migration complete. Fixed ${updated} records safely.`);
}

migrate().catch(console.error);
