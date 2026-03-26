import admin from "firebase-admin";

let serviceAccount;

if (process.env.FIREBASE_CONFIG) {
  // ✅ Production (Render / ENV)
  serviceAccount = JSON.parse(process.env.FIREBASE_CONFIG);

  // 🔥 VERY IMPORTANT FIX (for private_key)
  serviceAccount.private_key = serviceAccount.private_key.replace(/\\n/g, "\n");

  console.log("Using FIREBASE_CONFIG from ENV");
} else {
  // ✅ Localhost (Development)
  const fs = await import("fs");

  const filePath = new URL("./firebase-adminsdk.json", import.meta.url);
  const fileData = fs.readFileSync(filePath, "utf-8");

  serviceAccount = JSON.parse(fileData);

  console.log("Using local firebase-adminsdk.json");
}

// 🚨 Prevent re-initialization error
if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccount),
  });
}

export default admin;